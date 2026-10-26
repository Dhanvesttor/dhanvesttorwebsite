<?php
/** Page sections, ported from src/components/sections. Titles/ledes marked HTML may contain <em>. */

/**
 * Standard inner-page hero. `tone` indigo for dark pages.
 * @param array{eyebrow?:string,title:string,lede?:string,crumbs?:array,actions?:string,image?:string,imageSrc?:?string,tone?:string,compact?:bool} $o
 */
function page_hero(array $o): string
{
    $tone = $o['tone'] ?? 'ivory';
    $light = $tone === 'indigo';
    $image = $o['image'] ?? null;
    $inner = '<div>'
        . (!empty($o['crumbs']) ? breadcrumbs($o['crumbs'], $light, 'mb-8') : '')
        . hairline('mb-6')
        . (!empty($o['eyebrow']) ? '<p class="' . cn('eyebrow mb-4', $light ? 'text-marigold' : '') . '">' . e($o['eyebrow']) . '</p>' : '')
        . '<h1 class="' . cn('max-w-[18ch] text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem]', $light ? '[&_em]:text-marigold' : '') . '">' . $o['title'] . '</h1>'
        . (!empty($o['lede']) ? '<div class="' . cn('mt-6 max-w-[56ch] text-[1.125rem] sm:text-[1.25rem]', $light ? 'text-ivory/80' : 'text-[#3f3d5c]') . '">' . $o['lede'] . '</div>' : '')
        . (!empty($o['actions']) ? '<div class="mt-8 flex flex-wrap gap-3">' . $o['actions'] . '</div>' : '')
        . '</div>'
        . ($image ? image_placeholder(['label' => $image, 'src' => $o['imageSrc'] ?? null, 'ratio' => '4/5', 'priority' => true, 'class' => 'lg:max-h-[560px]']) : '');
    return '<section class="' . cn($tone === 'indigo' ? 'bg-indigo text-ivory' : ($tone === 'sand' ? 'bg-sand' : 'bg-ivory'), 'border-b border-line') . '">'
        . container($inner, cn(!empty($o['compact']) ? 'py-14 sm:py-16' : 'py-16 sm:py-24', $image ? 'grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center' : ''))
        . '</section>';
}

function disclaimer(string $text, ?string $class = null): string
{
    return '<div class="' . ($class ?? 'border-t border-line bg-paper') . '">' . container('<p class="max-w-[120ch] text-[12.5px] leading-relaxed text-mist">' . e($text) . '</p>', 'py-8') . '</div>';
}

/** @param array<array{q:string,a:string}> $items */
function faq_list(array $items, string $class = ''): string
{
    if (!$items) return '';
    return json_ld(faq_json_ld($items)) . accordion(array_map(fn($f) => ['title' => $f['q'], 'body' => '<p>' . e($f['a']) . '</p>'], $items), $class);
}

/** @param array<array{title:string,blurb:string,href:string,meta?:string,index?:string}> $items  (plain text) */
function service_grid(array $items, int $columns = 3, string $class = ''): string
{
    $cols = [2 => 'md:grid-cols-2', 3 => 'md:grid-cols-3', 4 => 'md:grid-cols-2 lg:grid-cols-4', 5 => 'md:grid-cols-2 lg:grid-cols-5'][$columns];
    $out = '<ul class="' . cn('grid gap-4', $cols, $class) . '">';
    foreach (array_values($items) as $i => $it) {
        $out .= '<li><a href="' . e($it['href']) . '" class="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-indigo/30 hover:shadow-[var(--shadow-soft)]">'
            . '<div><span class="font-display text-[1.1rem] text-raspberry">' . e($it['index'] ?? pad2($i + 1)) . '</span>'
            . '<h3 class="mt-4 text-[1.5rem] leading-tight text-ink group-hover:text-indigo">' . e($it['title']) . '</h3>'
            . '<p class="mt-3 text-[14.5px] text-[#3f3d5c]">' . e($it['blurb']) . '</p></div>'
            . '<div class="mt-6 flex items-center justify-between text-[12.5px] uppercase tracking-[.14em] text-mist"><span>' . e($it['meta'] ?? '') . '</span><span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span></div>'
            . '</a></li>';
    }
    return $out . '</ul>';
}

