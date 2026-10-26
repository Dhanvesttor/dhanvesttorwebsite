<?php
/**
 * UI building blocks, ported from src/components/ui. Each returns HTML with the same classes as the
 * React version. "Children" may be a string of HTML or a closure that echoes HTML.
 * Text from content or the CMS must be passed through e() before it reaches a component.
 */

function container(mixed $children, string $class = '', bool $wide = false): string
{
    return '<div class="' . cn('mx-auto w-full px-4 sm:px-6 lg:px-8', $wide ? 'max-w-[1400px]' : 'max-w-[1180px]', $class) . '">' . capture($children) . '</div>';
}

const TONES = [
    'ivory' => 'bg-ivory text-ink',
    'paper' => 'bg-paper text-ink',
    'sand' => 'bg-sand text-ink',
    'indigo' => 'bg-indigo text-ivory',
    'ink' => 'bg-ink text-ivory',
    'terracotta' => 'bg-terracotta text-ivory',
];

/** @param array{tone?:string,class?:string,id?:string,wide?:bool,tight?:bool,as?:string} $o */
function section(array $o, mixed $children): string
{
    $tag = $o['as'] ?? 'section';
    $cls = cn(TONES[$o['tone'] ?? 'ivory'], !empty($o['tight']) ? 'py-12 sm:py-16' : 'py-20 sm:py-28', $o['class'] ?? '');
    return "<$tag" . (!empty($o['id']) ? ' id="' . e($o['id']) . '"' : '') . ' class="' . $cls . '">' . container($children, '', !empty($o['wide'])) . "</$tag>";
}

/** @param array{eyebrow?:string,title:string,lede?:string,align?:string,light?:bool,class?:string} $o  title/lede are HTML */
function section_head(array $o): string
{
    $light = !empty($o['light']);
    $eyebrow = !empty($o['eyebrow']) ? '<p class="' . cn('eyebrow mb-3', $light ? 'text-marigold' : '') . '">' . e($o['eyebrow']) . '</p>' : '';
    $h2 = '<h2 class="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem]">' . $o['title'] . '</h2>';
    $align = $o['align'] ?? 'left';
    if ($align === 'split') {
        $lede = !empty($o['lede']) ? '<div class="' . cn('text-[1.0625rem] sm:text-lg max-w-[56ch] self-end', $light ? 'text-ivory/80' : 'text-[#3f3d5c]') . '">' . $o['lede'] . '</div>' : '';
        return '<div class="' . cn('grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12 mb-12 sm:mb-16', $o['class'] ?? '') . '"><div>' . $eyebrow . $h2 . '</div>' . $lede . '</div>';
    }
    $lede = !empty($o['lede']) ? '<div class="' . cn('mt-5 text-[1.0625rem] sm:text-lg max-w-[56ch]', $align === 'center' ? 'mx-auto' : '', $light ? 'text-ivory/80' : 'text-[#3f3d5c]') . '">' . $o['lede'] . '</div>' : '';
    return '<div class="' . cn('mb-12 sm:mb-16', $align === 'center' ? 'text-center mx-auto max-w-[62ch]' : '', $o['class'] ?? '') . '">' . $eyebrow . $h2 . $lede . '</div>';
}

const BUTTON_VARIANTS = [
    'primary' => 'bg-indigo text-ivory shadow-[0_12px_28px_-12px_rgba(46,42,110,.6)] hover:bg-indigo-deep',
    'raspberry' => 'bg-raspberry text-ivory hover:bg-raspberry-deep',
    'ghost' => 'border border-line text-ink hover:border-ink/40 bg-transparent',
    'light' => 'border border-ivory/40 text-ivory hover:bg-ivory/10 bg-transparent',
    'link' => 'text-raspberry underline underline-offset-4 px-0 py-0 hover:text-raspberry-deep',
];

