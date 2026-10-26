<?php
/** Small shared helpers: config, escaping, content access, dates, assets. */

function config(string $key, mixed $default = null): mixed
{
    static $cfg = null;
    if ($cfg === null) {
        $file = is_file(APP_DIR . '/config.php') ? APP_DIR . '/config.php' : APP_DIR . '/config.example.php';
        $cfg = require $file;
        // Local dev server sets DV_ENV=development without needing a config.php.
        if (getenv('DV_ENV')) $cfg['env'] = getenv('DV_ENV');
    }
    $v = $cfg;
    foreach (explode('.', $key) as $k) {
        if (!is_array($v) || !array_key_exists($k, $v)) return $default;
        $v = $v[$k];
    }
    return $v;
}

function is_dev(): bool { return config('env') !== 'production'; }

/** Escape text for HTML. */
function e(mixed $s): string { return htmlspecialchars((string) ($s ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

/** Join class names, skipping empty ones (same as cn() in the Next.js site). */
function cn(mixed ...$parts): string { return implode(' ', array_filter($parts, fn($p) => is_string($p) && $p !== '')); }

/** Render a closure's echoed output (or pass a string through) so components can take "children". */
function capture(mixed $children): string
{
    if ($children === null) return '';
    if (is_callable($children)) { ob_start(); $children(); return (string) ob_get_clean(); }
    return (string) $children;
}

/** Named exports of app/content/<file>.php, loaded once. */
function content(string $file): array
{
    static $cache = [];
    return $cache[$file] ??= require APP_DIR . "/content/$file.php";
}

function site(): array { return content('site')['site']; }
function disclaimers(): array { return content('disclaimers')['disclaimers']; }
function photos(): array { return content('images')['photos']; }
function todo(): array { return content('todo')['TODO']; }
function team(): array { return content('team')['team']; }
function get_member(string $slug): ?array { foreach (team() as $m) if ($m['slug'] === $slug) return $m; return null; }
function calculators_meta(): array { return content('calculators')['calculators']; }
function get_calc(string $slug): ?array { foreach (calculators_meta() as $c) if ($c['slug'] === $slug) return $c; return null; }
function mf_categories(): array { return content('mfCategories')['mfCategories']; }
function get_mf_category(string $slug): array { foreach (mf_categories() as $c) if ($c['slug'] === $slug) return $c; throw new RuntimeException("Unknown category $slug"); }
function has_todo(mixed $v): bool { return $v === '' || $v === null || (is_array($v) && !$v); }

/** Dates in the site's style, Indian time. */
function to_date(string $iso): DateTimeImmutable { return (new DateTimeImmutable($iso))->setTimezone(new DateTimeZone('Asia/Kolkata')); }
function format_date(string $iso): string { return to_date($iso)->format('j F Y'); }
function short_month(DateTimeInterface $d): string { $m = $d->format('M'); return $m === 'Sep' ? 'Sept' : $m; }
function format_datetime(string $iso): string { $d = to_date($iso); return $d->format('j ') . short_month($d) . $d->format(' Y, g:i a'); }

/** Public asset URL with a cache-busting version from the file's modified time. */
function asset(string $path): string
{
    $file = PUBLIC_DIR . $path;
    return $path . (is_file($file) ? '?v=' . base_convert((string) filemtime($file), 10, 36) : '');
}

function current_path(): string { return $GLOBALS['__path'] ?? '/'; }

/** "1" -> "01" */
function pad2(int $n): string { return str_pad((string) $n, 2, '0', STR_PAD_LEFT); }

function json_out(array $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function redirect(string $to, int $status = 302): never
{
    header('Location: ' . $to, true, $status);
    exit;
}

final class NotFound extends Exception {}
function not_found(): never { throw new NotFound(); }
