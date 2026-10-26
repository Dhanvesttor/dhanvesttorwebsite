<?php
$meta = ['title' => 'Bonds & Fixed Income: Bonds, NCDs, Corporate FDs', 'description' => 'Fixed income through Dhanvesttor: government and corporate bonds, NCDs, corporate fixed deposits and structured products for predictable income.', 'path' => '/bonds'];
$photos = photos();
$rows = [
    ['Return', 'Fixed', 'Market-linked', 'Fixed coupon', 'Fixed'],
    ['Liquidity', 'Penalty to break', 'Usually T+1', 'Sell on exchange, if traded', 'Restricted'],
    ['Credit risk', 'Low; insured to ₹5 lakh', 'Depends on fund', 'Depends on issuer rating', 'Depends on issuer rating'],
    ['Best for', 'Certainty, small sums', 'Flexible near-term goals', 'Known income and dates', 'Higher fixed rate'],
];
?>
<?= page_hero(['crumbs' => [['name' => 'Bonds & fixed income', 'path' => '/bonds']], 'eyebrow' => 'Bonds & fixed income', 'title' => 'For money that needs to arrive <em>on a known date.</em>',
    'lede' => 'Equity is for growth over years. Fixed income is for the fees due next April, the income you draw every month, and the calm part of a portfolio that lets you hold the rest through a storm.',
    'actions' => button('Talk to us', ['href' => '#contact']) . button('Bonds &amp; NCDs', ['href' => '/bonds/bonds-ncds', 'variant' => 'ghost']),
    'image' => $photos['desk']['label'], 'imageSrc' => $photos['desk']['src']]) ?>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'What we offer', 'title' => 'Three ways to <em>earn interest.</em>']) . service_grid([
    ['title' => 'Bonds & NCDs', 'blurb' => 'Government securities, corporate bonds and non-convertible debentures.', 'href' => '/bonds/bonds-ncds', 'meta' => 'Fixed coupon'],
    ['title' => 'Corporate FDs', 'blurb' => 'Deposits with well-rated companies and NBFCs.', 'href' => '/bonds/corporate-fds', 'meta' => 'Fixed rate'],
    ['title' => 'Structured products', 'blurb' => 'Market-linked payoffs for experienced investors.', 'href' => '/bonds/structured-products', 'meta' => 'Advanced'],
], 3)) ?>

<?= section(['tone' => 'paper'], section_head(['align' => 'split', 'eyebrow' => 'Compared', 'title' => 'Which fixed-income tool <em>when.</em>'])
    . table_ui(['', 'Bank FD', 'Debt mutual fund', 'Bonds &amp; NCDs', 'Corporate FD'], array_map(fn($r) => array_map('e', $r), $rows))) ?>

<?= contact_band(['defaultPath' => 'bonds', 'paths' => ['bonds', 'mf', 'pms']]) ?>
<?= disclaimer(disclaimers()['insuranceBonds']) ?>
