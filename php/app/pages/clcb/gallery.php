<?php
$meta = ['title' => 'CLCB Gallery', 'description' => 'Photographs from Dhanvesttor CLCB workshops, learning circles and community events.', 'path' => '/clcb/gallery'];

$slots = [
    ['Money Basics Circle, Kolkata', '4/5'], ['Workshop whiteboard', '3/2'], ['Participants in discussion', '1/1'],
    ['Masterclass with the fund manager', '3/2'], ['Campus session', '4/5'], ['Community outreach, Bengal', '1/1'],
    ['Learning circle', '4/5'], ['Founder addressing a workshop', '3/2'], ['Certificates and smiles', '1/1'],
];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'CLCB', 'path' => '/clcb'], ['name' => 'Gallery', 'path' => '/clcb/gallery']], 'eyebrow' => 'Gallery', 'title' => 'Rooms full of <em>good questions.</em>']) ?>
<?= section([], '<div class="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">' . implode('', array_map(fn($s) => image_placeholder(['label' => $s[0], 'ratio' => $s[1]]), $slots)) . '</div>') ?>
<?= cta(['tone' => 'sand', 'title' => 'Be in the <em>next</em> photograph.', 'primary' => ['label' => 'Upcoming events', 'href' => '/clcb/events']]) ?>
