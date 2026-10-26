<?php
$toSlug = fn(string $t) => strtolower(preg_replace('/\s+/', '-', $t));
$posts = cms_posts();
$name = null;
foreach ($posts as $p) foreach ($p['tags'] as $t) if ($toSlug($t) === $params['slug']) $name = $t;
if ($name === null) not_found();
$meta = ['title' => $name . ' Articles', 'description' => "Dhanvesttor articles tagged $name.", 'path' => '/insights/tag/' . $toSlug($name), 'noIndex' => true];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Insights', 'path' => '/insights'], ['name' => $name, 'path' => '/insights/tag/' . $toSlug($name)]], 'eyebrow' => 'Tag', 'title' => e($name)]) ?>
<?= section([], post_grid(array_values(array_filter($posts, fn($p) => in_array($name, $p['tags'], true))))) ?>
