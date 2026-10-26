<?php
/**
 * Content source for posts, jobs, events, press and FAQs.
 * With wordpress_graphql_url set, reads WordPress (WPGraphQL) through a 5-minute file cache;
 * if WordPress is unreachable, falls back to the seed content in app/content/data so pages never break.
 */

const CMS_CACHE_TTL = 300;

function cms_categories_local(): array
{
    return [
        ['slug' => 'markets', 'name' => 'Markets', 'description' => 'What is moving, and what it means for a long-term investor.'],
        ['slug' => 'pms', 'name' => 'Portfolio Management', 'description' => 'How PMS works, how we run FAITH, and what to ask any manager.'],
        ['slug' => 'mutual-funds', 'name' => 'Mutual Funds', 'description' => 'Choosing, holding and reviewing funds without the noise.'],
        ['slug' => 'women-and-money', 'name' => 'Women & Money', 'description' => 'Ownership, confidence and the conversations that change outcomes.'],
        ['slug' => 'clcb', 'name' => 'CLCB', 'description' => 'Notes from our workshops and community.'],
        ['slug' => 'media', 'name' => 'News & Media', 'description' => 'Coverage, announcements and milestones.'],
    ];
}

function cms_authors_local(): array
{
    return [
        ['slug' => 'anooshka-soham-bathwal', 'name' => 'Anooshka Soham Bathwal', 'role' => 'Founder & CEO', 'bio' => 'Founder of Dhanvesttor. Writes about ownership, women and the long game.'],
        ['slug' => 'ishan-daga', 'name' => 'Ishan Daga', 'role' => 'Fund Manager', 'bio' => 'Manages the FAITH Fund. Writes about businesses, valuations and patience.'],
        ['slug' => 'dhanvesttor-research', 'name' => 'Dhanvesttor Research', 'role' => 'Research desk', 'bio' => 'The research and content team at Dhanvesttor.'],
    ];
}

function cms_data(string $file): array
{
    static $cache = [];
    return $cache[$file] ??= json_decode((string) file_get_contents(APP_DIR . '/content/data/' . $file), true) ?: [];
}

/** ISO 8601 in UTC with milliseconds, like JavaScript's toISOString(). */
function iso(string $date): string { return (new DateTimeImmutable($date, new DateTimeZone('UTC')))->setTimezone(new DateTimeZone('UTC'))->format('Y-m-d\TH:i:s.v\Z'); }

function cms_local_posts(): array
{
    static $posts = null;
    if ($posts !== null) return $posts;
    $cats = array_column(cms_categories_local(), null, 'slug');
    $authors = array_column(cms_authors_local(), null, 'slug');
    $posts = [];
    foreach (glob(APP_DIR . '/content/data/posts/*.md') ?: [] as $f) {
        [$d, $body] = parse_front_matter((string) file_get_contents($f));
        $html = markdown($body);
        $posts[] = [
            'slug' => $d['slug'] ?? basename($f, '.md'),
            'title' => $d['title'] ?? '',
            'excerpt' => $d['excerpt'] ?? '',
            'html' => $html,
            'date' => iso((string) $d['date']),
            'modified' => isset($d['modified']) ? iso((string) $d['modified']) : null,
            'author' => $authors[$d['author'] ?? ''] ?? $authors['dhanvesttor-research'],
            'category' => $cats[$d['category'] ?? ''] ?? $cats['markets'],
            'tags' => $d['tags'] ?? [],
            'cover' => $d['cover'] ?? null,
            'coverAlt' => $d['coverAlt'] ?? null,
            'readingMinutes' => reading_minutes($html),
            'seo' => ['title' => $d['seoTitle'] ?? null, 'description' => $d['seoDescription'] ?? ($d['excerpt'] ?? null)],
        ];
    }
    usort($posts, fn($a, $b) => strcmp($b['date'], $a['date']));
    return $posts;
}

/* ---------- WordPress (WPGraphQL) ---------- */

function wp_query(string $query, array $vars = []): array
{
    $url = (string) config('wordpress_graphql_url');
    $key = APP_DIR . '/storage/cache/wp-' . md5($query . json_encode($vars)) . '.json';
    if (is_file($key) && filemtime($key) > time() - CMS_CACHE_TTL) return json_decode((string) file_get_contents($key), true);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8, CURLOPT_CONNECTTIMEOUT => 4,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode(['query' => $query, 'variables' => (object) $vars]),
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    $json = is_string($res) ? json_decode($res, true) : null;
    if ($code !== 200 || !is_array($json) || !empty($json['errors']) || !isset($json['data'])) throw new RuntimeException("WordPress request failed ($code)");
    @file_put_contents($key, json_encode($json['data']), LOCK_EX);
    return $json['data'];
}