/** @param array{href?:string,variant?:string,size?:string,class?:string,external?:bool,attrs?:string} $o  $label is HTML */
function button(string $label, array $o = []): string
{
    $variant = $o['variant'] ?? 'primary';
    $size = $o['size'] ?? 'md';
    $cls = cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 focus-visible:-translate-y-0.5',
        $variant !== 'link' ? ($size === 'sm' ? 'px-4 py-2 text-[13px]' : ($size === 'lg' ? 'px-7 py-4 text-[15px]' : 'px-6 py-3.5 text-sm')) : '',
        BUTTON_VARIANTS[$variant], $o['class'] ?? '',
    );
    $attrs = isset($o['attrs']) ? ' ' . $o['attrs'] : '';
    if (isset($o['href'])) {
        if (!empty($o['external'])) return '<a href="' . e($o['href']) . '" target="_blank" rel="noopener" class="' . $cls . '"' . $attrs . '>' . $label . '<span aria-hidden="true">↗</span></a>';
        return '<a href="' . e($o['href']) . '" class="' . $cls . '"' . $attrs . '>' . $label . '</a>';
    }
    return '<button class="' . $cls . '"' . $attrs . '>' . $label . '</button>';
}

function card(mixed $children, array $o = []): string
{
    $t = ['white' => 'bg-white border border-line', 'sand' => 'bg-sand/60 border border-line', 'indigo' => 'bg-indigo text-ivory', 'transparent' => 'border border-line'][$o['tone'] ?? 'white'];
    $href = $o['href'] ?? null;
    $cls = cn('rounded-2xl p-6 sm:p-7 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)]', $t, $href ? 'hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]' : '', $o['class'] ?? '');
    if ($href) return '<a href="' . e($href) . '" class="' . cn($cls, 'block') . '">' . capture($children) . '</a>';
    return '<div class="' . $cls . '">' . capture($children) . '</div>';
}

function hairline(string $class = ''): string { return '<div aria-hidden="true" class="' . cn('hairline', $class) . '"></div>'; }

function eyebrow(string $text, string $class = '', bool $light = false): string
{
    return '<p class="' . cn('eyebrow', $light ? 'text-marigold' : '', $class) . '">' . $text . '</p>';
}

/** @param array<array{title:string,body:string}> $items  title is text, body is HTML */
function accordion(array $items, string $class = ''): string
{
    $out = '<div class="' . cn('divide-y divide-line border-y border-line', $class) . '">';
    foreach ($items as $it) {
        $out .= '<details class="group py-5"><summary class="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.35rem] leading-snug text-ink [&::-webkit-details-marker]:hidden">'
            . '<span>' . e($it['title']) . '</span>'
            . '<span aria-hidden="true" class="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-raspberry transition-transform duration-300 group-open:rotate-45">+</span>'
            . '</summary><div class="mt-3 max-w-[68ch] text-[1rem] text-[#3f3d5c]">' . $it['body'] . '</div></details>';
    }
    return $out . '</div>';
}

/** @param array<array{name:string,path:string}> $crumbs */
function breadcrumbs(array $crumbs, bool $light = false, string $class = ''): string
{
    $all = array_merge([['name' => 'Home', 'path' => '/']], $crumbs);
    $last = count($all) - 1;
    $out = '<nav aria-label="Breadcrumb" class="' . cn('text-[12px] tracking-wide', $light ? 'text-ivory/60' : 'text-mist', $class) . '">' . json_ld(breadcrumb_json_ld($all)) . '<ol class="flex flex-wrap items-center gap-2">';
    foreach ($all as $i => $c) {
        $out .= '<li class="flex items-center gap-2">' . ($i < $last ? '<a href="' . e($c['path']) . '" class="hover:text-raspberry">' . e($c['name']) . '</a><span aria-hidden="true">/</span>' : '<span aria-current="page">' . e($c['name']) . '</span>') . '</li>';
    }
    return $out . '</ol></nav>';
}

