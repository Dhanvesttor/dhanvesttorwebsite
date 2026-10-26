<?php
$meta = ['title' => 'Our Team: Leadership, Investment & Compliance', 'description' => "Meet Dhanvesttor's team: Founder & CEO Anooshka Soham Bathwal, Co-founder Soham Bathwal, Fund Manager Ishan Daga, Compliance Officer Neha Verma and our research desk.", 'path' => '/about/team'];

$groups = ['leadership' => 'Leadership', 'investment' => 'Investment team', 'compliance' => 'Compliance'];
$advisers = todo()['advisers'];
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'About', 'path' => '/about'], ['name' => 'Team', 'path' => '/about/team']], 'eyebrow' => 'Team', 'title' => 'Named people. <em>Reachable</em> people.', 'lede' => 'Every client knows who manages their money, who keeps it compliant, and who to call.']) ?>

<?php $i = 0; foreach ($groups as $key => $name): ?>
  <?= section(['tone' => $i++ % 2 ? 'paper' : 'ivory'], '<h2 class="mb-10 text-[2.2rem]">' . e($name) . '</h2>' . team_grid(array_values(array_filter(team(), fn($m) => $m['group'] === $key)), 3)) ?>
<?php endforeach ?>

<?php if ($advisers): ?>
  <?= section([], function () use ($advisers) { ?>
    <h2 class="mb-10 text-[2.2rem]">Board of Advisers</h2>
    <div class="grid gap-8 md:grid-cols-3"><?php foreach ($advisers as $a): ?><div class="border-t border-line pt-5"><h3 class="text-[1.4rem]"><?= e($a['name']) ?></h3><p class="text-[13px] uppercase tracking-[.14em] text-raspberry"><?= e($a['role']) ?></p><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($a['bio']) ?></p></div><?php endforeach ?></div>
  <?php }) ?>
<?php endif ?>

<?= cta(['title' => 'Want to work with <em>these people?</em>', 'primary' => ['label' => 'Careers', 'href' => '/careers'], 'secondary' => ['label' => 'Contact', 'href' => '/contact']]) ?>
