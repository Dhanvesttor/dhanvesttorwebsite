<?php
/** Page metadata, structured data (JSON-LD), robots.txt and sitemap.xml. Mirrors src/lib/seo.ts. */

const DEFAULT_TITLE = 'Dhanvesttor | Portfolio Management, Mutual Funds & CLCB';
const DEFAULT_DESCRIPTION = 'Dhanvesttor is a SEBI-registered portfolio manager in Kolkata. Personal portfolios, curated mutual funds and a community that teaches the language of money.';

/** Full <title> for a page: the home page uses its title as is, every other page gets " | Dhanvesttor". */
function page_title(array $meta): string
{
    if (empty($meta['title'])) return DEFAULT_TITLE;
    return ($meta['path'] ?? '') === '/' ? $meta['title'] : $meta['title'] . ' | Dhanvesttor';
}

/** <meta>/<link> tags for title, description, canonical, robots, Open Graph and Twitter. */
function meta_tags(array $meta): string
{
    $title = page_title($meta);
    $desc = $meta['description'] ?? DEFAULT_DESCRIPTION;
    $out = ['<title>' . e($title) . '</title>', '<meta name="description" content="' . e($desc) . '">'];
    if (!isset($meta['path'])) {
        if (!empty($meta['noIndex'])) $out[] = '<meta name="robots" content="noindex">';
        return implode("\n", $out);
    }

    $url = BASE_URL . $meta['path'];
    $image = $meta['image'] ?? BASE_URL . '/og-default.png';
    $type = $meta['type'] ?? 'website';
    $out[] = '<link rel="canonical" href="' . e($url) . '">';
    $out[] = '<meta name="robots" content="' . (!empty($meta['noIndex']) ? 'noindex, nofollow' : 'index, follow') . '">';
    $og = ['og:title' => $title, 'og:description' => $desc, 'og:url' => $url, 'og:site_name' => site()['name'], 'og:locale' => 'en_IN',
        'og:image' => $image, 'og:image:width' => '1200', 'og:image:height' => '630', 'og:image:alt' => $meta['title'], 'og:type' => $type];
    if ($type === 'article') {
        if (!empty($meta['publishedTime'])) $og['article:published_time'] = $meta['publishedTime'];
        foreach ($meta['authors'] ?? [] as $a) $out[] = '<meta property="article:author" content="' . e($a) . '">';
    }
    foreach ($og as $k => $v) $out[] = '<meta property="' . $k . '" content="' . e($v) . '">';
    foreach (['twitter:card' => 'summary_large_image', 'twitter:title' => $title, 'twitter:description' => $desc, 'twitter:image' => $image] as $k => $v)
        $out[] = '<meta name="' . $k . '" content="' . e($v) . '">';
    return implode("\n", $out);
}

function json_ld(array $data): string
{
    $json = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    return '<script type="application/ld+json">' . str_replace('<', '<', (string) $json) . '</script>';
}

function organization_json_ld(): array
{
    $s = site();
    return [
        '@context' => 'https://schema.org', '@type' => 'FinancialService', '@id' => BASE_URL . '/#organization',
        'name' => $s['name'], 'legalName' => $s['legalName'], 'url' => BASE_URL, 'logo' => BASE_URL . '/brand/logo.png',
        'slogan' => $s['tagline'], 'telephone' => '+91-33-2280-0152', 'email' => $s['email'],
        'address' => ['@type' => 'PostalAddress', 'streetAddress' => $s['address']['line1'] . ', ' . $s['address']['line2'],
            'addressLocality' => $s['address']['city'], 'addressRegion' => $s['address']['state'], 'postalCode' => $s['address']['pin'], 'addressCountry' => 'IN'],
        'sameAs' => array_values($s['socials']), 'areaServed' => 'IN',
        'identifier' => ['@type' => 'PropertyValue', 'name' => 'SEBI Portfolio Manager Registration', 'value' => $s['sebiReg']],
    ];
}

