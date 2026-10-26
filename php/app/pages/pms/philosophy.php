<?php
$meta = ['title' => 'Investment Philosophy & Process', 'description' => 'How Dhanvesttor researches, selects, sizes and sells companies in the FAITH Fund: bottom-up, valuation-aware and governed by a strict negative list.', 'path' => '/pms/philosophy'];

$beliefs = [
    ['Price and value are different numbers.', 'Markets price fear and excitement daily. Value moves slowly with cash flows. We act in the gap and wait for the two to meet.'],
    ['Governance is not a footnote.', 'A great business run by people who treat minority shareholders badly is not a great investment. Our negative list removes them before the spreadsheet opens.'],
    ['Market cap is an outcome, not a strategy.', 'We own large, mid and small companies as the opportunity set changes. Flexibility is the point of a flexi-cap mandate.'],
    ['Behaviour beats brilliance.', 'Most long-term returns are lost in a few panicked weeks. A written process protects you from us, and us from the market.'],
];
$risks = [['Position limits', 'No single stock is allowed to dominate the portfolio; sector exposure is monitored against the benchmark.'], ['Liquidity discipline', 'Small-cap positions are sized so we can exit without moving the price against you.'], ['Cash as a choice', 'When nothing meets our valuation bar, we are willing to hold cash rather than force a purchase.']];
?>
<?= page_hero(['crumbs' => [['name' => 'PMS', 'path' => '/pms'], ['name' => 'Philosophy & process', 'path' => '/pms/philosophy']], 'eyebrow' => 'Philosophy & process', 'title' => 'Patience is a process, <em>not a personality.</em>',
    'lede' => 'We buy good businesses at sensible prices and hold them while the reasons we bought still hold. Every step of that sentence has a rule behind it.']) ?>

<?= section([], function () use ($beliefs) { ?>
  <?= section_head(['align' => 'split', 'eyebrow' => 'What we believe', 'title' => 'Four beliefs that shape <em>every decision.</em>']) ?>
  <div class="grid gap-10 md:grid-cols-2">
    <?php foreach ($beliefs as [$t, $b]): ?><div class="border-t border-line pt-6"><h3 class="text-[1.6rem]"><?= e($t) ?></h3><p class="mt-3 text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= section(['tone' => 'paper'], section_head(['eyebrow' => 'The process', 'title' => 'From an idea to a <em>position.</em>']) . step_list([
    ['title' => 'Screen', 'text' => 'Quantitative filters on return on capital, leverage, cash conversion and pledging narrow the universe.'],
    ['title' => 'Negative list', 'text' => 'Anything with governance red flags, related-party abuse, auditor qualifications or harmful practices is removed.'],
    ['title' => 'Research', 'text' => 'Annual reports, management meetings, channel checks and a written thesis for each company under FAITH.'],
    ['title' => 'Value', 'text' => 'An intrinsic value range with a margin of safety. Position size follows conviction and liquidity.'],
    ['title' => 'Review & sell', 'text' => 'We sell when the thesis breaks, the price overshoots value, or a clearly better opportunity appears.'],
], false, 5)) ?>

<?= section([], function () use ($risks) { ?>
  <?= section_head(['align' => 'split', 'eyebrow' => 'Risk', 'title' => 'How we try to <em>lose less.</em>', 'lede' => 'No equity portfolio avoids drawdowns. We aim to make them survivable and recoverable.']) ?>
  <div class="grid gap-6 md:grid-cols-3">
    <?php foreach ($risks as [$t, $b]): ?><div class="rounded-2xl border border-line bg-white p-6"><h3 class="text-[1.35rem]"><?= e($t) ?></h3><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= section(['tone' => 'sand'], quote_block('Like virtually every PMS strategy, FAITH fell in the recent correction. We did not change the process to chase the recovery. That discipline is what you are paying for.', 'Ishan Daga', 'Fund Manager, Dhanvesttor FAITH Fund')) ?>
<?= cta(['title' => 'See how the process <em>shows up</em> in the portfolio.', 'primary' => ['label' => 'The FAITH Fund', 'href' => '/pms/faith-fund'], 'secondary' => ['label' => 'Talk to us', 'href' => '/contact']]) ?>
<?= disclaimer(disclaimers()['general']) ?>