/** @param array<array{title:string,text:string}> $steps */
function step_list(array $steps, bool $light = false, int $columns = 4): string
{
    $cols = [3 => 'md:grid-cols-3', 4 => 'md:grid-cols-2 lg:grid-cols-4', 5 => 'md:grid-cols-3 lg:grid-cols-5'][$columns];
    $out = '<ol class="' . cn('grid gap-6', $cols) . '">';
    foreach (array_values($steps) as $i => $s) {
        $out .= '<li class="' . cn('border-t pt-5', $light ? 'border-ivory/20' : 'border-line') . '"><span class="font-display text-[1.25rem] text-raspberry">' . pad2($i + 1) . '</span>'
            . '<h3 class="mt-3 text-[1.35rem] leading-tight">' . e($s['title']) . '</h3>'
            . '<p class="' . cn('mt-2 text-[14.5px]', $light ? 'text-ivory/80' : 'text-[#3f3d5c]') . '">' . e($s['text']) . '</p></li>';
    }
    return $out . '</ol>';
}

/** @param array<array{value:string,label:string,flag?:?string}> $stats */
function stat_band(array $stats, string $tone = 'paper', string $class = ''): string
{
    $light = $tone === 'indigo';
    $out = '<div class="' . cn('grid grid-cols-2 border-y border-line lg:grid-cols-4', $tone === 'paper' ? 'bg-paper' : ($tone === 'indigo' ? 'bg-indigo' : 'bg-ivory'), $class) . '">';
    foreach (array_values($stats) as $i => $s) {
        $out .= '<div class="' . cn('border-line p-7 sm:p-9', $i % 2 === 0 ? 'border-r' : '', $i < 2 ? 'border-b lg:border-b-0' : '', $i < 3 ? 'lg:border-r' : '', $light ? 'border-ivory/10' : '') . '">'
            . stat_item($s['value'], $s['label'], $s['flag'] ?? null, $light) . '</div>';
    }
    return $out . '</div>';
}

function press_strip(?array $outlets = null, string $class = '', bool $light = false): string
{
    $outlets ??= ['Mint', 'Fortune India', 'The Economic Times', 'Business Insider', "Harper's Bazaar", 'Cafemutual', 'Business India'];
    $out = '<div class="' . cn('flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-line px-4 py-6 sm:px-8', $class) . '"><span class="' . cn('eyebrow', $light ? 'text-marigold' : '') . '">As featured in</span>';
    foreach ($outlets as $o) $out .= '<span class="' . cn('font-display text-[1.1rem]', $light ? 'text-ivory/70' : 'text-mist') . '">' . e($o) . '</span>';
    return $out . '</div>';
}

function post_grid(array $posts, bool $featured = false): string
{
    if (!$posts) return '<p class="text-mist">No articles yet.</p>';
    $first = $posts[0];
    $out = '<div class="grid gap-10">';
    if ($featured) {
        $out .= '<a href="/insights/' . e($first['slug']) . '" class="group grid gap-8 rounded-2xl border border-line bg-white p-5 md:grid-cols-2 md:p-6">'
            . image_placeholder(['label' => $first['coverAlt'] ?? $first['title'], 'src' => $first['cover'] ?? null, 'alt' => $first['coverAlt'] ?? '', 'ratio' => '3/2'])
            . '<div class="flex flex-col justify-center"><p class="eyebrow">' . e($first['category']['name']) . ' · ' . $first['readingMinutes'] . ' min</p>'
            . '<h3 class="mt-3 text-[1.9rem] leading-tight group-hover:text-indigo sm:text-[2.25rem]">' . e($first['title']) . '</h3>'
            . '<p class="mt-4 text-[1rem] text-[#3f3d5c]">' . e($first['excerpt']) . '</p>'
            . '<p class="mt-5 text-[13px] text-mist">' . e($first['author']['name']) . ' · ' . format_date($first['date']) . '</p></div></a>';
    }
    $out .= '<ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">';
    foreach ($featured ? array_slice($posts, 1) : $posts as $p) {
        $out .= '<li><a href="/insights/' . e($p['slug']) . '" class="group block">'
            . image_placeholder(['label' => $p['coverAlt'] ?? $p['title'], 'src' => $p['cover'] ?? null, 'alt' => $p['coverAlt'] ?? '', 'ratio' => '3/2', 'sizes' => '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'])
            . '<p class="eyebrow mt-5">' . e($p['category']['name']) . ' · ' . $p['readingMinutes'] . ' min</p>'
            . '<h3 class="mt-2 text-[1.4rem] leading-tight group-hover:text-indigo">' . e($p['title']) . '</h3>'
            . '<p class="mt-2 line-clamp-2 text-[14.5px] text-[#3f3d5c]">' . e($p['excerpt']) . '</p>'
            . '<p class="mt-3 text-[12.5px] text-mist">' . format_date($p['date']) . '</p></a></li>';
    }
    return $out . '</ul></div>';
}

