<?php
/**
 * Calculator maths in PHP, line for line the same as public/assets/js/calc.js (itself ported from src/lib/calc),
 * so calculator pages arrive with their default results already filled in. calculators.js recomputes live.
 * php/tests/calc-parity.mjs checks PHP and JS give identical numbers.
 */

/** Number to fixed decimals exactly like JavaScript's toFixed (round half up on the exact binary value). */
function js_fixed(float $x, int $d): string
{
    if (!is_finite($x)) return 'NaN';
    $neg = $x < 0;
    [$int, $frac] = explode('.', sprintf('%.40F', abs($x))) + [1 => ''];
    $digits = $int . substr(str_pad($frac, $d, '0'), 0, $d);
    if (($frac[$d] ?? '0') >= '5') {
        // add one to the last digit
        $i = strlen($digits) - 1;
        while ($i >= 0 && $digits[$i] === '9') { $digits[$i] = '0'; $i--; }
        $digits = $i < 0 ? '1' . $digits : substr_replace($digits, (string) ((int) $digits[$i] + 1), $i, 1);
    }
    $int = ltrim(substr($digits, 0, strlen($digits) - $d), '0') ?: '0';
    $out = $d ? $int . '.' . substr($digits, -$d) : $int;
    return ($neg && trim($out, '0.') !== '' ? '-' : '') . $out;
}

/** Indian digit grouping: 1234567 -> 12,34,567 */
function in_group(string $int): string
{
    if (strlen($int) <= 3) return $int;
    $last3 = substr($int, -3);
    $rest = substr($int, 0, -3);
    return preg_replace('/\B(?=(\d{2})+(?!\d))/', ',', $rest) . ',' . $last3;
}

function inr(float $n): string
{
    if (!is_finite($n)) $n = 0;
    return ($n < 0 ? '−' : '') . '₹' . in_group((string) round(abs($n)));
}

function inr_short(float $n): string
{
    if (!is_finite($n)) $n = 0;
    $a = abs($n);
    $sign = $n < 0 ? '−' : '';
    if ($a >= 1e7) return $sign . '₹' . js_fixed($a / 1e7, $a >= 1e9 ? 0 : 2) . ' Cr';
    if ($a >= 1e5) return $sign . '₹' . js_fixed($a / 1e5, 2) . ' L';
    if ($a >= 1e3) return $sign . '₹' . js_fixed($a / 1e3, 1) . ' K';
    return $sign . '₹' . round($a);
}

function pct_fmt(float $n, int $d = 1): string { return (is_finite($n) ? js_fixed($n, $d) : '0') . '%'; }

function safe_num(mixed $v): float { $n = is_numeric($v) ? (float) $v : 0.0; return is_finite($n) && $n > 0 ? $n : 0.0; }
function monthly_rate(float $annualPct): float { return (1 + $annualPct / 100) ** (1 / 12) - 1; }

function calc_sip(float $monthly, float $rate, float $years): array
{
    $m = safe_num($monthly); $r = safe_num($rate); $y = floor(safe_num($years));
    if (!$m || !$y) return ['invested' => 0, 'value' => 0, 'gain' => 0, 'series' => []];
    $i = monthly_rate($r); $value = 0; $invested = 0; $series = [];
    for ($month = 1; $month <= $y * 12; $month++) {
        $value = ($value + $m) * (1 + $i); $invested += $m;
        if ($month % 12 === 0) $series[] = ['x' => $month / 12, 'a' => $invested, 'b' => $value];
    }
    return ['invested' => $invested, 'value' => $value, 'gain' => $value - $invested, 'series' => $series];
}

function calc_step_up_sip(float $monthly, float $step, float $rate, float $years): array
{
    $m = safe_num($monthly); $s = safe_num($step); $r = safe_num($rate); $y = floor(safe_num($years));
    if (!$m || !$y) return ['invested' => 0, 'value' => 0, 'gain' => 0, 'series' => []];
    $i = monthly_rate($r); $value = 0; $invested = 0; $series = [];
    for ($month = 1; $month <= $y * 12; $month++) {
        $value = ($value + $m) * (1 + $i); $invested += $m;
        if ($month % 12 === 0) { $series[] = ['x' => $month / 12, 'a' => $invested, 'b' => $value]; $m = $m * (1 + $s / 100); }
    }
    return ['invested' => $invested, 'value' => $value, 'gain' => $value - $invested, 'series' => $series];
}

