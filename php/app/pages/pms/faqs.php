<?php
$meta = ['title' => 'PMS FAQs: Minimum, Fees, Tax, Custody, Exit', 'description' => "Answers to common questions about Dhanvesttor's portfolio management service: minimum investment, ownership, fees, taxation, reporting, onboarding and exits.", 'path' => '/pms/faqs'];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'PMS', 'path' => '/pms'], ['name' => 'FAQs', 'path' => '/pms/faqs']], 'eyebrow' => 'PMS FAQs', 'title' => 'Questions, <em>answered plainly.</em>']) ?>
<?= section([], '<div class="mx-auto max-w-[860px]">' . faq_list(cms_faqs('pms')) . '</div>') ?>
<?= cta(['title' => 'Didn&#39;t find <em>your</em> question?', 'primary' => ['label' => 'Ask us', 'href' => '/contact'], 'secondary' => ['label' => 'Mutual fund FAQs', 'href' => '/mutual-funds/faqs'], 'tone' => 'sand']) ?>
