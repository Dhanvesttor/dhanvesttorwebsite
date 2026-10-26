<?php
$meta = ['title' => 'SIP (Systematic Investment Plan): Start from ₹5,000', 'description' => 'What a SIP is, how rupee-cost averaging works, how much to start with, step-up SIPs, and how to begin a SIP with Dhanvesttor.', 'path' => '/mutual-funds/sip', 'scripts' => ['calculators']];

$ideas = [['Rupee-cost averaging', 'The same amount buys more units when prices fall and fewer when they rise. Over time you pay a lower average price than the average market price.'], ['Compounding', 'Gains earn gains. The curve looks flat for years, then steepens. Most of the value of a 20-year SIP arrives in the last eight.'], ['Discipline', 'An auto-debit on salary day removes the hardest part of investing: deciding to do it again.']];
$d = disclaimers();
?>
<?= page_hero(['crumbs' => [['name' => 'Mutual Funds', 'path' => '/mutual-funds'], ['name' => 'SIP', 'path' => '/mutual-funds/sip']], 'eyebrow' => 'Systematic investment plan', 'title' => 'The decision you make <em>once.</em>',
    'lede' => 'A SIP invests a fixed amount in a mutual fund every month, automatically. You stop deciding whether this is a good month to invest. That is the whole trick, and it works.',
    'actions' => button('Start a SIP', ['href' => '/contact']) . button('Step-up SIP calculator', ['href' => '/calculators/step-up-sip', 'variant' => 'ghost'])]) ?>

<?= section([], function () use ($ideas) { ?>
  <div class="grid gap-10 md:grid-cols-3">
    <?php foreach ($ideas as [$t, $b]): ?><div class="border-t border-line pt-6"><h3 class="text-[1.6rem]"><?= e($t) ?></h3><p class="mt-3 text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= section(['tone' => 'paper'], section_head(['align' => 'split', 'eyebrow' => 'Calculator', 'title' => 'See it <em>compound.</em>']) . calculator('sip')) ?>

<?= section([], '<div class="mx-auto max-w-[860px]"><p class="eyebrow mb-3">Questions</p><h2 class="mb-8 text-[2.2rem]">SIP, <em>simply.</em></h2>' . faq_list([
    ['q' => 'How much should I start with?', 'a' => 'Whatever you will not miss. ₹5,000 a month that continues for ten years beats ₹50,000 that stops after two. You can raise it every year.'],
    ['q' => 'Which date is best?', 'a' => "The date doesn't matter over the long run. Pick a day just after your salary arrives."],
    ['q' => 'What happens if I miss an instalment?', 'a' => 'Nothing dramatic. The fund house may retry; after three consecutive misses the SIP may be cancelled. Your existing units stay invested.'],
    ['q' => 'Can I stop a SIP?', 'a' => 'Yes, any time, without penalty, except that ELSS instalments stay locked for three years each.'],
]) . '</div>') ?>

<?= contact_band(['defaultPath' => 'mf', 'paths' => ['mf'], 'heading' => 'Set up your first SIP <em>this week.</em>']) ?>
<?= disclaimer($d['mutualFunds'] . ' ' . $d['calculators']) ?>
