<?php
$m = get_member($params['slug']);
if (!$m) not_found();
$meta = ['title' => $m['name'] . ', ' . $m['role'], 'description' => "{$m['name']} is {$m['role']} at Dhanvesttor. {$m['short']}", 'path' => '/about/team/' . $m['slug']];
?>
<?= json_ld(person_json_ld($m)) ?>
<section class="border-b border-line">
  <?= container(function () use ($m) { ?>
    <?= breadcrumbs([['name' => 'About', 'path' => '/about'], ['name' => 'Team', 'path' => '/about/team'], ['name' => $m['name'], 'path' => '/about/team/' . $m['slug']]], false, 'mb-10') ?>
    <div class="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <?= image_placeholder(['label' => $m['name'] . ', portrait', 'src' => $m['photo'] ?? null, 'alt' => $m['name'], 'ratio' => '4/5', 'priority' => true]) ?>
      <div>
        <?= hairline('mb-6') ?>
        <p class="eyebrow"><?= e($m['role']) ?></p>
        <h1 class="mt-3 text-[2.75rem] sm:text-[3.5rem]"><?= e($m['name']) ?></h1>
        <div class="prose-dv mt-8"><?php foreach ($m['bio'] as $p): ?><p><?= e($p) ?></p><?php endforeach ?></div>
        <?php if (!empty($m['education'])): ?><div class="mt-8"><p class="eyebrow mb-3">Education</p><ul class="grid gap-1.5 text-[15px]"><?php foreach ($m['education'] as $ed): ?><li><?= e($ed) ?></li><?php endforeach ?></ul></div><?php endif ?>
        <?php if (!empty($m['linkedin'])): ?><a href="<?= e($m['linkedin']) ?>" target="_blank" rel="noopener" class="mt-8 inline-block text-[14px] font-medium text-raspberry underline underline-offset-4">LinkedIn ↗</a><?php endif ?>
      </div>
    </div>
  <?php }, 'py-14 sm:py-20') ?>
</section>
<?= section(['tone' => 'paper'], '<h2 class="mb-10 text-[2rem]">The rest of the <em>team</em></h2>' . team_grid(array_values(array_filter(team(), fn($t) => $t['slug'] !== $m['slug'])), 4)) ?>
