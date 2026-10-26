<?php
$meta = ['title' => 'Mutual Fund FAQs: KYC, Direct vs Regular, Tax', 'description' => 'Answers to common mutual fund questions: minimum investment, KYC documents, direct vs regular plans, taxation, pausing SIPs and more.', 'path' => '/mutual-funds/faqs'];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Mutual Funds', 'path' => '/mutual-funds'], ['name' => 'FAQs', 'path' => '/mutual-funds/faqs']], 'eyebrow' => 'Mutual fund FAQs', 'title' => 'The questions <em>everyone</em> has.']) ?>
<?= section([], '<div class="mx-auto max-w-[860px]">' . faq_list(cms_faqs('mf')) . '</div>') ?>
<?= cta(['tone' => 'sand', 'title' => 'Still <em>wondering?</em>', 'primary' => ['label' => 'Ask us', 'href' => '/contact'], 'secondary' => ['label' => 'PMS FAQs', 'href' => '/pms/faqs']]) ?>
<?= disclaimer(disclaimers()['mutualFunds']) ?>
