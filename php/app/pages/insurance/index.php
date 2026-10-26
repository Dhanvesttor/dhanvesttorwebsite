<?php
$meta = ['title' => 'Insurance: Health, Property, Motor & Business Cover', 'description' => 'Insurance through Dhanvesttor: health, home, motor, business and group cover compared across insurers, explained plainly, with claims support.', 'path' => '/insurance'];
$photos = photos();
$licence = todo()['insuranceLicence'];
?>
<?= page_hero(['crumbs' => [['name' => 'Insurance', 'path' => '/insurance']], 'eyebrow' => 'Insurance', 'title' => 'Protection first. <em>Then</em> growth.',
    'lede' => 'Before we talk about returns, we ask what happens if something goes wrong. The right cover, compared across insurers and explained in plain words, is what lets the rest of your plan hold.',
    'actions' => button('Review my cover', ['href' => '#contact']) . button('Start with health', ['href' => '/insurance/health', 'variant' => 'ghost']),
    'image' => $photos['conversation']['label'], 'imageSrc' => $photos['conversation']['src']]) ?>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'What we cover', 'title' => 'Cover for your life, <em>your home</em> and your business.']) . service_grid([
    ['title' => 'Health', 'blurb' => 'Individual, family floater, senior citizen, critical illness and top-ups.', 'href' => '/insurance/health', 'meta' => 'Personal'],
    ['title' => 'Property & motor', 'blurb' => 'Home, shop, office, car and two-wheeler.', 'href' => '/insurance/property-motor', 'meta' => 'Assets'],
    ['title' => 'Business & group', 'blurb' => 'Liability, cyber, marine, engineering, and employee health cover.', 'href' => '/insurance/business', 'meta' => 'Business'],
], 3)) ?>

<?= section(['tone' => 'paper'], section_head(['eyebrow' => 'How we work', 'title' => 'Independent advice, <em>start to claim.</em>']) . step_list([
    ['title' => 'Assess', 'text' => 'We look at what you already have, including employer cover, and where the gaps are.'],
    ['title' => 'Compare', 'text' => 'Options across insurers, with the exclusions and waiting periods side by side.'],
    ['title' => 'Place', 'text' => 'We handle the paperwork and make sure the proposal form is complete and accurate.'],
    ['title' => 'Stand by', 'text' => 'Renewal reminders, policy changes, and support when you need to claim.'],
])) ?>

<?= contact_band(['defaultPath' => 'insurance', 'paths' => ['insurance', 'mf', 'pms'], 'heading' => 'Not sure what you&#39;re <em>covered</em> for?', 'lede' => "Send us your existing policies. We'll read them and tell you, in plain words, what they do and don't cover."]) ?>
<?= disclaimer(($licence ? $licence . '. ' : '') . disclaimers()['insuranceBonds']) ?>