/** Run a WordPress reader, or the local one if WordPress isn't configured or fails. */
function cms_try(callable $wp, callable $local): mixed
{
    static $warned = false;
    if (!config('wordpress_graphql_url')) return $local();
    try {
        return $wp();
    } catch (Throwable $t) {
        if (!$warned) { $warned = true; error_log('[cms] WordPress unreachable, serving local seed content. ' . $t->getMessage()); }
        return $local();
    }
}

function cms_clear_cache(): void
{
    foreach (glob(APP_DIR . '/storage/cache/wp-*.json') ?: [] as $f) @unlink($f);
}

const WP_POST_FIELDS = 'fragment PostFields on Post { slug title excerpt content date modified author { node { slug name description avatar { url } } } categories { nodes { slug name description } } tags { nodes { name } } featuredImage { node { sourceUrl altText } } dvSeo { title metaDesc } }';

function wp_map_post(array $n): array
{
    $a = $n['author']['node'] ?? null;
    $c = $n['categories']['nodes'][0] ?? null;
    return [
        'slug' => $n['slug'], 'title' => $n['title'], 'excerpt' => trim(strip_tags($n['excerpt'] ?? '')), 'html' => $n['content'] ?? '',
        'date' => $n['date'], 'modified' => $n['modified'] ?? null,
        'author' => ['slug' => $a['slug'] ?? 'team', 'name' => $a['name'] ?? 'Dhanvesttor', 'role' => '', 'bio' => $a['description'] ?? '', 'photo' => $a['avatar']['url'] ?? null],
        'category' => ['slug' => $c['slug'] ?? 'markets', 'name' => $c['name'] ?? 'Markets', 'description' => $c['description'] ?? ''],
        'tags' => array_map(fn($t) => $t['name'], $n['tags']['nodes'] ?? []),
        'cover' => $n['featuredImage']['node']['sourceUrl'] ?? null, 'coverAlt' => $n['featuredImage']['node']['altText'] ?? null,
        'readingMinutes' => reading_minutes($n['content'] ?? ''),
        'seo' => ['title' => $n['dvSeo']['title'] ?? null, 'description' => $n['dvSeo']['metaDesc'] ?? null],
    ];
}

/* ---------- Public API ---------- */

/** @param array{category?:string,tag?:string,author?:string,limit?:int} $opts */
function cms_posts(array $opts = []): array
{
    return cms_try(function () use ($opts) {
        $where = [];
        foreach (['category' => 'categoryName', 'tag' => 'tag', 'author' => 'authorName'] as $k => $wpKey) {
            if (!empty($opts[$k])) $where[] = $wpKey . ': ' . json_encode($opts[$k]);
        }
        $q = WP_POST_FIELDS . ' query Posts($first: Int!) { posts(first: $first, where: { ' . implode(', ', $where) . ' orderby: { field: DATE, order: DESC } }) { nodes { ...PostFields } } }';
        return array_map('wp_map_post', wp_query($q, ['first' => $opts['limit'] ?? 100])['posts']['nodes']);
    }, function () use ($opts) {
        $posts = cms_local_posts();
        if (!empty($opts['category'])) $posts = array_values(array_filter($posts, fn($p) => $p['category']['slug'] === $opts['category']));
        if (!empty($opts['tag'])) $posts = array_values(array_filter($posts, fn($p) => in_array($opts['tag'], $p['tags'], true)));
        if (!empty($opts['author'])) $posts = array_values(array_filter($posts, fn($p) => $p['author']['slug'] === $opts['author']));
        if (!empty($opts['limit'])) $posts = array_slice($posts, 0, $opts['limit']);
        return $posts;
    });
}

function cms_post(string $slug): ?array
{
    return cms_try(function () use ($slug) {
        $n = wp_query(WP_POST_FIELDS . ' query Post($slug: ID!) { post(id: $slug, idType: SLUG) { ...PostFields } }', ['slug' => $slug])['post'];
        return $n ? wp_map_post($n) : null;
    }, function () use ($slug) {
        foreach (cms_local_posts() as $p) if ($p['slug'] === $slug) return $p;
        return null;
    });
}