function calc_lumpsum(float $amount, float $rate, float $years): array
{
    $a = safe_num($amount); $r = safe_num($rate); $y = floor(safe_num($years));
    if (!$a || !$y) return ['invested' => 0, 'value' => 0, 'gain' => 0, 'series' => []];
    $series = [];
    for ($k = 1; $k <= $y; $k++) $series[] = ['x' => $k, 'a' => $a, 'b' => $a * (1 + $r / 100) ** $k];
    $value = end($series)['b'];
    return ['invested' => $a, 'value' => $value, 'gain' => $value - $a, 'series' => $series];
}

function calc_swp(float $corpus, float $withdrawal, float $rate, float $years): array
{
    $c = safe_num($corpus); $w = safe_num($withdrawal); $r = safe_num($rate); $y = floor(safe_num($years));
    if (!$c || !$y) return ['totalWithdrawn' => 0, 'endValue' => 0, 'monthsLasted' => 0, 'series' => []];
    $i = monthly_rate($r); $value = $c; $withdrawn = 0; $months = 0; $series = [];
    for ($month = 1; $month <= $y * 12; $month++) {
        if ($value <= 0) break;
        $take = min($w, $value);
        $value = ($value - $take) * (1 + $i); $withdrawn += $take; $months = $month;
        if ($month % 12 === 0) $series[] = ['x' => $month / 12, 'a' => $withdrawn, 'b' => $value];
    }
    return ['totalWithdrawn' => $withdrawn, 'endValue' => max(0, $value), 'monthsLasted' => $months, 'series' => $series];
}

function calc_stp(float $amount, float $transfer, float $srcRate, float $tgtRate, float $months): array
{
    $a = safe_num($amount); $t = safe_num($transfer); $rs = safe_num($srcRate); $rt = safe_num($tgtRate); $n = floor(safe_num($months));
    if (!$a || !$n) return ['sourceEnd' => 0, 'targetEnd' => 0, 'totalEnd' => 0, 'transferred' => 0, 'series' => []];
    $is = monthly_rate($rs); $it = monthly_rate($rt); $src = $a; $tgt = 0; $moved = 0; $series = [];
    for ($m = 1; $m <= $n; $m++) {
        $x = min($t, $src); $src -= $x; $tgt += $x; $moved += $x;
        $src *= 1 + $is; $tgt *= 1 + $it;
        $series[] = ['x' => $m, 'a' => $src, 'b' => $tgt];
    }
    return ['sourceEnd' => $src, 'targetEnd' => $tgt, 'totalEnd' => $src + $tgt, 'transferred' => $moved, 'series' => $series];
}

function calc_goal(float $target, float $years, float $rate, float $inflation, float $existing = 0): array
{
    $tgt0 = safe_num($target); $y = floor(safe_num($years)); $r = safe_num($rate); $inf = safe_num($inflation); $ex = safe_num($existing);
    if (!$tgt0 || !$y) return ['futureTarget' => 0, 'fromExisting' => 0, 'gap' => 0, 'monthlySip' => 0, 'lumpsumToday' => 0];
    $future = $tgt0 * (1 + $inf / 100) ** $y;
    $fromEx = $ex * (1 + $r / 100) ** $y;
    $gap = max(0, $future - $fromEx);
    $i = monthly_rate($r); $n = $y * 12;
    $factor = $i == 0 ? $n : (((1 + $i) ** $n - 1) / $i) * (1 + $i);
    return ['futureTarget' => $future, 'fromExisting' => $fromEx, 'gap' => $gap, 'monthlySip' => $gap / $factor, 'lumpsumToday' => $gap / (1 + $r / 100) ** $y];
}