function event_list(array $events, string $emptyText = 'No sessions scheduled right now. Join the community and we will let you know first.'): string
{
    if (!$events) return '<p class="rounded-2xl border border-dashed border-line p-8 text-center text-mist">' . e($emptyText) . '</p>';
    $out = '<ul class="divide-y divide-line border-y border-line">';
    foreach ($events as $ev) {
        $d = to_date($ev['date']);
        $out .= '<li class="grid gap-5 py-7 md:grid-cols-[120px_1fr_auto] md:items-center">'
            . '<div class="font-display leading-none"><span class="block text-[2.75rem] text-indigo">' . $d->format('d') . '</span>'
            . '<span class="mt-1 block text-[13px] uppercase tracking-[.16em] text-mist">' . short_month($d) . ' ' . $d->format('Y') . '</span></div>'
            . '<div><p class="eyebrow">' . e($ev['mode']) . ' · ' . e($ev['city']) . '</p>'
            . '<h3 class="mt-2 text-[1.5rem] leading-tight">' . e($ev['title']) . '</h3>'
            . '<p class="mt-2 max-w-[60ch] text-[14.5px] text-[#3f3d5c]">' . e($ev['summary']) . '</p>'
            . '<p class="mt-2 text-[12.5px] text-mist">' . format_datetime($ev['date']) . ' IST</p></div>'
            . (empty($ev['past']) ? button('Register', ['href' => $ev['registerUrl'] ?? '/clcb/join', 'size' => 'sm']) : '')
            . '</li>';
    }
    return $out . '</ul>';
}

function team_grid(array $members, int $columns = 3): string
{
    $cols = [2 => 'sm:grid-cols-2', 3 => 'sm:grid-cols-2 lg:grid-cols-3', 4 => 'sm:grid-cols-2 lg:grid-cols-4'][$columns];
    $out = '<ul class="grid gap-8 ' . $cols . '">';
    foreach ($members as $m) {
        $out .= '<li><a href="/about/team/' . e($m['slug']) . '" class="group block">'
            . image_placeholder(['label' => $m['name'] . ', portrait', 'src' => $m['photo'] ?? null, 'alt' => $m['name'], 'ratio' => '4/5', 'class' => 'transition-transform duration-500 group-hover:-translate-y-1'])
            . '<h3 class="mt-5 text-[1.4rem] leading-tight group-hover:text-indigo">' . e($m['name']) . '</h3>'
            . '<p class="mt-1 text-[13px] uppercase tracking-[.14em] text-raspberry">' . e($m['role']) . '</p>'
            . '<p class="mt-3 text-[14.5px] text-[#3f3d5c]">' . e($m['short']) . '</p></a></li>';
    }
    return $out . '</ul>';
}

