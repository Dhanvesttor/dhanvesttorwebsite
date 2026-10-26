<?php
/**
 * Sends form emails with PHPMailer: over SMTP when smtp.user is configured (Google Workspace),
 * otherwise through the server's mail(). In development nothing is sent; only the form type is logged,
 * never the visitor's details.
 */

use PHPMailer\PHPMailer\PHPMailer;

/** @param array{to?:?string,subject:string,html:string,reply_to?:string,attachments?:array,kind?:string} $m */
function send_mail(array $m): bool
{
    $to = $m['to'] ?? null ?: config('mail_to', 'ho@dhanvesttor.com');
    if (is_dev() && !config('smtp.user')) {
        error_log('[mail] development: not sending ' . ($m['kind'] ?? 'form') . ' email to ' . $to . (!empty($m['attachments']) ? ' (with attachment)' : ''));
        return true;
    }

    require_once APP_DIR . '/vendor/PHPMailer/Exception.php';
    require_once APP_DIR . '/vendor/PHPMailer/PHPMailer.php';
    require_once APP_DIR . '/vendor/PHPMailer/SMTP.php';

    $mail = new PHPMailer(true);
    try {
        if (config('smtp.user')) {
            $mail->isSMTP();
            $mail->Host = (string) config('smtp.host', 'smtp.gmail.com');
            $mail->Port = (int) config('smtp.port', 587);
            $mail->SMTPAuth = true;
            $mail->Username = (string) config('smtp.user');
            $mail->Password = (string) config('smtp.pass');
            $mail->SMTPSecure = config('smtp.secure', 'tls') === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Timeout = 15;
        } else {
            $mail->isMail();
        }
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->setFrom((string) config('mail_from', 'no-reply@dhanvesttor.com'), (string) config('mail_from_name', 'Dhanvesttor Website'));
        $mail->addAddress($to);
        if (!empty($m['reply_to'])) $mail->addReplyTo($m['reply_to']);
        $mail->Subject = $m['subject'];
        $mail->isHTML(true);
        $mail->Body = $m['html'];
        $mail->AltBody = trim(html_entity_decode(strip_tags(str_replace(['</tr>', '</h2>'], "\n", $m['html'])), ENT_QUOTES, 'UTF-8'));
        foreach ($m['attachments'] ?? [] as $a) $mail->addAttachment($a['path'], $a['name']);
        $mail->send();
        return true;
    } catch (Throwable $t) {
        error_log('[mail] sending ' . ($m['kind'] ?? 'form') . ' email failed: ' . $mail->ErrorInfo);
        return false;
    }
}

/** @param array<array{0:string,1:mixed}> $rows */
function mail_table(array $rows): string
{
    $out = '<table style="font:14px system-ui;border-collapse:collapse">';
    foreach ($rows as [$k, $v]) $out .= '<tr><td style="padding:6px 12px 6px 0;color:#6E6C86">' . e($k) . '</td><td style="padding:6px 0">' . nl2br(e($v)) . '</td></tr>';
    return $out . '</table>';
}
