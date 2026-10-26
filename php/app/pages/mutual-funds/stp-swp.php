<?php
$meta = ['title' => 'STP & SWP: Systematic Transfer and Withdrawal Plans', 'description' => 'How a systematic transfer plan phases a lumpsum into equity, and how a systematic withdrawal plan turns a corpus into a monthly income. With calculators.', 'path' => '/mutual-funds/stp-swp', 'scripts' => ['calculators']];
$d = disclaimers();
?>
<?= page_hero(['crumbs' => [['name' => 'Mutual Funds', 'path' => '/mutual-funds'], ['name' => 'STP & SWP', 'path' => '/mutual-funds/stp-swp']], 'eyebrow' => 'STP & SWP', 'title' => 'Moving in slowly. <em>Drawing out steadily.</em>',
    'lede' => "Two tools for the moments a SIP doesn't cover: when you have a large sum to invest, and when you need your investments to pay you."]) ?>

<?= section([], '<div class="grid gap-12 md:grid-cols-2">'
    . '<div class="border-t border-line pt-6"><p class="eyebrow">STP · Systematic transfer plan</p><h2 class="mt-3 text-[2rem]">For a lumpsum you&#39;re <em>nervous</em> about.</h2><p class="mt-4 text-[#3f3d5c]">Park the money in a liquid or short-duration debt fund. Each month, a fixed amount moves into your chosen equity fund. You earn debt returns while you wait and avoid investing everything on the worst possible day.</p></div>'
    . '<div class="border-t border-line pt-6"><p class="eyebrow">SWP · Systematic withdrawal plan</p><h2 class="mt-3 text-[2rem]">For an income that <em>keeps growing.</em></h2><p class="mt-4 text-[#3f3d5c]">Withdraw a fixed amount every month from a fund while the rest stays invested. Popular with retirees, because only the gain portion of each withdrawal is taxed.</p></div>'
    . '</div>') ?>

<?= section(['tone' => 'paper'], section_head(['eyebrow' => 'Calculators', 'title' => 'Try <em>both.</em>'])
    . tabs([['label' => 'STP calculator', 'content' => calculator('stp')], ['label' => 'SWP calculator', 'content' => calculator('swp')]])) ?>

<?= cta(['title' => 'Planning a large investment, or <em>retirement income?</em>', 'primary' => ['label' => 'Talk to us', 'href' => '/contact'], 'secondary' => ['label' => 'Retirement calculator', 'href' => '/calculators/retirement']]) ?>
<?= disclaimer($d['mutualFunds'] . ' ' . $d['calculators']) ?>
