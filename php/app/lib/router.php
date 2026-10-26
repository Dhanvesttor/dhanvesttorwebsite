<?php
/**
 * Maps a URL to a page file:
 *   /                → pages/index.php
 *   /pms             → pages/pms/index.php or pages/pms.php
 *   /pms/fees        → pages/pms/fees.php
 *   /insights/{slug} → pages/insights/_slug.php  (exact files win over _slug.php)
 */

/** Old WordPress URLs and their new homes, so existing links and rankings carry over. */
const OLD_URLS = [
    '/about-us' => '/about',
    '/services' => '/pms',
    '/contact-us' => '/contact',
    '/blog' => '/insights',
    '/privacy-policy' => '/regulatory/privacy',
    '/disclaimer' => '/regulatory/disclaimer',
    '/regulatory-information' => '/regulatory',
    '/accessibility-statement' => '/regulatory/accessibility',
    '/mutual-funds-vs-portfolio-management-services-whats-right-for-you' => '/insights/pms-vs-mutual-funds-honest-comparison',
    '/understanding-the-phases-of-a-bear-market-a-complete-breakdown' => '/insights/what-a-bear-market-feels-like',
];

function handle_request(): void
{
    $uri = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
    $query = isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] !== '' ? '?' . $_SERVER['QUERY_STRING'] : '';
    $trimmed = $uri === '/' ? '/' : rtrim($uri, '/');

    if (isset(OLD_URLS[$trimmed])) redirect(OLD_URLS[$trimmed], 301);
    if ($trimmed !== $uri) redirect($trimmed . $query, 308);
    $GLOBALS['__path'] = $uri;

    try {
        if ($uri === '/robots.txt') { robots_txt(); return; }
        if ($uri === '/sitemap.xml') { sitemap_xml(); return; }
        if (str_starts_with($uri, '/api/')) { handle_api(substr($uri, 5)); return; }

        $match = resolve_page($uri);
        if (!$match) not_found();
        echo render_page($match[0], $match[1]);
    } catch (NotFound) {
        http_response_code(404);
        echo render_page(APP_DIR . '/pages/_404.php');
    } catch (Throwable $t) {
        error_log('[site] ' . $t->getMessage() . ' in ' . $t->getFile() . ':' . $t->getLine());
        http_response_code(500);
        if (is_dev()) { echo '<pre>' . e((string) $t) . '</pre>'; return; }
        echo '<!doctype html><meta charset="utf-8"><title>Something went wrong</title><p style="font:16px system-ui;padding:2rem">Something went wrong on our side. Please try again, or call 033 2280 0152.</p>';
    }
}

/** @return array{0:string,1:array}|null */
function resolve_page(string $uri): ?array
{
    $pages = APP_DIR . '/pages';
    if ($uri === '/') return [$pages . '/index.php', []];
    // Segments may not start with "." or "_" (no "..", no private files like _slug.php) or contain control characters.
    if (!preg_match('#^(/(?![._])[^/\\\\\x00-\x1f]+)+$#u', $uri) || preg_match('#/index(/|$)#', $uri)) return null;
    foreach ([$pages . $uri . '.php', $pages . $uri . '/index.php'] as $f) if (is_file($f)) return [$f, []];
    $slugFile = $pages . dirname($uri) . '/_slug.php';
    if (is_file($slugFile)) return [$slugFile, ['slug' => basename($uri)]];
    return null;
}

/**
 * Runs a page file and wraps its output in the site layout. A page sets $meta (title, description, path…)
 * and echoes its body; it may call not_found().
 */
function render_page(string $file, array $params = []): string
{
    $meta = [];
    ob_start();
    try {
        (function () use ($file, $params, &$meta) { require $file; })();
    } catch (Throwable $t) {
        ob_end_clean();
        throw $t;
    }
    $body = (string) ob_get_clean();
    return layout($meta, $body);
}

function handle_api(string $name): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        header('Allow: POST');
        json_out(['ok' => false, 'error' => 'Method not allowed'], 405);
    }
    match ($name) {
        'enquiry', 'clcb', 'apply', 'newsletter' => handle_form($name),
        'revalidate' => handle_revalidate(),
        default => json_out(['ok' => false], 404),
    };
}

function handle_revalidate(): void
{
    $secret = (string) config('revalidate_secret', '');
    if ($secret === '' || !hash_equals($secret, (string) ($_GET['secret'] ?? ''))) json_out(['ok' => false], 401);
    $map = [
        'post' => ['/insights', '/', '/sitemap.xml'],
        'job' => ['/careers', '/careers/roles', '/sitemap.xml'],
        'event' => ['/clcb/events', '/clcb', '/'],
        'press' => ['/media', '/about'],
        'faq' => ['/pms/faqs', '/mutual-funds/faqs', '/clcb'],
    ];
    $type = (string) ($_GET['type'] ?? 'post');
    cms_clear_cache();
    json_out(['ok' => true, 'revalidated' => $map[$type] ?? $map['post']]);
}