/** @param array<array{when:string,title:string,text?:string}> $items */
function timeline(array $items, bool $light = false): string
{
    $out = '<ol class="relative grid gap-10 border-l border-line pl-8 sm:pl-10">';
    foreach ($items as $it) {
        $out .= '<li class="relative"><span aria-hidden="true" class="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full bg-raspberry ring-4 ring-ivory sm:-left-[49px]"></span>'
            . '<p class="' . ($light ? 'eyebrow text-marigold' : 'eyebrow') . '">' . e($it['when']) . '</p>'
            . '<h3 class="mt-2 text-[1.5rem]">' . e($it['title']) . '</h3>'
            . (!empty($it['text']) ? '<p class="' . ($light ? 'mt-2 max-w-[56ch] text-ivory/80' : 'mt-2 max-w-[56ch] text-[#3f3d5c]') . '">' . e($it['text']) . '</p>' : '')
            . '</li>';
    }
    return $out . '</ol>';
}

function quote_block(string $quote, string $name, string $role, ?string $image = null, ?string $imageSrc = null, bool $light = false): string
{
    return '<figure class="grid items-center gap-10 md:grid-cols-[.8fr_1.4fr] md:gap-16">'
        . ($image ? image_placeholder(['label' => $image, 'src' => $imageSrc, 'alt' => $name, 'ratio' => '4/5']) : '')
        . '<div><blockquote class="' . ($light ? 'font-display text-[1.75rem] font-light leading-snug sm:text-[2.25rem] [&_em]:text-marigold' : 'font-display text-[1.75rem] font-light leading-snug text-ink sm:text-[2.25rem]') . '">“' . $quote . '”</blockquote>'
        . '<figcaption class="' . ($light ? 'mt-6 text-[14px] text-ivory/70' : 'mt-6 text-[14px] text-mist') . '"><span class="font-medium text-current">' . e($name) . '</span> · ' . e($role) . '</figcaption></div></figure>';
}

/**
 * Text beside an image; `flip` puts the image first on large screens. Children render under the lede.
 * @param array{eyebrow?:string,title:string,lede?:string,image:string,imageSrc?:?string,imageAlt?:string,flip?:bool,light?:bool,ratio?:string} $o
 */
function split_feature(array $o, mixed $children = null): string
{
    $flip = !empty($o['flip']);
    $light = !empty($o['light']);
    $kids = capture($children);
    return '<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><div' . ($flip ? ' class="lg:order-2"' : '') . '>' . hairline('mb-6')
        . (!empty($o['eyebrow']) ? '<p class="' . cn('eyebrow mb-3', $light ? 'text-marigold' : '') . '">' . e($o['eyebrow']) . '</p>' : '')
        . '<h2 class="text-[2.1rem] sm:text-[2.6rem]">' . $o['title'] . '</h2>'
        . (!empty($o['lede']) ? '<div class="' . cn('mt-5 max-w-[52ch] text-[1.0625rem] sm:text-lg', $light ? 'text-ivory/80' : 'text-[#3f3d5c]') . '">' . $o['lede'] . '</div>' : '')
        . ($kids !== '' ? '<div class="mt-7">' . $kids . '</div>' : '')
        . '</div>' . image_placeholder(['label' => $o['image'], 'src' => $o['imageSrc'] ?? null, 'alt' => $o['imageAlt'] ?? '', 'ratio' => $o['ratio'] ?? '4/5', 'class' => $flip ? 'lg:order-1' : '']) . '</div>';
}

function logo_wall(array $items, bool $compact = false): string
{
    $out = '<ul class="' . ($compact ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5' : 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4') . '">';
    foreach ($items as $a) {
        $out .= '<li id="' . e($a['slug']) . '" class="rounded-xl border border-line bg-white p-5"><p class="font-display text-[1.1rem] leading-tight text-indigo">' . e($a['name']) . '</p>'
            . (!$compact ? '<p class="mt-2 text-[13.5px] text-[#3f3d5c]">' . e($a['blurb']) . '</p>' : '') . '</li>';
    }
    return $out . '</ul>';
}

function perf_cell(?float $v): string
{
    if ($v === null) return '<span class="text-mist">—</span>';
    return '<span' . ($v < 0 ? ' class="text-raspberry-deep"' : '') . '>' . number_format($v, 2, '.', '') . '%</span>';
}