function breadcrumb_json_ld(array $crumbs): array
{
    return ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => array_map(
        fn($c, $i) => ['@type' => 'ListItem', 'position' => $i + 1, 'name' => $c['name'], 'item' => BASE_URL . $c['path']], $crumbs, array_keys($crumbs))];
}

function faq_json_ld(array $items): array
{
    return ['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => array_map(
        fn($i) => ['@type' => 'Question', 'name' => $i['q'], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $i['a']]], $items)];
}

function article_json_ld(array $p): array
{
    return array_filter([
        '@context' => 'https://schema.org', '@type' => 'Article', 'headline' => $p['title'], 'description' => $p['excerpt'],
        'datePublished' => $p['date'], 'dateModified' => $p['modified'] ?? $p['date'], 'image' => !empty($p['cover']) ? [$p['cover']] : null,
        'author' => ['@type' => 'Person', 'name' => $p['author']['name'], 'url' => BASE_URL . '/insights/author/' . $p['author']['slug']],
        'publisher' => ['@id' => BASE_URL . '/#organization'], 'mainEntityOfPage' => BASE_URL . '/insights/' . $p['slug'],
    ], fn($v) => $v !== null);
}

function person_json_ld(array $m): array
{
    return array_filter([
        '@context' => 'https://schema.org', '@type' => 'Person', 'name' => $m['name'], 'jobTitle' => $m['role'],
        'worksFor' => ['@id' => BASE_URL . '/#organization'], 'url' => BASE_URL . '/about/team/' . $m['slug'],
        'sameAs' => !empty($m['linkedin']) ? [$m['linkedin']] : null,
    ], fn($v) => $v !== null);
}

function web_page_json_ld(string $name, string $path, string $description): array
{
    return ['@context' => 'https://schema.org', '@type' => 'WebPage', 'name' => $name, 'url' => BASE_URL . $path, 'description' => $description, 'isPartOf' => ['@id' => BASE_URL . '/#organization']];
}

/** Crawling is allowed only on dhanvesttor.com itself; any other copy (staging, localhost) stays out of search. */
function robots_txt(): void
{
    header('Content-Type: text/plain; charset=utf-8');
    $host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
    if (!in_array($host, ['dhanvesttor.com', 'www.dhanvesttor.com'], true)) { echo "User-Agent: *\nDisallow: /\n"; return; }
    echo "User-Agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thank-you\n\nHost: https://dhanvesttor.com\nSitemap: https://dhanvesttor.com/sitemap.xml\n";
}

function sitemap_xml(): void
{
    $now = gmdate('c');
    $entries = [];
    foreach (content('routes')['staticRoutes'] as $r) $entries[] = [BASE_URL . $r['path'], $now, $r['changeFrequency'], $r['priority']];
    foreach (team() as $m) $entries[] = [BASE_URL . '/about/team/' . $m['slug'], null, 'yearly', 0.5];
    foreach (cms_posts() as $p) $entries[] = [BASE_URL . '/insights/' . $p['slug'], gmdate('c', strtotime($p['modified'] ?? $p['date'])), 'monthly', 0.7];
    foreach (cms_categories() as $c) $entries[] = [BASE_URL . '/insights/category/' . $c['slug'], null, 'weekly', 0.5];
    foreach (cms_authors() as $a) $entries[] = [BASE_URL . '/insights/author/' . $a['slug'], null, 'monthly', 0.4];
    foreach (cms_jobs(true) as $j) $entries[] = [BASE_URL . '/careers/roles/' . $j['slug'], null, 'weekly', 0.5];

    header('Content-Type: application/xml; charset=utf-8');
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    foreach ($entries as [$loc, $mod, $freq, $prio]) {
        echo "<url>\n<loc>" . e($loc) . "</loc>\n" . ($mod ? "<lastmod>$mod</lastmod>\n" : '') . "<changefreq>$freq</changefreq>\n<priority>$prio</priority>\n</url>\n";
    }
    echo "</urlset>\n";
}
