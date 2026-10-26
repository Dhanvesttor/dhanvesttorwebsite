<?php
$meta = ['title' => 'Partner Mutual Fund Houses (AMCs)', 'description' => 'Dhanvesttor distributes mutual funds from 20+ fund houses including ICICI Prudential, HDFC, Kotak, Motilal Oswal, UTI, Nippon India, Aditya Birla Sun Life, Axis, Mirae Asset and more.', 'path' => '/mutual-funds/partners'];
?>
<?= page_hero(['crumbs' => [['name' => 'Mutual Funds', 'path' => '/mutual-funds'], ['name' => 'Partner fund houses', 'path' => '/mutual-funds/partners']], 'eyebrow' => 'Partner fund houses', 'title' => 'Access to India&#39;s major fund houses, <em>without the noise.</em>',
    'lede' => 'We are empanelled with more than twenty asset management companies. That breadth means we can choose the right fund for each part of your plan, instead of the right fund from one house.']) ?>
<?= section([], logo_wall(content('amcs')['amcs']) . '<p class="mt-8 text-[14px] text-mist">And many more. If you hold funds from a house not listed here, we can still review and include them in your plan.</p>') ?>
<?= cta(['title' => 'One plan across <em>every</em> fund house.', 'primary' => ['label' => 'Start a conversation', 'href' => '/contact'], 'secondary' => ['label' => 'How we select', 'href' => '/mutual-funds/how-we-select']]) ?>
<?= disclaimer(disclaimers()['mutualFunds']) ?>
