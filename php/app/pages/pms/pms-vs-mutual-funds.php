<?php
$meta = ['title' => 'PMS vs Mutual Funds: The Honest Comparison', 'description' => 'Portfolio management services vs mutual funds in India compared on minimum investment, ownership, concentration, fees, tax, transparency and who each suits.', 'path' => '/pms/pms-vs-mutual-funds'];

$rows = [
    ['Minimum', '₹500 (SIP) or ₹5,000 with us', '₹50 lakh (SEBI minimum)'],
    ['What you own', 'Units of a pooled fund', 'Shares, in your own demat account'],
    ['Number of stocks', 'Typically 40 to 80', 'Typically 15 to 30'],
    ['Fees', 'Expense ratio, usually 0.5% to 2.25%', 'Fixed fee plus a share of profits above a hurdle'],
    ['Tax', 'Only when you redeem', 'On each sale the manager makes, in your hands'],
    ['Transparency', 'Monthly factsheet, portfolio disclosed with a lag', 'Every holding and trade, monthly'],
    ['Customisation', 'None; same for every investor', 'Some: exclusions can be agreed'],
    ['Regulation', 'SEBI (Mutual Funds) Regulations', 'SEBI (Portfolio Managers) Regulations'],
    ['Best for', 'Steady wealth-building at any size', 'A focused, long-term equity allocation'],
];
$qa = [
    ['q' => 'Is PMS better than mutual funds?', 'a' => 'Neither is better in the abstract. Mutual funds suit steady wealth-building at any size; PMS suits a larger, long-term equity allocation where you want concentration and direct ownership.'],
    ['q' => 'Can I hold both?', 'a' => 'Yes. Many of our PMS clients keep their mutual fund SIPs running alongside.'],
];
$stages = [['Starting out', 'Mutual fund SIPs across two or three categories. Build the habit first.'], ['Growing', 'A diversified mutual fund core, with a focused PMS allocation once your equity money crosses ₹50 lakh.'], ['Established', 'PMS for direct ownership and concentration; mutual funds and bonds for liquidity and stability.']];
?>
<?= json_ld(faq_json_ld($qa)) ?>
<?= page_hero(['crumbs' => [['name' => 'PMS', 'path' => '/pms'], ['name' => 'PMS vs mutual funds', 'path' => '/pms/pms-vs-mutual-funds']], 'eyebrow' => 'The honest comparison', 'title' => 'PMS or mutual funds? <em>Often both.</em>',
    'lede' => 'We distribute mutual funds and manage a PMS, so we have no reason to push one over the other. Here is how they differ.']) ?>

<?= section([], table_ui(['', 'Mutual funds', 'PMS'], array_map(fn($r) => array_map('e', $r), $rows))) ?>

<?= section(['tone' => 'paper'], function () use ($stages) { ?>
  <?= section_head(['align' => 'split', 'eyebrow' => 'The question we actually ask', 'title' => 'What is the money <em>for?</em>',
      'lede' => "If the answer is a house in three years, the conversation is about debt funds, not PMS. If it is 'I don't need this for ten years and I want to understand what I own', PMS may be the right next step."]) ?>
  <div class="grid gap-6 md:grid-cols-3">
    <?php foreach ($stages as [$t, $b]): ?><div class="rounded-2xl border border-line bg-white p-6"><h3 class="text-[1.4rem]"><?= e($t) ?></h3><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= cta(['title' => 'Read the long version, or <em>ask us directly.</em>', 'primary' => ['label' => 'Talk to us', 'href' => '/contact'], 'secondary' => ['label' => 'Read the article', 'href' => '/insights/pms-vs-mutual-funds-honest-comparison']]) ?>
