<?php
$meta = ['title' => 'Careers at Dhanvesttor, Kolkata', 'description' => 'Work at Dhanvesttor: open roles in relationship management, research, CLCB programmes, marketing and operations at a women-first wealth firm in Kolkata.', 'path' => '/careers'];
$jobs = cms_jobs(true);
$n = count($jobs);
?>
<?= page_hero(['crumbs' => [['name' => 'Careers', 'path' => '/careers']], 'eyebrow' => 'Careers', 'title' => 'Help make finance feel <em>like it was built for everyone.</em>',
    'lede' => 'We are a small team in Kolkata building a wealth firm that explains before it sells. If that sentence makes you want to work harder, read on.',
    'actions' => button('See open roles', ['href' => '#roles']) . button('Life at Dhanvesttor', ['href' => '/careers/life-at-dhanvesttor', 'variant' => 'ghost']),
    'image' => photos()['team']['label']]) ?>

<?= section(['id' => 'roles'], function () use ($jobs, $n) { ?>
  <?= section_head(['align' => 'split', 'eyebrow' => 'Open roles', 'title' => 'Where we need <em>you.</em>', 'lede' => e("$n open " . ($n === 1 ? 'role' : 'roles') . ". Don't see a fit? Send a general application below.")]) ?>
  <ul class="divide-y divide-line border-y border-line">
    <?php foreach ($jobs as $j): ?>
      <li><a href="/careers/roles/<?= e($j['slug']) ?>" class="group grid gap-3 py-7 md:grid-cols-[1.4fr_1fr_auto] md:items-center">
        <div><h3 class="text-[1.6rem] group-hover:text-indigo"><?= e($j['title']) ?></h3><p class="mt-1 text-[14.5px] text-[#3f3d5c]"><?= e($j['summary']) ?></p></div>
        <p class="text-[13px] uppercase tracking-[.14em] text-mist"><?= e($j['department']) ?> · <?= e($j['location']) ?> · <?= e($j['type']) ?></p>
        <span aria-hidden="true" class="text-raspberry transition-transform group-hover:translate-x-1">→</span>
      </a></li>
    <?php endforeach ?>
  </ul>
<?php }) ?>

<?= section(['tone' => 'paper'], '<div class="grid gap-12 lg:grid-cols-[1fr_1.3fr]"><div><p class="eyebrow mb-3">General application</p><h2 class="text-[2.2rem]">Tell us <em>who you are.</em></h2><p class="mt-4 text-[#3f3d5c]">We read every application ourselves. Choose the department that fits you best and attach your CV.</p></div>' . apply_form() . '</div>') ?>
