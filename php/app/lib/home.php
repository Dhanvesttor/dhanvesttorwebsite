<?php
/** Home page pieces ported from src/components/home: the hero, "What we do" panels and the FAITH letters. */

function home_hero(): string
{
    $p = photos()['hero'];
    $rise = fn(float $d) => ' class="rise" style="--rise-delay:' . $d . 's"';
    return '<section class="relative grid min-h-[calc(100svh-84px)] overflow-hidden border-b border-line lg:grid-cols-[1.05fr_.95fr]">'
        . '<div class="relative z-10 flex flex-col justify-center gap-7 px-4 pb-14 pt-12 sm:px-8 lg:py-20 lg:pl-[max(2rem,calc((100vw-1180px)/2+2rem))] lg:pr-14">'
        . '<div' . $rise(0) . '>' . hairline() . '</div>'
        . '<h1 class="rise max-w-[13ch] text-[3.1rem] leading-[0.98] sm:text-[4.25rem] lg:text-[5rem]" style="--rise-delay:.05s">Wealth you <em>understand.</em><br>Wealth you own.</h1>'
        . '<p class="rise max-w-[44ch] text-[1.125rem] text-[#3f3d5c] sm:text-[1.25rem]" style="--rise-delay:.18s">A SEBI-registered portfolio manager that explains before it invests. Personal portfolios, curated mutual funds and a community that teaches the language of money.</p>'
        . '<div class="rise flex flex-wrap gap-3" style="--rise-delay:.3s">' . button('Start a conversation', ['href' => '/contact', 'size' => 'lg']) . button('Explore the FAITH strategy', ['href' => '/pms/faith-fund', 'variant' => 'ghost', 'size' => 'lg']) . '</div>'
        . '<p class="rise mt-4 text-[11px] uppercase tracking-[.16em] text-mist" style="--rise-delay:.42s">SEBI Registered Portfolio Manager · ' . e(site()['sebiReg']) . ' · Kolkata</p>'
        . '</div>'
        . '<div class="relative min-h-[420px] overflow-hidden bg-sand lg:min-h-0">'
        . '<div data-parallax class="absolute inset-0 -bottom-[12%]">' . fill_img($p['src'], $p['alt'], '(min-width:1024px) 48vw, 100vw', true, 'object-cover object-[60%_30%]') . '</div>'
        . '<div aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,247,240,.55),transparent_35%)] max-lg:bg-[linear-gradient(180deg,rgba(251,247,240,.4),transparent_30%)]"></div>'
        . '<div aria-hidden="true" class="absolute bottom-0 left-0 h-24 w-24 rounded-tr-[48px] bg-ivory max-lg:hidden"></div>'
        . '</div></section>';
}

const WHAT_WE_DO = [
    ['key' => 'pms', 'title' => 'Portfolio Management', 'short' => 'PMS', 'href' => '/pms', 'meta' => 'From ₹50 lakh', 'body' => 'A focused portfolio of 15 to 30 companies, held in your own name and run by a named fund manager under our FAITH framework. Monthly statements show every holding.', 'links' => [['The FAITH Fund', '/pms/faith-fund'], ['Fees', '/pms/fees'], ['PMS vs mutual funds', '/pms/pms-vs-mutual-funds']]],
    ['key' => 'mf', 'title' => 'Mutual Funds', 'short' => 'MF', 'href' => '/mutual-funds', 'meta' => 'From ₹5,000 a month', 'body' => 'Twenty partner fund houses, one curated shortlist. We build a goal-based plan, set up your SIPs and keep you invested through the cycles that tempt everyone to stop.', 'links' => [['How we select', '/mutual-funds/how-we-select'], ['Partner fund houses', '/mutual-funds/partners'], ['SIP calculator', '/calculators/sip']]],
    ['key' => 'clcb', 'title' => 'Co-Learning & Community', 'short' => 'CLCB', 'href' => '/clcb', 'meta' => 'Free, always', 'body' => 'Workshops, learning circles and masterclasses where no question is too basic. CLCB is where many of our clients started, and where many who never invest with us still learn.', 'links' => [['Upcoming sessions', '/clcb/events'], ['Programmes', '/clcb/programmes'], ['Join', '/clcb/join']]],
    ['key' => 'ins', 'title' => 'Insurance', 'short' => 'Protect', 'href' => '/insurance', 'meta' => 'Health, property, business', 'body' => 'Cover that matches your life, compared across insurers and explained in plain words, with someone beside you if you ever need to claim.', 'links' => [['Health', '/insurance/health'], ['Property & motor', '/insurance/property-motor'], ['Business & group', '/insurance/business']]],
    ['key' => 'bonds', 'title' => 'Bonds & Fixed Income', 'short' => 'Income', 'href' => '/bonds', 'meta' => 'Predictable income', 'body' => 'Government and corporate bonds, NCDs and rated corporate deposits for the part of your money that needs to arrive on a known date.', 'links' => [['Bonds & NCDs', '/bonds/bonds-ncds'], ['Corporate FDs', '/bonds/corporate-fds'], ['Structured products', '/bonds/structured-products']]],
];