/** The only place PMS returns are shown. Always with benchmark, period, method and the SEBI disclaimer. */
function performance_table(): string
{
    $p = content('performance')['performance'];
    $out = '<div><div class="overflow-x-auto rounded-2xl border border-line bg-white"><table class="w-full text-[15px]">'
        . '<caption class="px-5 pt-5 text-left"><span class="eyebrow">FAITH Fund vs BSE 500 TRI</span><span class="mt-1 block text-[13px] text-mist">As of ' . e($p['asOf']) . ' · ' . e($p['source']) . '</span></caption>'
        . '<thead><tr class="border-b border-line text-left text-[12px] uppercase tracking-[.14em] text-mist"><th class="px-5 py-3 font-medium">Period</th><th class="px-5 py-3 font-medium">FAITH Fund</th><th class="px-5 py-3 font-medium">BSE 500 TRI</th><th class="px-5 py-3 font-medium">Difference</th></tr></thead><tbody>';
    foreach ($p['rows'] as $r) {
        $fund = $r['fund'] === null ? null : (float) $r['fund'];
        $bench = $r['benchmark'] === null ? null : (float) $r['benchmark'];
        $out .= '<tr class="border-b border-line last:border-0"><td class="px-5 py-3.5 font-medium text-ink">' . e($r['period']) . '</td>'
            . '<td class="px-5 py-3.5 font-display text-[1.15rem] text-indigo">' . perf_cell($fund) . '</td>'
            . '<td class="px-5 py-3.5 font-display text-[1.15rem]">' . perf_cell($bench) . '</td>'
            . '<td class="px-5 py-3.5">' . ($fund !== null && $bench !== null ? perf_cell(round($fund - $bench, 2)) : '<span class="text-mist">—</span>') . '</td></tr>';
    }
    return $out . '</tbody></table></div><p class="mt-4 text-[12.5px] leading-relaxed text-mist">' . e(disclaimers()['pmsPerformance']) . '</p></div>';
}

/** The closing section of most pages: a short invitation and the enquiry form. */
function contact_band(array $o = []): string
{
    $tone = $o['tone'] ?? 'indigo';
    $light = $tone === 'indigo';
    $s = site();
    $heading = $o['heading'] ?? 'Start a <em>conversation.</em>';
    $lede = $o['lede'] ?? 'Tell us a little about yourself. A person, not a bot, replies within one working day.';
    $dt = $light ? 'eyebrow text-marigold' : 'eyebrow';
    $body = '<div class="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20"><div>' . hairline('mb-6')
        . '<p class="' . ($light ? 'eyebrow text-marigold mb-3' : 'eyebrow mb-3') . '">Get in touch</p>'
        . '<h2 class="' . ($light ? 'text-[2.25rem] sm:text-[2.75rem] [&_em]:text-marigold' : 'text-[2.25rem] sm:text-[2.75rem]') . '">' . $heading . '</h2>'
        . '<p class="' . ($light ? 'mt-5 max-w-[46ch] text-ivory/80' : 'mt-5 max-w-[46ch] text-[#3f3d5c]') . '">' . e($lede) . '</p>'
        . '<dl class="' . ($light ? 'mt-10 grid gap-5 text-[14.5px] text-ivory/80' : 'mt-10 grid gap-5 text-[14.5px] text-[#3f3d5c]') . '">'
        . '<div><dt class="' . $dt . '">Call</dt><dd class="mt-1"><a href="' . e($s['phoneHref']) . '" class="hover:underline">' . e($s['phone']) . '</a> · <a href="' . e($s['whatsapp']) . '" target="_blank" rel="noopener" class="hover:underline">WhatsApp</a></dd></div>'
        . '<div><dt class="' . $dt . '">Write</dt><dd class="mt-1"><a href="mailto:' . e($s['email']) . '" class="hover:underline">' . e($s['email']) . '</a></dd></div>'
        . '<div><dt class="' . $dt . '">Visit</dt><dd class="mt-1">' . e($s['address']['line1'] . ', ' . $s['address']['line2'] . ', ' . $s['address']['city'] . ' ' . $s['address']['pin']) . '<br>' . e(implode(' · ', $s['hours'])) . '</dd></div>'
        . '</dl></div>'
        . enquiry_form($o['paths'] ?? ['pms', 'mf', 'clcb'], $o['defaultPath'] ?? null, $light)
        . '</div>';
    return section(['tone' => $tone, 'id' => 'contact'], $body);
}