/** srcset for Unsplash images (resized by Unsplash's CDN); other images are used as-is. */
function img_srcset(string $src): ?string
{
    if (!str_starts_with($src, 'https://images.unsplash.com/')) return null;
    $set = [];
    foreach ([480, 768, 1080, 1400, 1920] as $w) $set[] = preg_replace('/([?&])w=\d+/', '${1}w=' . $w, $src) . " {$w}w";
    return implode(', ', $set);
}

/** An <img> that fills its positioned parent, like next/image with `fill`. */
function fill_img(string $src, string $alt, string $sizes, bool $priority = false, string $class = 'object-cover', string $style = ''): string
{
    $srcset = img_srcset($src);
    return '<img src="' . e($src) . '"' . ($srcset ? ' srcset="' . e($srcset) . '" sizes="' . e($sizes) . '"' : '') . ' alt="' . e($alt) . '"'
        . ($priority ? ' fetchpriority="high"' : ' loading="lazy"') . ' decoding="async" class="' . cn('absolute inset-0 h-full w-full', $class) . '"' . ($style ? ' style="' . $style . '"' : '') . '>';
}

const RATIOS = ['4/5' => 'aspect-[4/5]', '3/4' => 'aspect-[3/4]', '1/1' => 'aspect-square', '16/9' => 'aspect-video', '3/2' => 'aspect-[3/2]', '21/9' => 'aspect-[21/9]'];

/**
 * A sand matte with the one-rounded-corner motif. With `src` it shows the image; without, the label
 * describes the photograph that will go there.
 * @param array{label:string,ratio?:string,class?:string,src?:?string,alt?:string,priority?:bool,sizes?:string} $o
 */
function image_placeholder(array $o): string
{
    $out = '<div class="' . cn('matte relative bg-sand', RATIOS[$o['ratio'] ?? '4/5'], $o['class'] ?? '') . '">';
    if (!empty($o['src'])) {
        $out .= fill_img($o['src'], $o['alt'] ?? '', $o['sizes'] ?? '(min-width: 1024px) 50vw, 100vw', !empty($o['priority']));
    } else {
        $out .= '<div aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(160deg,#EFE3CF,#D9C7AB)]"><div class="absolute right-4 top-4 h-10 w-10 rounded-[4px_20px_4px_4px] bg-marigold/70"></div>'
            . '<div class="absolute left-4 bottom-4 right-4 rounded-md bg-ink/60 px-3 py-2 text-[11px] uppercase tracking-[.12em] text-ivory backdrop-blur-sm">Photo · ' . e($o['label']) . '</div></div>';
    }
    return $out . '</div>';
}

function prose(string $html, string $class = ''): string { return '<div class="' . cn('prose-dv', $class) . '">' . $html . '</div>'; }

/** Fades and lifts its content into place when scrolled into view (see site.js). */
function reveal(mixed $children, array $o = []): string
{
    $tag = $o['as'] ?? 'div';
    $style = [];
    if (!empty($o['delay'])) $style[] = '--reveal-delay:' . $o['delay'] . 's';
    if (isset($o['y'])) $style[] = '--reveal-y:' . $o['y'] . 'px';
    return "<$tag data-reveal" . ($o['class'] ?? '' ? ' class="' . $o['class'] . '"' : '') . ($style ? ' style="' . implode(';', $style) . '"' : '') . '>' . capture($children) . "</$tag>";
}

/** Big number with a label. Purely numeric values count up once in view (site.js). */
function stat_item(string $value, string $label, ?string $flag = null, bool $light = false, string $class = ''): string
{
    $numeric = (bool) preg_match('/^\d+(\.\d+)?$/', $value);
    return '<div class="' . cn('flex flex-col gap-2', $class) . '">'
        . '<div class="' . cn('font-display font-light text-[2.5rem] sm:text-[3rem] leading-none', $light ? 'text-ivory' : 'text-indigo') . '"' . ($numeric ? ' data-count="' . e($value) . '"' : '') . '>' . e($value) . '</div>'
        . '<div class="' . cn('text-[13.5px] leading-snug', $light ? 'text-ivory/70' : 'text-mist') . '">' . e($label) . ($flag ? '<span class="ml-1.5 text-raspberry text-[11px] font-medium">' . e($flag) . '</span>' : '') . '</div></div>';
}