function calc_retirement(float $age, float $retireAge, float $life, float $expense, float $inflation, float $pre, float $post, float $existing = 0): array
{
    $age = safe_num($age); $ra = safe_num($retireAge); $le = safe_num($life); $exp = safe_num($expense);
    $inf = safe_num($inflation); $pre = safe_num($pre); $post = safe_num($post); $ex = safe_num($existing);
    $yearsTo = max(0, floor($ra - $age)); $yearsIn = max(0, floor($le - $ra));
    if (!$exp || !$yearsTo || !$yearsIn) return ['yearsTo' => $yearsTo, 'yearsIn' => $yearsIn, 'expenseAtRetirement' => 0, 'corpusNeeded' => 0, 'fromExisting' => 0, 'monthlySip' => 0];
    $expRet = $exp * (1 + $inf / 100) ** $yearsTo;
    $annual = $expRet * 12; $g = $inf / 100; $rr = $post / 100;
    $corpus = abs($rr - $g) < 1e-9 ? $annual * $yearsIn : $annual * (1 - ((1 + $g) / (1 + $rr)) ** $yearsIn) / ($rr - $g) * (1 + $rr);
    $fromEx = $ex * (1 + $pre / 100) ** $yearsTo;
    $gap = max(0, $corpus - $fromEx);
    $i = monthly_rate($pre); $n = $yearsTo * 12;
    $factor = $i == 0 ? $n : (((1 + $i) ** $n - 1) / $i) * (1 + $i);
    return ['yearsTo' => $yearsTo, 'yearsIn' => $yearsIn, 'expenseAtRetirement' => $expRet, 'corpusNeeded' => $corpus, 'fromExisting' => $fromEx, 'monthlySip' => $gap / $factor];
}

function calc_cagr(float $start, float $end, float $years): array
{
    $s = safe_num($start); $e = safe_num($end); $y = safe_num($years);
    if (!$s || !$e || !$y) return ['cagrPct' => 0, 'absolutePct' => 0];
    return ['cagrPct' => (($e / $s) ** (1 / $y) - 1) * 100, 'absolutePct' => ($e / $s - 1) * 100];
}

function calc_inflation(float $amount, float $rate, float $years): array
{
    $a = safe_num($amount); $r = safe_num($rate); $y = floor(safe_num($years));
    if (!$a || !$y) return ['futureCost' => 0, 'purchasingPower' => 0, 'series' => []];
    $series = [];
    for ($k = 0; $k < $y; $k++) $series[] = ['x' => $k + 1, 'a' => $a / (1 + $r / 100) ** ($k + 1), 'b' => $a * (1 + $r / 100) ** ($k + 1)];
    return ['futureCost' => end($series)['b'], 'purchasingPower' => end($series)['a'], 'series' => $series];
}

function calc_pms_fee(float $corpus, float $years, float $grossPct): array
{
    $c = safe_num($corpus); $y = floor(safe_num($years)); $gr = is_finite($grossPct) ? $grossPct : 0;
    $fixed = 2; $perf = 20; $hurdle = 10; $op = 0.1;
    if (!$c || !$y) return ['netValue' => 0, 'grossValue' => 0, 'totalFees' => 0, 'effectiveAnnualFeePct' => 0, 'series' => []];
    $gm = (1 + $gr / 100) ** (1 / 12) - 1;
    $value = $c; $gross = $c; $hwm = $c; $fees = 0; $series = [];
    for ($k = 1; $k <= $y; $k++) {
        $start = $value; $fixedFee = 0;
        for ($m = 0; $m < 12; $m++) {
            $value *= 1 + $gm; $gross *= 1 + $gm;
            $f = $value * ($fixed / 100 / 12) + $value * ($op / 100 / 12);
            $value -= $f; $fixedFee += $f;
        }
        $level = max($hwm, $start) * (1 + $hurdle / 100);
        $perfFee = $value > $level ? ($value - $level) * ($perf / 100) : 0;
        $value -= $perfFee; if ($value > $hwm) $hwm = $value;
        $fees += $fixedFee + $perfFee;
        $series[] = ['x' => $k, 'a' => $value, 'b' => $gross];
    }
    $netCagr = ($value / $c) ** (1 / $y) - 1; $grossCagr = ($gross / $c) ** (1 / $y) - 1;
    return ['netValue' => $value, 'grossValue' => $gross, 'totalFees' => $fees, 'effectiveAnnualFeePct' => ($grossCagr - $netCagr) * 100, 'series' => $series];
}

