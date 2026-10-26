<?php
/** Document shell, header (desktop mega menu + mobile drawer) and footer. Ported from src/components/layout. */

/**
 * @param array{title?:string,description?:string,path?:string,image?:string,type?:string,noIndex?:bool,
 *              publishedTime?:string,authors?:array,scripts?:array,preloadImage?:array} $meta
 */
function layout(array $meta, string $body): string
{
    $head = [
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        meta_tags($meta),
        '<meta name="theme-color" content="#FBF7F0">',
        '<link rel="icon" href="' . asset('/icon.png') . '" type="image/png" sizes="512x512">',
        '<link rel="apple-touch-icon" href="' . asset('/apple-icon.png') . '" sizes="180x180">',
        '<link rel="preload" href="/assets/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>',
        '<link rel="preload" href="/assets/fonts/hanken-latin.woff2" as="font" type="font/woff2" crossorigin>',
    ];
    if (!empty($meta['preloadImage'])) {
        $src = $meta['preloadImage']['src'];
        $head[] = '<link rel="preload" as="image" href="' . e($src) . '"' . (($set = img_srcset($src)) ? ' imagesrcset="' . e($set) . '" imagesizes="' . e($meta['preloadImage']['sizes']) . '"' : '') . ' fetchpriority="high">';
    }
    $head[] = '<link rel="stylesheet" href="' . asset('/assets/css/site.css') . '">';
    $head[] = '<script>document.documentElement.classList.add("js")</script>';
    $head[] = '<script defer src="' . asset('/assets/js/site.js') . '"></script>';
    if (in_array('calculators', $meta['scripts'] ?? [], true)) $head[] = '<script type="module" src="' . asset('/assets/js/calculators.js') . '"></script>';

    return "<!DOCTYPE html>\n<html lang=\"en-IN\" class=\"h-full antialiased\">\n<head>\n" . implode("\n", $head) . "\n</head>\n"
        . '<body class="min-h-full flex flex-col">' . json_ld(organization_json_ld()) . site_header()
        . '<main id="main" class="flex-1">' . $body . '</main>' . site_footer() . "</body>\n</html>\n";
}

/** Brand image: optimised WebP at 1x/2x/3x of its displayed size (see php/dev/optimize-images.mjs). */
function brand_img(string $name, string $alt, string $class, bool $eager = false): string
{
    $sizes = ['logo' => [[120, 240, 360], 1600, 873], 'mark' => [[36, 72, 108], 512, 470], 'wordmark' => [[180, 360, 540], 1600, 150]][$name];
    [$w, $W, $H] = $sizes;
    return '<img src="/brand/' . $name . '-' . $w[1] . '.webp" srcset="/brand/' . $name . '-' . $w[0] . '.webp 1x, /brand/' . $name . '-' . $w[1] . '.webp 2x, /brand/' . $name . '-' . $w[2] . '.webp 3x"'
        . ' alt="' . e($alt) . '" width="' . $W . '" height="' . $H . '"' . ($eager ? '' : ' loading="lazy"') . ' decoding="async" class="' . $class . '">';
}

/** Full lockup on desktop, mark + wordmark on small screens. Logo files are the client's originals. */
function logo(string $variant = 'full', bool $eager = false, string $class = ''): string
{
    $inner = match ($variant) {
        'full' => brand_img('logo', 'Dhanvesttor — Her Money, Her Growth', 'h-14 w-auto sm:h-16', $eager),
        'compact' => brand_img('mark', '', 'h-8 w-auto', $eager) . brand_img('wordmark', 'Dhanvesttor', 'h-[14px] w-auto', $eager),
        default => brand_img('mark', 'Dhanvesttor', 'h-9 w-auto', $eager),
    };
    return '<a href="/" aria-label="Dhanvesttor home" class="' . cn('inline-flex items-center gap-2.5', $class) . '">' . $inner . '</a>';
}

function nav_groups(): array { return content('nav')['nav']; }

function nav_item(array $g): string
{
    $path = current_path();
    $active = $path === $g['href'] || ($g['href'] !== '/' && str_starts_with($path, $g['href']));
    $has = !empty($g['children']);
    return '<li class="relative"' . ($has ? ' data-mega-trigger="' . e($g['label']) . '"' : '') . '>'
        . '<a href="' . e($g['href']) . '"' . ($has ? ' aria-expanded="false" aria-haspopup="true"' : '') . ($active ? ' aria-current="page"' : '')
        . ' class="' . cn('relative inline-flex items-center gap-1 py-2 text-[14px] font-medium text-ink/85 transition-colors hover:text-ink', $active ? 'text-ink' : '') . '">'
        . e($g['label']) . ($active ? '<span aria-hidden="true" class="absolute -bottom-0.5 left-0 h-[2px] w-5 rounded bg-raspberry"></span>' : '') . '</a></li>';
}

