<?php
/**
 * Calculator markup. Inputs, defaults and result rows mirror src/components/calculators/calculators.tsx;
 * the maths and live updates are in public/assets/js/calc.js and calculators.js, keyed by data-calc / data-key.
 */

/** f(key, label, default, min, max, step, prefix, suffix, hint) */
function calc_field(string $key, string $label, float|int $value, float|int $min, float|int $max, float|int $step = 1, ?string $prefix = null, ?string $suffix = null, ?string $hint = null): array
{
    return compact('key', 'label', 'value', 'min', 'max', 'step', 'prefix', 'suffix', 'hint');
}

/** Rows: [key, label, swatch?]. A field group (array of fields under 'group') renders side by side. */
function calc_ui(string $slug): array
{
    $ret = fn($v = 12, $max = 20) => calc_field('r', 'Expected return (a year)', $v, 1, $max, 0.5, null, '%');
    return match ($slug) {
        'sip' => ['fields' => [calc_field('m', 'Monthly investment', 10000, 500, 200000, 500, '₹'), $ret(), calc_field('y', 'Time period', 10, 1, 40, 1, null, 'yrs')],
            'label' => 'Estimated value', 'rows' => [['invested', 'You invest', 'sand'], ['gain', 'Estimated gain', 'indigo'], ['value', 'Total value']], 'chart' => ['Invested', 'Value']],
        'step-up-sip' => ['fields' => [calc_field('m', 'Starting monthly investment', 10000, 500, 200000, 500, '₹'), calc_field('s', 'Increase every year', 10, 0, 30, 1, null, '%', 'Most people raise their SIP in line with their salary.'), $ret(), calc_field('y', 'Time period', 15, 1, 40, 1, null, 'yrs')],
            'label' => 'Estimated value', 'rows' => [['invested', 'You invest', 'sand'], ['gain', 'Estimated gain', 'indigo'], ['flat', 'Without the step-up'], ['extra', 'Extra from stepping up']], 'chart' => ['Invested', 'Value']],
        'lumpsum' => ['fields' => [calc_field('a', 'One-time investment', 500000, 5000, 50000000, 5000, '₹'), $ret(), calc_field('y', 'Time period', 10, 1, 40, 1, null, 'yrs')],
            'label' => 'Estimated value', 'rows' => [['invested', 'You invest', 'sand'], ['gain', 'Estimated gain', 'indigo']], 'chart' => ['Invested', 'Value']],
        'swp' => ['fields' => [calc_field('c', 'Corpus today', 10000000, 100000, 100000000, 100000, '₹'), calc_field('w', 'Monthly withdrawal', 60000, 1000, 1000000, 1000, '₹'), $ret(8, 15), calc_field('y', 'Withdraw for', 20, 1, 40, 1, null, 'yrs')],
            'label' => 'Left at the end', 'rows' => [['withdrawn', 'Total withdrawn', 'sand'], ['remaining', 'Corpus remaining', 'indigo'], ['outcome', 'Outcome']], 'chart' => ['Withdrawn so far', 'Corpus left']],
        'stp' => ['fields' => [calc_field('a', 'Amount parked in a debt fund', 1200000, 100000, 50000000, 50000, '₹'), calc_field('t', 'Monthly transfer to equity', 100000, 5000, 5000000, 5000, '₹'), calc_field('rs', 'Debt fund return', 6.5, 1, 10, 0.25, null, '%'), calc_field('rt', 'Equity fund return', 12, 1, 20, 0.5, null, '%'), calc_field('n', 'Transfer for', 12, 1, 60, 1, null, 'mths')],
            'label' => 'Total after the transfer period', 'rows' => [['target', 'In the equity fund', 'indigo'], ['source', 'Still in the debt fund', 'sand'], ['transferred', 'Transferred']], 'chart' => ['Debt fund', 'Equity fund']],
        'goal' => ['fields' => [calc_field('g', 'What the goal costs today', 5000000, 50000, 100000000, 50000, '₹'), calc_field('y', 'Years until you need it', 10, 1, 40, 1, null, 'yrs'), calc_field('i', 'Inflation', 6, 0, 12, 0.5, null, '%'), $ret(), calc_field('e', 'Already saved towards it', 0, 0, 50000000, 10000, '₹')],
            'label' => 'Monthly SIP needed', 'rows' => [['future', 'Goal cost in the future'], ['grow', 'Your savings will grow to'], ['once', 'Or invest once today']]],
        'retirement' => ['fields' => [['group' => 'sm:grid-cols-3', 'fields' => [calc_field('age', 'Age now', 35, 18, 70), calc_field('ra', 'Retire at', 60, 40, 75), calc_field('le', 'Plan until', 85, 70, 100)]],
            calc_field('exp', 'Monthly expenses today', 60000, 10000, 1000000, 5000, '₹'), calc_field('inf', 'Inflation', 6, 0, 12, 0.5, null, '%'), calc_field('pre', 'Return before retirement', 12, 1, 18, 0.5, null, '%'), calc_field('post', 'Return after retirement', 7, 1, 12, 0.5, null, '%'), calc_field('ex', 'Retirement savings so far', 0, 0, 100000000, 50000, '₹')],
            'label' => "Corpus you'll need", 'rows' => [['expRet', 'Monthly expenses at retirement'], ['yearsTo', 'Years to retirement'], ['yearsIn', 'Years in retirement'], ['grow', 'Savings will grow to'], ['sip', 'Monthly SIP needed']]],
        'child-education' => ['fields' => [['group' => 'sm:grid-cols-2', 'fields' => [calc_field('ca', "Child's age now", 5, 0, 17), calc_field('ga', 'Age at college', 18, 15, 25)]],
            calc_field('cost', 'Course cost today', 2500000, 100000, 30000000, 50000, '₹', null, "Indian undergraduate degrees range widely; overseas master's often exceed ₹50 lakh."),
            calc_field('inf', 'Education inflation', 9, 0, 15, 0.5, null, '%', 'Education costs have historically risen faster than general inflation.'), $ret(12, 18), calc_field('e', 'Already saved', 0, 0, 10000000, 10000, '₹')],
            'label' => 'Monthly SIP needed', 'rows' => [['years', 'Years to go'], ['future', 'Cost when she starts'], ['once', 'Or invest once today']]],
        'cagr' => ['fields' => [calc_field('s', 'Starting value', 100000, 1000, 100000000, 1000, '₹'), calc_field('e', 'Ending value', 250000, 1000, 100000000, 1000, '₹'), calc_field('y', 'Years held', 7, 1, 40, 0.5, null, 'yrs')],
            'label' => 'Compound annual growth rate', 'rows' => [['abs', 'Absolute return'], ['gain', 'Gain']], 'note' => 'CAGR smooths the path into a single yearly rate. It does not show the ups and downs in between.'],
        'inflation' => ['fields' => [calc_field('a', 'Amount today', 100000, 1000, 50000000, 1000, '₹'), calc_field('r', 'Inflation', 6, 1, 15, 0.5, null, '%'), calc_field('y', 'Years', 15, 1, 40, 1, null, 'yrs')],
            'label' => 'What ₹1.00 L of today costs in 15 years', 'rows' => [['cost', 'Future cost', 'indigo'], ['power', "Today's ₹1.00 L will buy", 'sand']], 'chart' => ['Purchasing power', 'Future cost'],
            'note' => 'A savings account paying less than inflation loses purchasing power every year, quietly.'],
        'pms-fee' => ['fields' => [calc_field('c', 'Investment', 5000000, 5000000, 500000000, 500000, '₹', null, 'The SEBI minimum for PMS is ₹50 lakh.'), calc_field('g', 'Gross portfolio return (a year)', 15, -20, 40, 1, null, '%', 'Before any fees. Try a low year and a high year.'), calc_field('y', 'Years', 5, 1, 15, 1, null, 'yrs')],
            'extra' => '<div class="rounded-xl bg-paper p-4 text-[13.5px] text-[#3f3d5c]"><p class="font-medium text-ink">Fee structure used</p><p class="mt-1">2% a year fixed, charged monthly · 20% of returns above a 10% hurdle, with a high-water mark · 0.1% operating expenses · 1.5% exit load in year one only.</p></div>',
            'label' => 'Value after fees', 'rows' => [['gross', 'Value before fees'], ['fees', 'Total fees'], ['eff', 'Fees as % a year (effective)']], 'chart' => ['After fees', 'Before fees'],
            'note' => 'Illustration only. Your actual fee depends on daily portfolio values, inflows and outflows, and the terms of your client agreement.'],
    };
}

