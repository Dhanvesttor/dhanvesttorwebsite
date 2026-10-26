<?php
$meta = ['title' => 'Page not found', 'description' => 'This page has moved on.', 'noIndex' => true];
?>
<?= section(['class' => 'min-h-[60vh]'], function () { ?>
  <div class="max-w-[60ch]">
    <?= hairline('mb-6') ?>
    <p class="eyebrow mb-4">404</p>
    <h1 class="text-[2.5rem] sm:text-[3.5rem]">This page has <em>moved on.</em></h1>
    <p class="mt-6 text-lg text-[#3f3d5c]">The link may be old, or the page may have been renamed when we rebuilt the site. The map below should get you where you were going.</p>
    <div class="mt-8 flex flex-wrap gap-3"><?= button('Home', ['href' => '/']) ?><?= button('Site map', ['href' => '/sitemap-page', 'variant' => 'ghost']) ?><?= button('Contact', ['href' => '/contact', 'variant' => 'ghost']) ?></div>
  </div>
<?php }) ?>
