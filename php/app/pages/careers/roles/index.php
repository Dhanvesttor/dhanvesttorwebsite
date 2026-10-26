<?php
$meta = ['title' => 'Open Roles', 'description' => 'Current job openings at Dhanvesttor, Kolkata.', 'path' => '/careers/roles'];
$jobs = cms_jobs(true);
$n = count($jobs);
$depts = array_values(array_unique(array_column($jobs, 'department')));
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Careers', 'path' => '/careers'], ['name' => 'Open roles', 'path' => '/careers/roles']], 'eyebrow' => 'Open roles', 'title' => $n . ' ' . ($n === 1 ? 'role' : 'roles') . ', <em>one standard.</em>']) ?>

<?php foreach ($depts as $i => $d): ?>
  <?= section(['tone' => $i % 2 ? 'paper' : 'ivory', 'tight' => true], function () use ($d, $jobs) { ?>
    <h2 class="mb-6 text-[1.9rem]"><?= e($d) ?></h2>
    <ul class="grid gap-4 md:grid-cols-2">
      <?php foreach (array_filter($jobs, fn($j) => $j['department'] === $d) as $j): ?>
        <li><a href="/careers/roles/<?= e($j['slug']) ?>" class="block h-full rounded-2xl border border-line bg-white p-6 transition-transform hover:-translate-y-0.5">
          <p class="eyebrow"><?= e($j['type']) ?> · <?= e($j['location']) ?></p><h3 class="mt-2 text-[1.5rem]"><?= e($j['title']) ?></h3><p class="mt-2 text-[14.5px] text-[#3f3d5c]"><?= e($j['summary']) ?></p><p class="mt-4 text-[12.5px] text-mist">Posted <?= format_date($j['postedAt']) ?></p>
        </a></li>
      <?php endforeach ?>
    </ul>
  <?php }) ?>
<?php endforeach ?>

<?= cta(['title' => 'No fit yet? <em>Write to us anyway.</em>', 'primary' => ['label' => 'General application', 'href' => '/careers#roles']]) ?>