/** @param string[] $head HTML  @param string[][] $rows HTML */
function table_ui(array $head, array $rows, string $class = '', ?string $caption = null): string
{
    $out = '<div class="' . cn('overflow-x-auto rounded-2xl border border-line bg-white', $class) . '"><table class="w-full text-[15px]">';
    if ($caption) $out .= '<caption class="px-5 py-3 text-left text-[12px] uppercase tracking-[.16em] text-mist">' . e($caption) . '</caption>';
    $out .= '<thead><tr class="border-b border-line bg-paper/70 text-left text-[12px] uppercase tracking-[.14em] text-mist">';
    foreach ($head as $h) $out .= '<th class="px-5 py-3 font-medium">' . $h . '</th>';
    $out .= '</tr></thead><tbody>';
    foreach ($rows as $r) {
        $out .= '<tr class="border-b border-line last:border-0">';
        foreach (array_values($r) as $j => $c) $out .= '<td class="' . cn('px-5 py-3.5 align-top', $j === 0 ? 'font-medium text-ink' : '') . '">' . $c . '</td>';
        $out .= '</tr>';
    }
    return $out . '</tbody></table></div>';
}

/** @param array<array{label:string,content:string}> $tabs  content is HTML */
function tabs(array $tabs, string $class = ''): string
{
    static $n = 0;
    $id = 'tabs' . (++$n);
    $out = '<div data-tabs' . ($class ? ' class="' . $class . '"' : '') . '><div role="tablist" class="flex flex-wrap gap-2 border-b border-line">';
    foreach ($tabs as $k => $t) {
        $on = $k === 0;
        $out .= '<button type="button" role="tab" id="' . $id . '-t' . $k . '" aria-selected="' . ($on ? 'true' : 'false') . '" aria-controls="' . $id . '-p' . $k . '"'
            . ' class="' . cn('-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors', $on ? 'border-raspberry text-ink' : 'border-transparent text-mist hover:text-ink') . '"'
            . ' data-on="border-raspberry text-ink" data-off="border-transparent text-mist hover:text-ink">' . e($t['label']) . '</button>';
    }
    $out .= '</div>';
    foreach ($tabs as $k => $t) $out .= '<div role="tabpanel" id="' . $id . '-p' . $k . '" aria-labelledby="' . $id . '-t' . $k . '"' . ($k ? ' hidden' : '') . ' class="pt-8">' . $t['content'] . '</div>';
    return $out . '</div>';
}

/** @param array{eyebrow?:string,title:string,lede?:string,primary:array,secondary?:array,tone?:string} $o  title is HTML */
function cta(array $o): string
{
    $tone = $o['tone'] ?? 'indigo';
    $light = $tone === 'indigo';
    $body = '<div class="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center"><div>' . hairline('mb-6')
        . '<p class="' . ($light ? 'eyebrow text-marigold mb-3' : 'eyebrow mb-3') . '">' . e($o['eyebrow'] ?? 'Next step') . '</p>'
        . '<h2 class="text-[2rem] sm:text-[2.5rem]">' . $o['title'] . '</h2>'
        . (!empty($o['lede']) ? '<p class="' . ($light ? 'mt-4 max-w-[52ch] text-ivory/80' : 'mt-4 max-w-[52ch] text-[#3f3d5c]') . '">' . e($o['lede']) . '</p>' : '')
        . '</div><div class="flex flex-wrap gap-3 md:justify-end">'
        . button(e($o['primary']['label']), ['href' => $o['primary']['href'], 'variant' => $light ? 'raspberry' : 'primary'])
        . (!empty($o['secondary']) ? button(e($o['secondary']['label']), ['href' => $o['secondary']['href'], 'variant' => $light ? 'light' : 'ghost']) : '')
        . '</div></div>';
    return section(['tone' => $tone, 'tight' => true], $body);
}