const REGULATORY_LINKS = [['Regulatory information', '/regulatory'], ['Disclosure document', '/regulatory/disclosure-document'], ['Investor charter', '/regulatory/investor-charter'], ['Grievance redressal', '/regulatory/grievance'], ['Complaints data', '/regulatory/complaints-data'], ['Privacy', '/regulatory/privacy'], ['Disclaimer', '/regulatory/disclaimer'], ['Accessibility', '/regulatory/accessibility']];

/** Regulatory page frame: hero, side navigation, prose body. $body is HTML. */
function legal_page(string $title, string $path, ?string $lede, ?string $updated, mixed $body): string
{
    $crumbs = $path === '/regulatory' ? [['name' => 'Regulatory', 'path' => $path]] : [['name' => 'Regulatory', 'path' => '/regulatory'], ['name' => $title, 'path' => $path]];
    $nav = '<nav aria-label="Regulatory pages" class="self-start lg:sticky lg:top-28"><ul class="grid gap-1 text-[14px]">';
    foreach (REGULATORY_LINKS as [$l, $h]) {
        $nav .= '<li><a href="' . $h . '"' . ($h === $path ? ' aria-current="page" class="block rounded-lg bg-paper px-3 py-2 font-medium text-indigo"' : ' class="block rounded-lg px-3 py-2 text-[#3f3d5c] hover:bg-paper"') . '>' . e($l) . '</a></li>';
    }
    $nav .= '</ul></nav>';
    return page_hero(['compact' => true, 'crumbs' => $crumbs, 'eyebrow' => 'Regulatory', 'title' => e($title), 'lede' => $lede !== null ? e($lede) : null])
        . section([], '<div class="grid gap-12 lg:grid-cols-[240px_1fr]">' . $nav . '<div class="prose-dv min-w-0 max-w-[76ch]">' . capture($body)
            . ($updated ? '<p class="!mt-12 text-[13px] text-mist">Last updated: ' . e($updated) . '</p>' : '') . '</div></div>');
}

/** Mutual fund category pages (equity, debt, hybrid…). */
function mf_category_page(array $c): string
{
    $others = array_filter(mf_categories(), fn($o) => $o['slug'] !== $c['slug']);
    $actions = button('Build a plan with us', ['href' => '/contact']) . (!empty($c['calc']) ? button(e($c['calc']['label']), ['href' => $c['calc']['href'], 'variant' => 'ghost']) : '');
    $out = page_hero(['crumbs' => [['name' => 'Mutual Funds', 'path' => '/mutual-funds'], ['name' => $c['name'], 'path' => '/mutual-funds/' . $c['slug']]], 'eyebrow' => $c['name'], 'title' => e($c['title']), 'lede' => e($c['lede']), 'actions' => $actions]);
    $out .= '<section class="border-b border-line bg-paper"><div class="mx-auto grid max-w-[1180px] gap-px px-4 sm:grid-cols-3 sm:px-6 lg:px-8">';
    foreach ([['Typical horizon', $c['horizon']], ['Risk', $c['risk']], ['Suits', $c['suits']]] as [$k, $v]) {
        $out .= '<div class="py-6 sm:px-6 sm:first:pl-0"><p class="eyebrow">' . e($k) . '</p><p class="mt-2 text-[15px] text-ink">' . e($v) . '</p></div>';
    }
    $out .= '</div></section>';
    $types = '';
    foreach ($c['types'] as $t) $types .= '<div class="border-t border-line pt-5"><h3 class="text-[1.45rem]">' . e($t['name']) . '</h3><p class="mt-2 text-[15.5px] text-[#3f3d5c]">' . e($t['text']) . '</p></div>';
    $out .= section([], section_head(['eyebrow' => 'Types', 'title' => 'What sits <em>inside</em> this category.']) . '<div class="grid gap-x-10 gap-y-8 md:grid-cols-2">' . $types . '</div>');
    $consider = '';
    foreach ($c['consider'] as $x) $consider .= '<li class="flex gap-3 text-[1.02rem]"><span class="text-raspberry">—</span>' . e($x) . '</li>';
    $out .= section(['tone' => 'paper'], '<div class="grid gap-12 lg:grid-cols-2"><div><p class="eyebrow mb-3">Before you invest</p><h2 class="text-[2.2rem]">What to <em>keep in mind.</em></h2><ul class="mt-6 grid gap-3">' . $consider . '</ul></div>'
        . '<div><p class="eyebrow mb-3">Tax</p><h2 class="text-[2.2rem]">How gains are <em>taxed.</em></h2><p class="mt-6 text-[1.02rem] text-[#3f3d5c]">' . e($c['tax']) . '</p><p class="mt-3 text-[13px] text-mist">Tax rules change. Please consult your tax adviser for your situation.</p></div></div>');
    if (!empty($c['faqs'])) $out .= section([], '<div class="mx-auto max-w-[860px]"><p class="eyebrow mb-3">Questions</p><h2 class="mb-8 text-[2.2rem]">Asked <em>often.</em></h2>' . faq_list($c['faqs']) . '</div>');
    $pills = '';
    foreach ($others as $o) $pills .= '<li><a href="/mutual-funds/' . e($o['slug']) . '" class="inline-block rounded-full border border-ink/15 bg-ivory px-4 py-2 text-[14px] hover:border-indigo hover:text-indigo">' . e($o['name']) . '</a></li>';
    $out .= section(['tone' => 'sand', 'tight' => true], '<p class="eyebrow mb-5">Other categories</p><ul class="flex flex-wrap gap-3">' . $pills . '</ul>');
    return $out . contact_band(['defaultPath' => 'mf', 'paths' => ['mf', 'pms']]) . disclaimer(disclaimers()['mutualFunds']);
}

