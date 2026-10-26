<?php
$meta = ['title' => 'The Monthly Letter', 'description' => "Dhanvesttor's monthly letter: one short, plain-language email about markets, money and our community. Never a sales pitch.", 'path' => '/insights/newsletter'];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Insights', 'path' => '/insights'], ['name' => 'Newsletter', 'path' => '/insights/newsletter']], 'eyebrow' => 'The monthly letter', 'title' => 'One email a month. <em>Worth opening.</em>',
    'lede' => "What moved in markets and why it matters, one idea worth understanding, and what's coming up at CLCB. Five minutes to read. Unsubscribe in one click."]) ?>
<?= section([], '<div class="max-w-xl">' . newsletter_form() . '</div>') ?>