/** Number box paired with a slider; calculators.js keeps them in sync. */
function range_field(string $calc, array $f): string
{
    $id = 'c-' . $calc . '-' . $f['key'];
    $pct = max(0, min(100, ($f['value'] - $f['min']) / ($f['max'] - $f['min']) * 100));
    $num = fn($v) => rtrim(rtrim(number_format((float) $v, 2, '.', ''), '0'), '.');
    return '<div data-range="' . $f['key'] . '"><div class="flex items-center justify-between gap-4"><label for="' . $id . '" class="text-[14px] font-medium text-ink">' . e($f['label']) . '</label>'
        . '<div class="flex shrink-0 items-center rounded-lg border border-line bg-white px-3 py-1.5 focus-within:ring-2 focus-within:ring-raspberry/50">'
        . ($f['prefix'] ? '<span class="mr-1 text-[14px] text-mist">' . e($f['prefix']) . '</span>' : '')
        . '<input id="' . $id . '" inputmode="decimal" autocomplete="off" value="' . $num($f['value']) . '" class="w-24 bg-transparent text-right text-[15px] font-medium text-indigo outline-none">'
        . ($f['suffix'] ? '<span class="ml-1 text-[14px] text-mist">' . e($f['suffix']) . '</span>' : '')
        . '</div></div>'
        . '<input type="range" aria-label="' . e($f['label']) . '" min="' . $num($f['min']) . '" max="' . $num($f['max']) . '" step="' . $num($f['step']) . '" value="' . $num($f['value']) . '"'
        . ' class="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-raspberry" style="background:linear-gradient(90deg,var(--color-raspberry) ' . round($pct, 2) . '%,var(--color-sand) ' . round($pct, 2) . '%)">'
        . ($f['hint'] ? '<p class="mt-1.5 text-[12px] text-mist">' . e($f['hint']) . '</p>' : '')
        . '</div>';
}

