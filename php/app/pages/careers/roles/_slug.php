<?php
$job = cms_job($params['slug']);
if (!$job) not_found();
$meta = ['title' => $job['title'] . ', ' . $job['location'], 'description' => $job['summary'], 'path' => '/careers/roles/' . $job['slug'], 'noIndex' => !$job['open']];

$types = ['Full-time' => 'FULL_TIME', 'Part-time' => 'PART_TIME', 'Internship' => 'INTERN'];
?>
<?= json_ld(['@context' => 'https://schema.org', '@type' => 'JobPosting', 'title' => $job['title'], 'description' => $job['html'], 'datePosted' => $job['postedAt'], 'employmentType' => $types[$job['type']] ?? 'CONTRACTOR',
    'hiringOrganization' => ['@type' => 'Organization', 'name' => site()['name'], 'sameAs' => 'https://dhanvesttor.com'],
    'jobLocation' => ['@type' => 'Place', 'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Kolkata', 'addressRegion' => 'West Bengal', 'addressCountry' => 'IN']]]) ?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Careers', 'path' => '/careers'], ['name' => 'Open roles', 'path' => '/careers/roles'], ['name' => $job['title'], 'path' => '/careers/roles/' . $job['slug']]],
    'eyebrow' => "{$job['department']} · {$job['location']} · {$job['type']}", 'title' => e($job['title']), 'lede' => e($job['summary'])]) ?>

<?= section([], '<div class="grid gap-14 lg:grid-cols-[1.2fr_1fr]">' . prose($job['html']) . '<div class="self-start lg:sticky lg:top-28">'
    . ($job['open'] ? '<p class="eyebrow mb-3">Apply</p>' . apply_form($job['title'], $job['department'])
        : '<p class="rounded-2xl border border-line p-6 text-mist">This role is now closed. See <a href="/careers/roles" class="text-raspberry underline">open roles</a>.</p>')
    . '</div></div>') ?>
