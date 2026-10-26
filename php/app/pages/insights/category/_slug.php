<?php
$slug = $params['slug'];
$c = null;
foreach (cms_categories() as $x) if ($x['slug'] === $slug) $c = $x;
if (!$c) not_found();
$meta = ['title' => $c['name'] . ' Articles', 'description' => $c['description'], 'path' => '/insights/category/' . $c['slug']];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Insights', 'path' => '/insights'], ['name' => $c['name'], 'path' => '/insights/category/' . $slug]], 'eyebrow' => 'Insights', 'title' => e($c['name']), 'lede' => e($c['description'])]) ?>
<?= section([], post_grid(cms_posts(['category' => $slug]))) ?>
