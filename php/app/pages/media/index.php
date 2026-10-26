<?php
$meta = ['title' => 'Press & Media', 'description' => "Dhanvesttor in the news: coverage in Mint, Harper's Bazaar India, Cafemutual, Business India and more. Media enquiries and press kit.", 'path' => '/media'];
$press = cms_press();
?>
<?= page_hero(['crumbs' => [['name' => 'Media', 'path' => '/media']], 'eyebrow' => 'Press & media', 'title' => 'In the <em>conversation.</em>', 'lede' => "Coverage of Dhanvesttor, our founder and our work on women's financial participation.",
    'actions' => button('Media kit', ['href' => '/media/kit']) . button('Media enquiries', ['href' => 'mailto:' . site()['email'] . '?subject=Media%20enquiry', 'variant' => 'ghost'])]) ?>

<?= section([], function () use ($press) { ?>
  <ul class="divide-y divide-line border-y border-line">
    <?php foreach ($press as $p): ?>
      <li><a href="<?= e($p['url']) ?>" target="_blank" rel="noopener" class="group grid gap-2 py-6 md:grid-cols-[200px_1fr_120px] md:items-baseline">
        <span class="font-display text-[1.2rem] text-indigo"><?= e($p['outlet']) ?></span>
        <span class="text-[1.05rem] group-hover:text-raspberry"><?= e($p['title']) ?> <span aria-hidden="true">↗</span></span>
        <span class="text-[13px] text-mist md:text-right"><?= $p['date'] ? format_date($p['date']) : '' ?></span>
      </a></li>
    <?php endforeach ?>
  </ul>
<?php }) ?>
