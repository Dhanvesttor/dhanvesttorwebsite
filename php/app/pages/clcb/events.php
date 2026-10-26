<?php
$meta = ['title' => 'CLCB Events: Upcoming Money Workshops for Women', 'description' => 'Upcoming Dhanvesttor CLCB financial literacy sessions, workshops and masterclasses in Kolkata and online. Free to attend.', 'path' => '/clcb/events'];

$upcoming = cms_events(true);
$past = cms_events(false);
foreach ($upcoming as $ev) {
    echo json_ld(['@context' => 'https://schema.org', '@type' => 'Event', 'name' => $ev['title'], 'startDate' => $ev['date'], 'description' => $ev['summary'],
        'eventAttendanceMode' => $ev['mode'] === 'Online' ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
        'location' => $ev['mode'] === 'Online' ? ['@type' => 'VirtualLocation', 'url' => 'https://dhanvesttor.com/clcb/events'] : ['@type' => 'Place', 'name' => $ev['city'], 'address' => $ev['city']],
        'organizer' => ['@id' => 'https://dhanvesttor.com/#organization'], 'isAccessibleForFree' => true]);
}
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'CLCB', 'path' => '/clcb'], ['name' => 'Events', 'path' => '/clcb/events']], 'eyebrow' => 'Events', 'title' => 'Come as you are. <em>Leave with a plan.</em>',
    'lede' => 'All sessions are free. Register to hold a seat; in-person circles are kept small.']) ?>
<?= section([], '<h2 class="mb-8 text-[2rem]">Upcoming</h2>' . event_list($upcoming)) ?>
<?= section(['tone' => 'paper'], '<h2 class="mb-8 text-[2rem]">Recently held</h2>' . event_list($past, 'Past sessions will appear here.')) ?>
<?= cta(['title' => 'Want a session for <em>your</em> organisation?', 'primary' => ['label' => 'Partner with us', 'href' => '/clcb/partners'], 'secondary' => ['label' => 'Join the community', 'href' => '/clcb/join']]) ?>