/** Results for a calculator's current values, in the same shape calculators.js produces. */
function calc_results(string $slug, array $v): array
{
    switch ($slug) {
        case 'sip':
            $r = calc_sip($v['m'], $v['r'], $v['y']);
            return ['headline' => inr_short($r['value']), 'rows' => ['invested' => inr($r['invested']), 'gain' => inr($r['gain']), 'value' => inr($r['value'])], 'points' => $r['series']];
        case 'step-up-sip':
            $r = calc_step_up_sip($v['m'], $v['s'], $v['r'], $v['y']);
            $flat = calc_sip($v['m'], $v['r'], $v['y']);
            return ['headline' => inr_short($r['value']), 'rows' => ['invested' => inr($r['invested']), 'gain' => inr($r['gain']), 'flat' => inr($flat['value']), 'extra' => inr($r['value'] - $flat['value'])], 'points' => $r['series']];
        case 'lumpsum':
            $r = calc_lumpsum($v['a'], $v['r'], $v['y']);
            return ['headline' => inr_short($r['value']), 'rows' => ['invested' => inr($r['invested']), 'gain' => inr($r['gain'])], 'points' => $r['series']];
        case 'swp':
            $r = calc_swp($v['c'], $v['w'], $v['r'], $v['y']);
            $lasted = $r['monthsLasted'] < $v['y'] * 12 ? 'Runs out after ' . intdiv($r['monthsLasted'], 12) . ' yrs ' . ($r['monthsLasted'] % 12) . ' mths' : "Lasts the full {$v['y']} years";
            return ['headline' => inr_short($r['endValue']), 'rows' => ['withdrawn' => inr($r['totalWithdrawn']), 'remaining' => inr($r['endValue']), 'outcome' => $lasted], 'points' => $r['series']];
        case 'stp':
            $r = calc_stp($v['a'], $v['t'], $v['rs'], $v['rt'], $v['n']);
            return ['headline' => inr_short($r['totalEnd']), 'rows' => ['target' => inr($r['targetEnd']), 'source' => inr($r['sourceEnd']), 'transferred' => inr($r['transferred'])], 'points' => $r['series'], 'xPrefix' => 'M'];
        case 'goal':
            $r = calc_goal($v['g'], $v['y'], $v['r'], $v['i'], $v['e']);
            return ['headline' => inr(ceil($r['monthlySip'])), 'rows' => ['future' => inr($r['futureTarget']), 'grow' => inr($r['fromExisting']), 'once' => inr(ceil($r['lumpsumToday']))]];
        case 'retirement':
            $r = calc_retirement($v['age'], $v['ra'], $v['le'], $v['exp'], $v['inf'], $v['pre'], $v['post'], $v['ex']);
            return ['headline' => inr_short($r['corpusNeeded']), 'rows' => ['expRet' => inr($r['expenseAtRetirement']), 'yearsTo' => (string) $r['yearsTo'], 'yearsIn' => (string) $r['yearsIn'], 'grow' => inr($r['fromExisting']), 'sip' => inr(ceil($r['monthlySip']))]];
        case 'child-education':
            $years = max(0, floor(safe_num($v['ga']) - safe_num($v['ca'])));
            $r = calc_goal($v['cost'], $years, $v['r'], $v['inf'], $v['e']);
            return ['headline' => inr(ceil($r['monthlySip'])), 'rows' => ['years' => (string) $years, 'future' => inr($r['futureTarget']), 'once' => inr(ceil($r['lumpsumToday']))]];
        case 'cagr':
            $r = calc_cagr($v['s'], $v['e'], $v['y']);
            return ['headline' => pct_fmt($r['cagrPct'], 2), 'rows' => ['abs' => pct_fmt($r['absolutePct'], 1), 'gain' => inr(max(0, $v['e'] - $v['s']))]];
        case 'inflation':
            $r = calc_inflation($v['a'], $v['r'], $v['y']);
            return ['headline' => inr_short($r['futureCost']), 'rows' => ['cost' => inr($r['futureCost']), 'power' => inr($r['purchasingPower'])],
                'labels' => ['headline' => 'What ' . inr_short($v['a']) . " of today costs in {$v['y']} years", 'power' => "Today's " . inr_short($v['a']) . ' will buy'], 'points' => $r['series']];
        case 'pms-fee':
            $r = calc_pms_fee($v['c'], $v['y'], $v['g']);
            return ['headline' => inr_short($r['netValue']), 'rows' => ['gross' => inr($r['grossValue']), 'fees' => inr($r['totalFees']), 'eff' => pct_fmt($r['effectiveAnnualFeePct'], 2)], 'points' => $r['series']];
    }
    throw new InvalidArgumentException("Unknown calculator $slug");
}