/**
 * Insurance and bond detail pages.
 * @param array{parent:array,slug:string,eyebrow:string,title:string,lede:string,items:array,itemsTitle:string,side:array,siblings:array,path:string} $p  itemsTitle and side.title are HTML
 */
function protect_page(array $p): string
{
    $out = page_hero(['crumbs' => [$p['parent'], ['name' => $p['title'], 'path' => $p['parent']['path'] . '/' . $p['slug']]], 'eyebrow' => $p['eyebrow'], 'title' => e($p['title']), 'lede' => e($p['lede']),
        'actions' => button('Ask us about ' . e(strtolower($p['title'])), ['href' => '#contact'])]);
    $items = '';
    foreach ($p['items'] as [$t, $b]) $items .= '<div class="border-t border-line pt-5"><h3 class="text-[1.4rem]">' . e($t) . '</h3><p class="mt-2 text-[15px] text-[#3f3d5c]">' . e($b) . '</p></div>';
    $out .= section([], section_head(['eyebrow' => "What's covered", 'title' => $p['itemsTitle']]) . '<div class="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">' . $items . '</div><p class="mt-10 text-[13.5px] text-mist">Products, issuers and terms available to you are confirmed in your first conversation.</p>');
    $list = '';
    foreach ($p['side']['list'] as $x) $list .= '<li class="flex gap-3 text-[1.02rem]"><span class="text-raspberry">—</span>' . e($x) . '</li>';
    $out .= section(['tone' => 'paper'], '<div class="grid gap-12 lg:grid-cols-[1fr_1.4fr]"><h2 class="text-[2.2rem]">' . $p['side']['title'] . '</h2><ul class="grid gap-4">' . $list . '</ul></div>');
    $sib = '';
    foreach ($p['siblings'] as $s) $sib .= '<li><a href="' . e($s['path']) . '" class="inline-block rounded-full border border-ink/15 bg-ivory px-4 py-2 text-[14px] hover:border-indigo hover:text-indigo">' . e($s['name']) . '</a></li>';
    $out .= section(['tone' => 'sand', 'tight' => true], '<p class="eyebrow mb-5">Also in ' . e($p['parent']['name']) . '</p><ul class="flex flex-wrap gap-3">' . $sib . '</ul>');
    return $out . contact_band(['defaultPath' => $p['path'], 'paths' => [$p['path'], 'mf', 'pms']]) . disclaimer(disclaimers()['insuranceBonds']);
}