/** $res: the calculator's results for its default values (calc_results), so the card arrives filled in. */
function result_card(array $ui, array $res): string
{
    $sw = ['indigo' => 'bg-indigo', 'raspberry' => 'bg-raspberry', 'marigold' => 'bg-marigold', 'sand' => 'bg-sand'];
    $rows = '';
    foreach ($ui['rows'] as $r) {
        $rows .= '<div class="flex items-center justify-between gap-4"><dt class="flex items-center gap-2 text-ivory/75">' . (isset($r[2]) ? '<span class="h-2.5 w-2.5 shrink-0 rounded-sm ' . $sw[$r[2]] . '"></span>' : '')
            . '<span data-out-label="' . $r[0] . '">' . e($res['labels'][$r[0]] ?? $r[1]) . '</span></dt><dd class="text-right font-medium" data-out="' . $r[0] . '">' . e($res['rows'][$r[0]]) . '</dd></div>';
    }
    return '<div class="rounded-2xl bg-indigo p-7 text-ivory"><p class="eyebrow text-marigold" data-out-label="headline">' . e($res['labels']['headline'] ?? $ui['label']) . '</p>'
        . '<p aria-live="polite" class="mt-3 font-display text-[2.75rem] font-light leading-none sm:text-[3.25rem]" data-out="headline">' . e($res['headline']) . '</p>'
        . '<dl class="mt-7 grid gap-3 border-t border-ivory/15 pt-5 text-[14px]">' . $rows . '</dl>'
        . (!empty($ui['note']) ? '<p class="mt-5 text-[12px] leading-relaxed text-ivory/60">' . e($ui['note']) . '</p>' : '')
        . '</div>';
}

/** Two-series SVG area chart, drawn here for the default values; calculators.js redraws it live. */
function growth_chart(string $a, string $b, array $points, string $xPrefix = 'Yr '): string
{
    $c = chart_svg($points, $a, $b, $xPrefix);
    return '<figure class="rounded-2xl border border-line bg-white p-4 sm:p-5" data-chart>'
        . '<figcaption class="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] text-mist">'
        . '<span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-sm bg-sand ring-1 ring-terracotta/40"></span>' . e($a) . '</span>'
        . '<span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-sm bg-indigo"></span>' . e($b) . '</span>'
        . '<span class="ml-auto font-medium text-ink" data-chart-readout>' . e($c['readout']) . '</span></figcaption>'
        . '<svg viewBox="0 0 640 260" class="h-auto w-full touch-pan-y" role="img" aria-label="' . e($c['aria']) . '" data-chart-svg>' . $c['svg'] . '</svg></figure>';
}

function calculator(string $slug, bool $compact = false): string
{
    $ui = calc_ui($slug);
    $inputs = '';
    $values = [];
    foreach ($ui['fields'] as $f) {
        $group = isset($f['group']) ? $f['fields'] : [$f];
        foreach ($group as $x) $values[$x['key']] = $x['value'];
        $html = implode('', array_map(fn($x) => range_field($slug, $x), $group));
        $inputs .= isset($f['group']) ? '<div class="grid gap-8 ' . $f['group'] . '">' . $html . '</div>' : $html;
    }
    $inputs .= $ui['extra'] ?? '';
    $res = calc_results($slug, $values);
    if ($compact) {
        return '<div data-calc="' . $slug . '" class="grid gap-6 lg:grid-cols-2"><div class="grid content-start gap-7 rounded-2xl border border-line bg-white p-6">' . $inputs
            . '<a href="/calculators" class="text-[13px] font-medium text-raspberry underline underline-offset-4">Eleven more calculators →</a></div>' . result_card($ui, $res) . '</div>';
    }
    return '<div data-calc="' . $slug . '"><div class="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">'
        . '<div class="grid content-start gap-8 rounded-2xl border border-line bg-white p-6 sm:p-8">' . $inputs . '</div>'
        . '<div class="grid content-start gap-6">' . result_card($ui, $res) . (!empty($ui['chart']) ? growth_chart($ui['chart'][0], $ui['chart'][1], $res['points'], ($res['xPrefix'] ?? 'Yr') === 'M' ? 'M' : 'Yr ') : '') . '</div></div>'
        . '<p class="mt-6 max-w-[90ch] text-[12px] leading-relaxed text-mist">' . e(disclaimers()['calculators']) . '</p></div>';
}