/** An element whose classes switch between data-on and data-off when its panel/tab becomes active (site.js). */
function toggled(string $tag, string $always, string $on, string $off, bool $active, string $inner, string $attrs = ''): string
{
    return "<$tag class=\"" . cn($always, $active ? $on : $off) . '" data-on="' . $on . '" data-off="' . $off . '"' . $attrs . '>' . $inner . "</$tag>";
}

/** Five quiet panels. On desktop the hovered one widens; on mobile they stack as cards. */
function what_we_do(): string
{
    $desk = '<div class="hidden h-[460px] gap-3 lg:flex" data-wwd>';
    foreach (WHAT_WE_DO as $i => $it) {
        $on = $i === 0;
        $links = '';
        foreach ($it['links'] as [$l, $h]) $links .= '<li><a href="' . $h . '" class="underline decoration-ivory/30 underline-offset-4 hover:decoration-ivory">' . e($l) . '</a></li>';
        $detail = '<div data-wwd-detail' . ($on ? '' : ' hidden') . '><p class="mt-2 text-[12px] uppercase tracking-[.16em] text-marigold">' . e($it['meta']) . '</p>'
            . '<p class="mt-4 max-w-[44ch] text-[15px] text-ivory/85">' . e($it['body']) . '</p>'
            . '<ul class="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px]">' . $links . '</ul>'
            . '<a href="' . $it['href'] . '" class="mt-7 inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-[13px] font-medium text-indigo">Explore ' . e($it['short']) . ' →</a></div>';
        $inner = '<div class="flex items-start justify-between gap-4">'
            . toggled('span', 'font-display text-[1.1rem]', 'text-marigold', 'text-raspberry', $on, pad2($i + 1))
            . toggled('span', 'text-[11px] uppercase tracking-[.16em]', 'text-ivory/60', 'text-mist', $on, e($it['short']))
            . '</div><div>'
            . toggled('h3', 'text-[1.6rem] leading-tight', '', '[writing-mode:vertical-rl] rotate-180 self-start text-[1.35rem]', $on, e($it['title']))
            . $detail . '</div>';
        $desk .= toggled('div', 'wwd-panel relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border p-7', 'border-indigo bg-indigo text-ivory', 'border-line bg-white text-ink', $on, $inner,
            ' data-wwd-panel tabindex="-1"' . ($on ? ' data-active' : ''));
    }
    $desk .= '</div>';

    $mobile = '<ul class="grid gap-3 lg:hidden">';
    foreach (WHAT_WE_DO as $i => $it) {
        $mobile .= '<li class="rounded-2xl border border-line bg-white p-6"><div class="flex items-baseline justify-between gap-4"><span class="font-display text-raspberry">' . pad2($i + 1) . '</span><span class="text-[11px] uppercase tracking-[.16em] text-mist">' . e($it['meta']) . '</span></div>'
            . '<h3 class="mt-3 text-[1.6rem]">' . e($it['title']) . '</h3><p class="mt-3 text-[15px] text-[#3f3d5c]">' . e($it['body']) . '</p>'
            . '<a href="' . $it['href'] . '" class="mt-4 inline-block text-[14px] font-medium text-raspberry underline underline-offset-4">Explore ' . e($it['short']) . ' →</a></li>';
    }
    return $desk . $mobile . '</ul>';
}

/** The five FAITH letters as large serif type; hover, focus or tap reveals each principle. */
function faith_letters(bool $light = true): string
{
    $faith = content('pms')['pms']['faith'];
    $on = $light ? 'text-marigold' : 'text-raspberry';
    $off = $light ? 'text-ivory/25 hover:text-ivory/60' : 'text-indigo/20 hover:text-indigo/50';
    $letters = '';
    $panels = '';
    foreach ($faith as $k => $f) {
        $letters .= toggled('button', 'font-display text-[4.25rem] min-[360px]:text-[5rem] font-light leading-none transition-colors duration-300 sm:text-[8rem] lg:text-[10rem]', $on, $off, $k === 0, e($f['letter']),
            ' type="button" role="tab" aria-selected="' . ($k === 0 ? 'true' : 'false') . '" aria-controls="faith-p' . $k . '" id="faith-t' . $k . '"');
        $panels .= '<div role="tabpanel" id="faith-p' . $k . '" aria-labelledby="faith-t' . $k . '" data-faith-panel' . ($k ? ' hidden' : '') . '>'
            . '<p class="' . cn('eyebrow', $light ? 'text-marigold' : '') . '">' . e($f['letter']) . ' · ' . ($k + 1) . ' of 5</p>'
            . '<h3 class="mt-3 text-[2rem]">' . e($f['title']) . '</h3>'
            . '<p class="' . cn('mt-3 text-[1.0625rem]', $light ? 'text-ivory/80' : 'text-[#3f3d5c]') . '">' . e($f['text']) . '</p></div>';
    }
    return '<div class="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end" data-faith><div role="tablist" aria-label="FAITH principles" class="flex justify-between gap-2">' . $letters . '</div><div>' . $panels . '</div></div>';
}