/** The chart's SVG contents, identical to what calculators.js draws. */
function chart_svg(array $points, string $aLabel, string $bLabel, string $xPrefix = 'Yr '): array
{
    $W = 640; $H = 260; $P = ['l' => 56, 'r' => 12, 't' => 16, 'b' => 28];
    $n = count($points);
    if ($n < 2) return ['svg' => '<text x="320" y="130" text-anchor="middle" font-size="13" fill="#6E6C86">Enter values to see the chart</text>', 'readout' => '', 'aria' => ''];
    $max = max(array_map(fn($p) => max($p['a'], $p['b']), $points)) ?: 1;
    $num = fn(float $v) => js_num($v);
    $x = fn(int $i) => $P['l'] + ($i / ($n - 1)) * ($W - $P['l'] - $P['r']);
    $y = fn(float $v) => $H - $P['b'] - ($v / $max) * ($H - $P['t'] - $P['b']);
    $area = fn(string $k) => 'M' . $num($x(0)) . ',' . ($H - $P['b']) . ' ' . implode(' ', array_map(fn($p, $i) => 'L' . $num($x($i)) . ',' . $num($y($p[$k])), $points, array_keys($points))) . ' L' . $num($x($n - 1)) . ',' . ($H - $P['b']) . ' Z';
    $line = fn(string $k) => implode(' ', array_map(fn($p, $i) => ($i ? 'L' : 'M') . $num($x($i)) . ',' . $num($y($p[$k])), $points, array_keys($points)));
    $every = (int) ceil($n / 8);
    $svg = '';
    foreach ([0, 0.25, 0.5, 0.75, 1] as $t) {
        $v = $t * $max;
        $svg .= '<line x1="' . $P['l'] . '" x2="' . ($W - $P['r']) . '" y1="' . $num($y($v)) . '" y2="' . $num($y($v)) . '" stroke="rgba(29,27,58,.08)"></line><text x="' . ($P['l'] - 8) . '" y="' . $num($y($v) + 4) . '" text-anchor="end" font-size="11" fill="#6E6C86">' . inr_short($v) . '</text>';
    }
    $svg .= '<path d="' . $area('b') . '" fill="rgba(46,42,110,.14)"></path><path d="' . $line('b') . '" fill="none" stroke="#2E2A6E" stroke-width="2.25"></path>'
        . '<path d="' . $area('a') . '" fill="#E9DCC7" opacity=".9"></path><path d="' . $line('a') . '" fill="none" stroke="#C8876A" stroke-width="1.5"></path>';
    foreach ($points as $i => $p) if ($i % $every === 0) $svg .= '<text x="' . $num($x($i)) . '" y="' . ($H - 8) . '" text-anchor="middle" font-size="11" fill="#6E6C86">' . $xPrefix . js_num($p['x']) . '</text>';
    $last = $points[$n - 1];
    $lx = $num($x($n - 1));
    $svg .= '<line data-marker-line="" y1="' . $P['t'] . '" y2="' . ($H - $P['b']) . '" stroke="#DE4D7A" stroke-dasharray="3 3" x1="' . $lx . '" x2="' . $lx . '"></line><circle data-marker-dot="" r="4.5" fill="#DE4D7A" stroke="#fff" stroke-width="2" cx="' . $lx . '" cy="' . $num($y($last['b'])) . '"></circle>';
    return ['svg' => $svg, 'readout' => $xPrefix . js_num($last['x']) . " · $aLabel " . inr_short($last['a']) . " · $bLabel " . inr_short($last['b']),
        'aria' => "$bLabel grows to " . inr_short($last['b']) . ' against ' . strtolower($aLabel) . ' of ' . inr_short($last['a'])];
}

/** A float as JavaScript prints it (shortest round-trip form): 56, 102.5, 66.66666666666667 */
function js_num(float $v): string
{
    if ($v == floor($v) && abs($v) < 1e15) return (string) (int) $v;
    $s = var_export($v, true); // shortest repr since PHP 7.1 with serialize_precision=-1
    return str_contains($s, 'E') ? (string) $v : $s;
}
