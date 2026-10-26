<?php
/**
 * Enquiry, CLCB join, job application and newsletter forms: markup, validation (same rules as the
 * zod schemas in src/lib/forms.ts) and the /api/* handlers.
 * With JS, site.js posts the form and shows errors inline. Without JS, the form posts normally;
 * errors come back through a one-time session "flash" and success goes to /thank-you.
 */

const PATH_LABEL = ['pms' => 'Portfolio Management (₹50 lakh+)', 'mf' => 'Mutual Funds (₹5,000+)', 'clcb' => 'CLCB community', 'insurance' => 'Insurance', 'bonds' => 'Bonds & fixed income', 'other' => 'Something else'];
const CV_MAX_BYTES = 5 * 1024 * 1024;
const CV_TYPES = ['application/pdf' => 'pdf', 'application/msword' => 'doc', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx'];

/* ---------- Validation ---------- */

/** Rules per form: [field => [type, min, max, required, extra]] */
function form_rules(string $form): array
{
    $person = ['name' => ['text', 2, 120], 'email' => ['email'], 'phone' => ['text', 6, 20]];
    return match ($form) {
        'enquiry' => $person + ['path' => ['enum', array_keys(PATH_LABEL)], 'amount' => ['opt', 0, 60], 'message' => ['opt', 0, 2000], 'source' => ['opt', 0, 60], 'consent' => ['consent', 'Please agree to be contacted.']],
        'clcb' => $person + ['city' => ['text', 2, 80], 'stage' => ['enum', ['starting', 'some', 'experienced']], 'interests' => ['opt', 0, 400], 'consent' => ['consent', 'Please tick the box to join.']],
        'apply' => $person + ['role' => ['text', 2, 120], 'department' => ['opt', 0, 60], 'linkedin' => ['opt', 0, 200], 'note' => ['opt', 0, 2000], 'consent' => ['consent', 'Please agree so we can store your application.']],
        'newsletter' => ['email' => ['email'], 'name' => ['opt', 0, 120]],
    };
}

function str_len(string $s): int { return function_exists('mb_strlen') ? mb_strlen($s) : (int) preg_match_all('/./us', $s); }

/** @return array{0:array,1:array} [clean data, errors keyed by field (each a list of messages)] */
function validate_form(string $form, array $input): array
{
    $data = [];
    $errors = [];
    foreach (form_rules($form) as $field => $rule) {
        $v = is_string($input[$field] ?? null) ? trim($input[$field]) : '';
        $type = $rule[0];
        $msg = null;
        if ($type === 'text') {
            if ($v === '') $msg = 'Please fill this in.';
            elseif (str_len($v) < $rule[1]) $msg = "Please enter at least {$rule[1]} characters.";
            elseif (str_len($v) > $rule[2]) $msg = "Please keep this under {$rule[2]} characters.";
        } elseif ($type === 'email') {
            if (!filter_var($v, FILTER_VALIDATE_EMAIL)) $msg = 'Please enter a valid email address.';
        } elseif ($type === 'enum') {
            if (!in_array($v, $rule[1], true)) $msg = 'Please choose an option.';
        } elseif ($type === 'opt') {
            if (str_len($v) > $rule[2]) $msg = "Please keep this under {$rule[2]} characters.";
        } elseif ($type === 'consent') {
            if ($v !== 'on') $msg = $rule[1];
        }
        if ($msg) $errors[$field] = [$msg];
        $data[$field] = $v;
    }
    return [$data, $errors];
}

/** Checks an uploaded CV. @return array{0:?array,1:?string} [attachment, error] */
function check_cv(?array $f): array
{
    if (!$f || ($f['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE || ($f['size'] ?? 0) === 0) return [null, null];
    if (in_array($f['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true) || $f['size'] > CV_MAX_BYTES) return [null, 'CV must be under 5 MB'];
    if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) return [null, 'The upload did not finish. Please try again.'];
    $ext = strtolower(pathinfo((string) $f['name'], PATHINFO_EXTENSION));
    $type = function_exists('finfo_open') ? (string) finfo_file(finfo_open(FILEINFO_MIME_TYPE), $f['tmp_name']) : '';
    $ok = in_array($ext, CV_TYPES, true) && ($type === '' || isset(CV_TYPES[$type]) || ($ext !== 'pdf' && in_array($type, ['application/zip', 'application/octet-stream', 'application/x-ole-storage', 'application/CDFV2'], true)));
    if (!$ok) return [null, 'Please upload a PDF or Word document'];
    $name = preg_replace('/[^\w.\-]+/', '_', (string) $f['name']);
    return [['path' => $f['tmp_name'], 'name' => $name], null];
}

/* ---------- Handlers ---------- */

function wants_json(): bool { return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json'); }

function same_origin(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    if ($origin === '') return true;
    return strcasecmp((string) parse_url($origin, PHP_URL_HOST), (string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '')) === 0;
}

/**
 * At most 20 sent messages per IP address per 10 minutes. Only valid submissions count, and the limit is
 * generous because many mobile users in India share one carrier IP address.
 */
function rate_limited(): bool
{
    $dir = APP_DIR . '/storage/ratelimit';
    if (!is_dir($dir)) @mkdir($dir, 0775, true);
    $file = $dir . '/' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '.json';
    $now = time();
    $hits = array_values(array_filter(is_file($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [], fn($t) => $t > $now - 600));
    if (count($hits) >= 20) return true;
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return false;
}

function handle_form(string $form): void
{
    if (!same_origin()) form_fail($form, [], 403);
    if (!empty($_POST['website'])) form_done($form); // honeypot: bots fill the hidden field; pretend success

    [$d, $errors] = validate_form($form, $_POST);
    $attachments = [];
    if ($form === 'apply') {
        [$cv, $cvError] = check_cv($_FILES['cv'] ?? null);
        if ($cvError) $errors['cv'] = [$cvError];
        if ($cv) $attachments[] = $cv;
    }
    if ($errors) form_fail($form, $errors, 400);
    if (rate_limited()) form_fail($form, [], 429);

    $mail = match ($form) {
        'enquiry' => ['subject' => 'Website enquiry · ' . PATH_LABEL[$d['path']] . ' · ' . $d['name'], 'reply_to' => $d['email'],
            'html' => '<h2 style="font:400 20px Georgia">New enquiry</h2>' . mail_table([['Name', $d['name']], ['Email', $d['email']], ['Phone', $d['phone']], ['Interested in', PATH_LABEL[$d['path']]], ['Amount', $d['amount']], ['How they found us', $d['source']], ['Message', $d['message']]])],
        'clcb' => ['subject' => 'CLCB join request · ' . $d['name'] . ' · ' . $d['city'], 'reply_to' => $d['email'],
            'html' => '<h2 style="font:400 20px Georgia">CLCB join request</h2>' . mail_table([['Name', $d['name']], ['Email', $d['email']], ['Phone', $d['phone']], ['City', $d['city']], ['Stage', $d['stage']], ['Interests', $d['interests']]])],
        'apply' => ['to' => config('hr_mail_to'), 'subject' => 'Application · ' . $d['role'] . ' · ' . $d['name'], 'reply_to' => $d['email'], 'attachments' => $attachments,
            'html' => '<h2 style="font:400 20px Georgia">New application</h2>' . mail_table([['Name', $d['name']], ['Email', $d['email']], ['Phone', $d['phone']], ['Role', $d['role']], ['Department', $d['department']], ['LinkedIn', $d['linkedin']], ['Note', $d['note']]])],
        'newsletter' => ['subject' => 'Newsletter signup · ' . $d['email'], 'html' => mail_table([['Email', $d['email']], ['Name', $d['name']]])],
    };
    $mail['kind'] = $form;
    if (!send_mail($mail)) form_fail($form, [], 502);
    form_done($form);
}

function form_done(string $form): never
{
    if (wants_json()) json_out(['ok' => true]);
    redirect('/thank-you?for=' . $form, 303);
}

/** Errors (field messages) or a general failure (no field errors). */
function form_fail(string $form, array $errors, int $status): never
{
    if (wants_json()) json_out($errors ? ['ok' => false, 'errors' => $errors] : ['ok' => false], $status);
    flash_set(['form' => $form, 'errors' => $errors, 'failed' => !$errors, 'old' => array_map(fn($v) => is_string($v) ? $v : '', array_diff_key($_POST, ['website' => 1]))]);
    $back = '/contact';
    $ref = $_SERVER['HTTP_REFERER'] ?? '';
    if ($ref && same_origin()) $back = (parse_url($ref, PHP_URL_PATH) ?: '/') . (($q = parse_url($ref, PHP_URL_QUERY)) ? "?$q" : '');
    redirect($back . '#form-' . $form, 303);
}

/* ---------- One-time flash for the no-JS path ---------- */

function flash_set(array $data): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Lax']);
    $_SESSION['flash'] = $data;
}

function flash_for(string $form): array
{
    static $flash = false;
    if ($flash === false) {
        $flash = null;
        if (isset($_COOKIE[session_name()]) && session_status() !== PHP_SESSION_ACTIVE) {
            session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Lax']);
            $flash = $_SESSION['flash'] ?? null;
            unset($_SESSION['flash']);
        }
    }
    return ($flash['form'] ?? null) === $form ? $flash : [];
}

/* ---------- Markup ---------- */

const FIELD_BASE = 'w-full rounded-xl border bg-white/90 px-4 py-3 text-[15px] text-ink placeholder:text-mist/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-raspberry/60';

/**
 * @param array{form:string,label:string,name:string,type?:string,required?:bool,placeholder?:string,light?:bool,as?:string,
 *              options?:array,rows?:int,autocomplete?:string,hint?:string,value?:string,accept?:string,inputmode?:string} $o
 */
function field(array $o): string
{
    $flash = flash_for($o['form']);
    $name = $o['name'];
    $id = 'f-' . $o['form'] . '-' . $name;
    $light = !empty($o['light']);
    $error = $flash['errors'][$name][0] ?? null;
    $value = $flash['old'][$name] ?? ($o['value'] ?? '');
    $cls = cn(FIELD_BASE, $light ? 'border-ivory/20 bg-white' : 'border-line', $error ? 'border-raspberry' : '');
    $req = !empty($o['required']) ? ' required' : '';
    $ph = isset($o['placeholder']) ? ' placeholder="' . e($o['placeholder']) . '"' : '';
    $described = ' aria-describedby="' . $id . '-err"' . ($error ? ' aria-invalid="true"' : '');

    $out = '<div><label for="' . $id . '" class="' . cn('mb-1.5 block text-[13px] font-medium', $light ? 'text-ivory/90' : 'text-ink') . '">' . e($o['label']) . (!empty($o['required']) ? '<span class="text-raspberry"> *</span>' : '') . '</label>';
    $as = $o['as'] ?? 'input';
    if ($as === 'textarea') {
        $out .= '<textarea id="' . $id . '" name="' . $name . '" rows="' . ($o['rows'] ?? 4) . '"' . $req . $ph . $described . ' class="' . $cls . '">' . e($value) . '</textarea>';
    } elseif ($as === 'select') {
        $out .= '<select id="' . $id . '" name="' . $name . '"' . $req . $described . ' class="' . $cls . '">';
        foreach ($o['options'] as $opt) $out .= '<option value="' . e($opt['value']) . '"' . ((string) $opt['value'] === (string) $value ? ' selected' : '') . '>' . e($opt['label']) . '</option>';
        $out .= '</select>';
    } else {
        $type = $o['type'] ?? 'text';
        $out .= '<input id="' . $id . '" name="' . $name . '" type="' . $type . '"' . $req . $ph . $described
            . (isset($o['autocomplete']) ? ' autocomplete="' . $o['autocomplete'] . '"' : '')
            . (isset($o['accept']) ? ' accept="' . e($o['accept']) . '"' : '')
            . ($type !== 'file' && $value !== '' ? ' value="' . e($value) . '"' : '')
            . ' class="' . $cls . '">';
    }
    if (!empty($o['hint'])) $out .= '<p data-hint class="' . cn('mt-1 text-[12px]', $light ? 'text-ivory/60' : 'text-mist') . '"' . ($error ? ' hidden' : '') . '>' . e($o['hint']) . '</p>';
    $out .= '<p id="' . $id . '-err" data-error-for="' . $name . '" class="mt-1 text-[12px] text-raspberry" role="alert"' . ($error ? '' : ' hidden') . '>' . e($error ?? '') . '</p>';
    return $out . '</div>';
}

function honeypot(): string { return '<input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">'; }

function consent_box(string $form, string $text, bool $light = false): string
{
    $flash = flash_for($form);
    $checked = ($flash['old']['consent'] ?? '') === 'on' ? ' checked' : '';
    $error = $flash['errors']['consent'][0] ?? null;
    return '<label class="' . cn('flex items-start gap-3 text-[13px]', $light ? 'text-ivory/80' : 'text-[#3f3d5c]') . '"><input type="checkbox" name="consent" required' . $checked . ' class="mt-0.5 h-4 w-4 shrink-0 accent-raspberry"><span>' . e($text) . '</span></label>'
        . '<p data-error-for="consent" class="text-[12px] text-raspberry" role="alert"' . ($error ? '' : ' hidden') . '>' . e($error ?? '') . '</p>';
}

function form_failed_note(string $form, string $text): string
{
    $failed = !empty(flash_for($form)['failed']);
    return '<p data-form-failed class="text-[13px] text-raspberry" role="alert"' . ($failed ? '' : ' hidden') . '>' . e($text) . '</p>';
}

function submit_button(string $label, string $variant = 'primary'): string
{
    return button(e($label), ['variant' => $variant, 'class' => 'justify-self-start', 'attrs' => 'type="submit" data-busy-label="Sending…"']);
}

/** @param string[] $paths */
function enquiry_form(array $paths = ['pms', 'mf', 'clcb'], ?string $defaultPath = null, bool $light = false, string $class = ''): string
{
    $f = 'enquiry';
    $opts = array_map(fn($p) => ['value' => $p, 'label' => PATH_LABEL[$p]], array_merge($paths, ['other']));
    $source = [['value' => '', 'label' => 'Choose one'], ['value' => 'search', 'label' => 'Search engine'], ['value' => 'social', 'label' => 'Social media'], ['value' => 'word', 'label' => 'Word of mouth'], ['value' => 'clcb', 'label' => 'A CLCB session'], ['value' => 'press', 'label' => 'News or press'], ['value' => 'other', 'label' => 'Other']];
    return '<form id="form-' . $f . '" action="/api/enquiry" method="post" data-form="' . $f . '" novalidate class="' . cn('grid gap-4 rounded-2xl p-6 sm:p-8', $light ? 'bg-indigo-deep/60 ring-1 ring-ivory/10' : 'bg-white ring-1 ring-line', $class) . '">'
        . honeypot()
        . '<div class="grid gap-4 sm:grid-cols-2">'
        . field(['form' => $f, 'label' => 'Your name', 'name' => 'name', 'required' => true, 'autocomplete' => 'name', 'light' => $light])
        . field(['form' => $f, 'label' => 'Phone', 'name' => 'phone', 'type' => 'tel', 'required' => true, 'autocomplete' => 'tel', 'light' => $light]) . '</div>'
        . field(['form' => $f, 'label' => 'Email', 'name' => 'email', 'type' => 'email', 'required' => true, 'autocomplete' => 'email', 'light' => $light])
        . '<div class="grid gap-4 sm:grid-cols-2">'
        . field(['form' => $f, 'label' => "I'm interested in", 'name' => 'path', 'as' => 'select', 'required' => true, 'light' => $light, 'value' => $defaultPath ?? $paths[0], 'options' => $opts])
        . field(['form' => $f, 'label' => 'Approximate amount (optional)', 'name' => 'amount', 'placeholder' => 'e.g. ₹10,000 a month or ₹1 crore', 'light' => $light]) . '</div>'
        . field(['form' => $f, 'label' => "Anything you'd like us to know", 'name' => 'message', 'as' => 'textarea', 'rows' => 3, 'light' => $light])
        . field(['form' => $f, 'label' => 'How did you find us?', 'name' => 'source', 'as' => 'select', 'light' => $light, 'options' => $source])
        . consent_box($f, 'I agree to be contacted by Dhanvesttor about my enquiry. We never share your details.', $light)
        . form_failed_note($f, 'Something went wrong. Please try again or email ho@dhanvesttor.com.')
        . submit_button('Send enquiry', $light ? 'raspberry' : 'primary')
        . '</form>';
}

function clcb_join_form(): string
{
    $f = 'clcb';
    return '<form id="form-' . $f . '" action="/api/clcb" method="post" data-form="' . $f . '" novalidate class="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">'
        . honeypot()
        . '<div class="grid gap-4 sm:grid-cols-2">'
        . field(['form' => $f, 'label' => 'Your name', 'name' => 'name', 'required' => true, 'autocomplete' => 'name'])
        . field(['form' => $f, 'label' => 'City', 'name' => 'city', 'required' => true, 'autocomplete' => 'address-level2']) . '</div>'
        . '<div class="grid gap-4 sm:grid-cols-2">'
        . field(['form' => $f, 'label' => 'Email', 'name' => 'email', 'type' => 'email', 'required' => true, 'autocomplete' => 'email'])
        . field(['form' => $f, 'label' => 'Phone (WhatsApp)', 'name' => 'phone', 'type' => 'tel', 'required' => true, 'autocomplete' => 'tel']) . '</div>'
        . field(['form' => $f, 'label' => 'Where are you with money right now?', 'name' => 'stage', 'as' => 'select', 'required' => true, 'options' => [['value' => 'starting', 'label' => 'Starting from zero'], ['value' => 'some', 'label' => 'I invest a little, want to understand more'], ['value' => 'experienced', 'label' => 'Experienced, want a community']]])
        . field(['form' => $f, 'label' => 'What would you like to learn? (optional)', 'name' => 'interests', 'as' => 'textarea', 'rows' => 3])
        . consent_box($f, 'Keep me posted about CLCB sessions. No sales calls.')
        . form_failed_note($f, 'Something went wrong. Please try again.')
        . submit_button('Join the community')
        . '</form>';
}

function apply_form(?string $role = null, ?string $department = null): string
{
    $f = 'apply';
    $depts = array_map(fn($d) => ['value' => $d, 'label' => $d ?: 'Choose one'], ['', 'Sales', 'Finance', 'Marketing', 'Accounts', 'HR & Admin', 'CLCB', 'Compliance', 'Other']);
    return '<form id="form-' . $f . '" action="/api/apply" method="post" enctype="multipart/form-data" data-form="' . $f . '" novalidate class="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">'
        . honeypot()
        . '<div class="grid gap-4 sm:grid-cols-2">'
        . field(['form' => $f, 'label' => 'Your name', 'name' => 'name', 'required' => true, 'autocomplete' => 'name'])
        . field(['form' => $f, 'label' => 'Phone', 'name' => 'phone', 'type' => 'tel', 'required' => true, 'autocomplete' => 'tel']) . '</div>'
        . field(['form' => $f, 'label' => 'Email', 'name' => 'email', 'type' => 'email', 'required' => true, 'autocomplete' => 'email'])
        . '<div class="grid gap-4 sm:grid-cols-2">'
        . field(['form' => $f, 'label' => "Role you're applying for", 'name' => 'role', 'required' => true, 'value' => $role ?? ''])
        . field(['form' => $f, 'label' => 'Department', 'name' => 'department', 'as' => 'select', 'value' => $department ?? '', 'options' => $depts]) . '</div>'
        . field(['form' => $f, 'label' => 'LinkedIn (optional)', 'name' => 'linkedin', 'type' => 'url', 'placeholder' => 'https://linkedin.com/in/…'])
        . field(['form' => $f, 'label' => 'CV (PDF or Word, under 5 MB)', 'name' => 'cv', 'type' => 'file', 'accept' => '.pdf,.doc,.docx'])
        . field(['form' => $f, 'label' => 'A few lines about why Dhanvesttor', 'name' => 'note', 'as' => 'textarea', 'rows' => 4])
        . consent_box($f, 'I agree to Dhanvesttor storing my application for recruitment purposes.')
        . form_failed_note($f, 'Something went wrong. Please email your CV to ho@dhanvesttor.com.')
        . submit_button('Send application')
        . '</form>';
}

function newsletter_form(bool $dark = false, string $class = ''): string
{
    $flash = flash_for('newsletter');
    $value = $flash['old']['email'] ?? '';
    return '<form action="/api/newsletter" method="post" data-form="newsletter" data-inline-done="Thank you. The next letter is on its way." data-done-class="' . ($dark ? 'text-[14px] text-ivory/80' : 'text-[14px] text-[#3f3d5c]') . '" class="' . cn('flex max-w-md flex-wrap gap-2', $class) . '">'
        . honeypot()
        . '<label for="nl-email" class="sr-only">Email</label>'
        . '<input id="nl-email" name="email" type="email" required placeholder="you@example.com" autocomplete="email"' . ($value !== '' ? ' value="' . e($value) . '"' : '')
        . ' class="' . cn('min-w-0 flex-1 rounded-full border px-4 py-2.5 text-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-raspberry/60', $dark ? 'border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40' : 'border-line bg-white text-ink') . '">'
        . '<button type="submit" data-busy-label="…" class="' . cn('rounded-full px-4 py-2.5 text-[13px] font-medium', $dark ? 'bg-raspberry text-ivory' : 'bg-indigo text-ivory') . '">Subscribe</button>'
        . '<p data-form-failed class="w-full text-[12px] text-raspberry" role="alert"' . ($flash ? '' : ' hidden') . '>Try again.</p>'
        . '</form>';
}