function cms_categories(): array
{
    return cms_try(fn() => array_map(fn($n) => ['slug' => $n['slug'] ?? 'markets', 'name' => $n['name'] ?? 'Markets', 'description' => $n['description'] ?? ''],
        wp_query('{ categories(first: 50) { nodes { slug name description } } }')['categories']['nodes']), 'cms_categories_local');
}

function cms_authors(): array
{
    return cms_try(fn() => array_map(fn($n) => ['slug' => $n['slug'] ?? 'team', 'name' => $n['name'] ?? 'Dhanvesttor', 'role' => '', 'bio' => $n['description'] ?? '', 'photo' => $n['avatar']['url'] ?? null],
        wp_query('{ users(first: 50, where: { hasPublishedPosts: [POST] }) { nodes { slug name description avatar { url } } } }')['users']['nodes']), 'cms_authors_local');
}

function cms_jobs(bool $openOnly = false): array
{
    $jobs = cms_try(fn() => array_map(fn($n) => [
        'slug' => $n['slug'], 'title' => $n['title'], 'html' => $n['content'] ?? '', 'postedAt' => $n['date'],
        'department' => $n['jobMeta']['department'] ?? '', 'location' => $n['jobMeta']['location'] ?? 'Kolkata',
        'type' => $n['jobMeta']['jobType'] ?? 'Full-time', 'summary' => $n['jobMeta']['summary'] ?? '',
        'applyEmail' => $n['jobMeta']['applyEmail'] ?? 'ho@dhanvesttor.com', 'open' => $n['jobMeta']['isOpen'] ?? true,
    ], wp_query('{ jobs(first: 100) { nodes { slug title content jobMeta { department location jobType summary applyEmail isOpen } date } } }')['jobs']['nodes']),
        fn() => cms_data('jobs.json'));
    return $openOnly ? array_values(array_filter($jobs, fn($j) => $j['open'])) : $jobs;
}

function cms_job(string $slug): ?array
{
    foreach (cms_jobs() as $j) if ($j['slug'] === $slug) return $j;
    return null;
}

/** @param bool|null $upcoming true = upcoming (soonest first), false = past, null = all */
function cms_events(?bool $upcoming = null): array
{
    $events = cms_try(fn() => array_map(fn($n) => [
        'slug' => $n['slug'], 'title' => $n['title'], 'date' => $n['eventMeta']['eventDate'] ?? '', 'city' => $n['eventMeta']['city'] ?? 'Kolkata',
        'mode' => $n['eventMeta']['mode'] ?? 'In person', 'summary' => $n['eventMeta']['summary'] ?? '', 'registerUrl' => $n['eventMeta']['registerUrl'] ?? null,
        'past' => strtotime($n['eventMeta']['eventDate'] ?? '@0') < time(),
    ], wp_query('{ events(first: 100) { nodes { slug title eventMeta { eventDate city mode summary registerUrl } } } }')['events']['nodes']),
        fn() => cms_data('events.json'));
    usort($events, fn($a, $b) => strcmp($b['date'], $a['date']));
    if ($upcoming === true) return array_reverse(array_values(array_filter($events, fn($e) => !$e['past'])));
    if ($upcoming === false) return array_values(array_filter($events, fn($e) => $e['past']));
    return $events;
}

function cms_press(): array
{
    $items = cms_try(fn() => array_map(fn($n) => ['title' => $n['title'], 'outlet' => $n['pressMeta']['outlet'] ?? '', 'url' => $n['pressMeta']['url'] ?? '#', 'date' => $n['pressMeta']['publishedOn'] ?? ''],
        wp_query('{ pressItems(first: 100) { nodes { title pressMeta { outlet url publishedOn } } } }')['pressItems']['nodes']),
        fn() => cms_data('press.json'));
    usort($items, fn($a, $b) => strcmp($b['date'], $a['date']));
    return $items;
}

function cms_faqs(?string $group = null): array
{
    $faqs = cms_try(fn() => array_map(fn($n) => ['q' => $n['title'], 'a' => trim(strip_tags($n['content'] ?? '')), 'group' => $n['faqMeta']['faqGroup'] ?? 'general'],
        wp_query('{ faqs(first: 200) { nodes { title content faqMeta { faqGroup } } } }')['faqs']['nodes']),
        fn() => cms_data('faqs.json'));
    return $group ? array_values(array_filter($faqs, fn($f) => $f['group'] === $group)) : $faqs;
}