function site_header(): string
{
    $nav = nav_groups();
    $s = site();
    $left = array_slice($nav, 0, 4);
    $right = array_slice($nav, 4);

    $out = '<header data-header class="sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 border-transparent bg-ivory"'
        . ' data-top="border-transparent bg-ivory" data-scrolled="border-line bg-ivory/90 shadow-[0_10px_30px_-20px_rgba(29,27,58,.3)] backdrop-blur-md">'
        . '<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-indigo focus:px-4 focus:py-2 focus:text-ivory">Skip to content</a>'
        . '<div class="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">'
        . '<button type="button" data-menu-open aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false" class="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden">'
        . '<span class="block h-[1.5px] w-4 bg-ink"></span><span class="mt-1 block h-[1.5px] w-4 bg-ink"></span></button>'
        . '<ul class="hidden items-center gap-7 lg:flex">' . implode('', array_map('nav_item', $left)) . '</ul>'
        . '<div class="justify-self-center"><span class="lg:hidden">' . logo('compact', true) . '</span><span class="hidden lg:inline-flex">' . logo('full', true) . '</span></div>'
        . '<div class="flex items-center justify-end gap-7"><ul class="hidden items-center gap-7 lg:flex">' . implode('', array_map('nav_item', $right)) . '</ul>'
        . '<a href="' . e($s['loginUrl']) . '" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink/40 sm:px-4">'
        . '<span class="hidden sm:inline">Investor login</span><span class="sm:hidden">Login</span><span aria-hidden="true">↗</span></a></div></div>';

    // Mega menu panels (desktop). site.js shows one at a time on hover/focus.
    foreach ($nav as $g) {
        if (empty($g['children'])) continue;
        $first = $g['children'][0];
        $links = '';
        foreach (array_slice($g['children'], 1) as $c) {
            $links .= '<li><a href="' . e($c['href']) . '" class="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-paper"><span class="block text-[14px] font-medium text-ink group-hover:text-indigo">' . e($c['label']) . '</span><span class="block text-[12.5px] text-mist">' . e($c['blurb']) . '</span></a></li>';
        }
        $out .= '<div data-mega="' . e($g['label']) . '" hidden class="absolute inset-x-0 top-full hidden border-b border-line bg-ivory shadow-[0_30px_60px_-30px_rgba(29,27,58,.35)] lg:block">'
            . '<div class="mx-auto grid max-w-[1180px] grid-cols-[1fr_2.4fr] gap-10 px-8 py-9"><div>'
            . '<p class="eyebrow mb-3">' . e($g['label']) . '</p>'
            . '<a href="' . e($g['href']) . '" class="font-display text-[1.75rem] leading-tight text-ink hover:text-indigo">' . e($first['label']) . '</a>'
            . '<p class="mt-2 max-w-[30ch] text-[14px] text-mist">' . e($first['blurb']) . '</p>'
            . '<a href="' . e($g['href']) . '" class="mt-5 inline-block text-[13px] font-medium text-raspberry underline-offset-4 hover:underline">Overview →</a>'
            . '</div><ul class="grid grid-cols-2 gap-x-8 gap-y-1 xl:grid-cols-3">' . $links . '</ul></div></div>';
    }
    return $out . mobile_menu() . '</header>';
}

function mobile_menu(): string
{
    $s = site();
    $groups = '';
    foreach (nav_groups() as $g) {
        $groups .= '<div class="py-4"><a href="' . e($g['href']) . '" class="font-display text-[1.6rem] text-ink">' . e($g['label']) . '</a>';
        if (!empty($g['children'])) {
            $groups .= '<ul class="mt-2 grid gap-1.5 pl-1">';
            foreach (array_slice($g['children'], 1) as $c) $groups .= '<li><a href="' . e($c['href']) . '" class="block py-1 text-[15px] text-[#3f3d5c]">' . e($c['label']) . '</a></li>';
            $groups .= '</ul>';
        }
        $groups .= '</div>';
    }
    return '<div id="mobile-menu" data-mobile-menu hidden class="fixed inset-0 z-[70] lg:hidden">'
        . '<button type="button" data-menu-close aria-label="Close menu" tabindex="-1" class="absolute inset-0 bg-ink/40 backdrop-blur-sm"></button>'
        . '<aside role="dialog" aria-modal="true" aria-label="Site menu" class="absolute inset-y-0 left-0 flex w-[min(92vw,420px)] flex-col overflow-y-auto overscroll-contain bg-ivory px-6 pb-10 pt-5 shadow-2xl">'
        . '<div class="mb-6 flex items-center justify-between"><span class="eyebrow">Menu</span>'
        . '<button type="button" data-menu-close class="grid h-10 w-10 place-items-center rounded-full border border-line text-xl leading-none" aria-label="Close menu">×</button></div>'
        . '<nav class="divide-y divide-line">' . $groups . '</nav>'
        . '<div class="mt-8 grid gap-3">'
        . '<a href="' . e($s['loginUrl']) . '" target="_blank" rel="noopener" class="rounded-full bg-indigo px-5 py-3.5 text-center text-sm font-medium text-ivory">Investor login ↗</a>'
        . '<a href="' . e($s['pmsLoginUrl']) . '" target="_blank" rel="noopener" class="rounded-full border border-line px-5 py-3.5 text-center text-sm font-medium">PMS login (Kotak) ↗</a>'
        . '<a href="/contact" class="text-center text-sm text-raspberry underline underline-offset-4">Start a conversation</a>'
        . '</div></aside></div>';
}

