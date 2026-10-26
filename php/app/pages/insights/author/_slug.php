<?php
$slug = $params['slug'];
$a = null;
foreach (cms_authors() as $x) if ($x['slug'] === $slug) $a = $x;
if (!$a) not_found();
$meta = ['title' => 'Articles by ' . $a['name'], 'description' => $a['bio'], 'path' => '/insights/author/' . $a['slug']];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Insights', 'path' => '/insights'], ['name' => $a['name'], 'path' => '/insights/author/' . $slug]], 'eyebrow' => $a['role'] ?: 'Author', 'title' => e($a['name']), 'lede' => e($a['bio'])]) ?>
<?= section([], post_grid(cms_posts(['author' => $slug]))) ?>
