<?php
$meta = ['title' => 'CLCB Programmes: Workshops, Circles & Masterclasses', 'description' => "Dhanvesttor's CLCB financial education programmes for women: Money Basics Circles, investing workshops, masterclasses, learning circles, campus sessions and community outreach.", 'path' => '/clcb/programmes'];
$programmes = content('clcb')['programmes'];
?>
<?= page_hero(['crumbs' => [['name' => 'CLCB', 'path' => '/clcb'], ['name' => 'Programmes', 'path' => '/clcb/programmes']], 'eyebrow' => 'Programmes', 'title' => 'From your first question to your <em>hundredth.</em>',
    'lede' => 'Every programme is free, run by people who do this work every day, and designed so you leave knowing what to do next.']) ?>

<?= section([], function () use ($programmes) { ?>
  <div class="grid gap-20">
    <?php foreach ($programmes as $i => $p): ?>
      <article id="<?= e($p['slug']) ?>" class="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2">
        <div<?= $i % 2 ? ' class="lg:order-2"' : '' ?>>
          <span class="font-display text-[1.25rem] text-terracotta"><?= pad2($i + 1) ?></span>
          <h2 class="mt-3 text-[2.25rem]"><?= e($p['name']) ?></h2>
          <p class="mt-3 text-[12.5px] uppercase tracking-[.14em] text-raspberry"><?= e($p['format']) ?></p>
          <p class="mt-4 text-[1.0625rem] text-[#3f3d5c]"><?= e($p['text']) ?></p>
          <p class="mt-4 text-[14px] text-mist"><span class="font-medium text-ink">For:</span> <?= e($p['who']) ?></p>
        </div>
        <?= image_placeholder(['label' => 'CLCB · ' . $p['name'], 'ratio' => '3/2', 'class' => $i % 2 ? 'lg:order-1' : '']) ?>
      </article>
    <?php endforeach ?>
  </div>
<?php }) ?>

<?= cta(['title' => 'Find a session <em>near you.</em>', 'primary' => ['label' => 'Upcoming events', 'href' => '/clcb/events'], 'secondary' => ['label' => 'Join the community', 'href' => '/clcb/join']]) ?>