function site_footer(): string
{
    $s = site();
    $cols = '';
    foreach (content('nav')['footerNav'] as $col) {
        $cols .= '<div><p class="eyebrow text-marigold mb-4">' . e($col['heading']) . '</p><ul class="grid gap-2.5">';
        foreach ($col['links'] as [$label, $href]) $cols .= '<li><a href="' . e($href) . '" class="text-[14px] text-ivory/80 transition-colors hover:text-ivory">' . e($label) . '</a></li>';
        $cols .= '</ul></div>';
    }
    $socials = '';
    foreach ($s['socials'] as $k => $v) $socials .= '<a href="' . e($v) . '" target="_blank" rel="noopener" class="capitalize hover:text-ivory">' . ($k === 'x' ? 'X' : e($k)) . '</a>';
    $d = disclaimers();

    $inner = '<div class="grid gap-12 lg:grid-cols-[1.3fr_2fr]"><div>'
        . brand_img('wordmark', 'Dhanvesttor', 'h-4 w-auto brightness-0 invert opacity-90')
        . '<p class="mt-6 font-display text-[1.75rem] font-light italic leading-tight text-terracotta">Her Money, Her Growth</p>'
        . '<p class="mt-5 max-w-[42ch] text-[14.5px] text-ivory/70">A SEBI-registered portfolio manager in Kolkata. Personal portfolios, curated mutual funds, and a community that teaches the language of money.</p>'
        . '<div class="mt-8"><p class="eyebrow text-marigold mb-3">Monthly letter</p>' . newsletter_form(true) . '</div></div>'
        . '<div class="grid grid-cols-2 gap-8 sm:grid-cols-4">' . $cols . '</div></div>'
        . '<div class="mt-14 grid gap-8 border-t border-ivory/10 pt-10 md:grid-cols-3">'
        . '<div class="text-[13.5px] text-ivory/70"><p class="font-medium text-ivory">' . e($s['legalName']) . ', operating as ' . e($s['name']) . '</p>'
        . '<p class="mt-2">' . e($s['address']['line1'] . ', ' . $s['address']['line2'] . ', ' . $s['address']['city'] . ' ' . $s['address']['pin']) . '</p>'
        . '<p class="mt-2"><a href="' . e($s['phoneHref']) . '" class="hover:text-ivory">' . e($s['phone']) . '</a> · <a href="mailto:' . e($s['email']) . '" class="hover:text-ivory">' . e($s['email']) . '</a></p>'
        . '<p class="mt-2">' . e(implode(' · ', $s['hours'])) . '</p></div>'
        . '<div class="text-[13.5px] text-ivory/70"><p class="font-medium text-ivory">Regulatory</p>'
        . '<p class="mt-2">SEBI Registered Portfolio Manager, Reg. No. ' . e($s['sebiReg']) . '. LLPIN ' . e($s['llpin']) . '.</p>'
        . '<p class="mt-2">Compliance Officer: Neha Verma · <a href="/regulatory/grievance" class="underline underline-offset-4 hover:text-ivory">Grievance redressal</a> · <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener" class="underline underline-offset-4 hover:text-ivory">SEBI SCORES</a> · <a href="https://smartodr.in" target="_blank" rel="noopener" class="underline underline-offset-4 hover:text-ivory">SMART ODR</a></p></div>'
        . '<div class="text-[13.5px] text-ivory/70"><p class="font-medium text-ivory">Logins</p>'
        . '<p class="mt-2"><a href="' . e($s['loginUrl']) . '" target="_blank" rel="noopener" class="underline underline-offset-4 hover:text-ivory">Investor login</a> · <a href="' . e($s['pmsLoginUrl']) . '" target="_blank" rel="noopener" class="underline underline-offset-4 hover:text-ivory">PMS login (Kotak)</a></p>'
        . '<p class="mt-4 flex gap-4">' . $socials . '</p></div></div>'
        . '<p class="mt-10 max-w-[120ch] text-[12px] leading-relaxed text-ivory/50">' . e($d['general'] . ' ' . $d['mutualFunds']) . '</p>'
        . '<p class="mt-6 text-[12px] text-ivory/50">© ' . date('Y') . ' ' . e($s['legalName']) . '. All rights reserved.</p>';
    return '<footer class="bg-ink text-ivory">' . container($inner, 'py-16 sm:py-20') . '</footer>';
}
