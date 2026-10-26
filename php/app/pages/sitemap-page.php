<?php
$meta = ['title' => 'Site Map', 'description' => 'Every page on the Dhanvesttor website.', 'path' => '/sitemap-page'];
$link = fn(string $label, string $href) => '<li><a href="' . e($href) . '" class="text-[#3f3d5c] hover:text-raspberry">' . e($label) . '</a></li>';
?>
<?= page_hero(['compact' => true, 'eyebrow' => 'Site map', 'title' => 'Every page, in one place.', 'crumbs' => [['name' => 'Site map', 'path' => '/sitemap-page']]]) ?>

<?= section([], function () use ($link) { ?>
  <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
    <?php foreach (nav_groups() as $g): if (empty($g['children'])) continue; ?>
      <div><h2 class="mb-4 text-[1.5rem]"><a href="<?= e($g['href']) ?>"><?= e($g['label']) ?></a></h2>
        <ul class="grid gap-2 text-[14.5px]"><?php foreach ($g['children'] as $c) echo $link($c['label'], $c['href']) ?></ul></div>
    <?php endforeach ?>
    <div><h2 class="mb-4 text-[1.5rem]"><a href="/insights">Insights</a></h2><ul class="grid gap-2 text-[14.5px]"><?= $link('Newsletter', '/insights/newsletter') ?></ul></div>
    <div><h2 class="mb-4 text-[1.5rem]">Regulatory</h2><ul class="grid gap-2 text-[14.5px]"><?php foreach (content('nav')['footerNav'][3]['links'] as [$l, $h]) echo $link($l, $h) ?></ul></div>
  </div>
<?php }) ?>
