<?php
$meta = ['title' => 'Life at Dhanvesttor', 'description' => 'What it is like to work at Dhanvesttor: values, how we work, learning and growth at a women-first wealth firm in Kolkata.', 'path' => '/careers/life-at-dhanvesttor'];

$values = [['Empathy', 'Listen first. To clients, and to each other.'], ['Empower', 'Give people the knowledge to decide, not just the decision.'], ['Engage', 'Show up, follow up, and do what you said, when you said.'], ['Excellence', 'Get the detail right. In finance, small errors are not small.']];
$perks = [['Kolkata, Elgin', 'A bright office in central Kolkata, with travel across Bengal for CLCB and client work.'], ['Growth', 'We are expanding into North and West India. Early colleagues grow with the firm.'], ['Wellbeing', "We prioritise wellbeing, belonging and respect. We'd rather you were rested than heroic."]];
?>
<?= page_hero(['crumbs' => [['name' => 'Careers', 'path' => '/careers'], ['name' => 'Life at Dhanvesttor', 'path' => '/careers/life-at-dhanvesttor']], 'eyebrow' => 'Life at Dhanvesttor', 'title' => 'Diverse, inclusive, <em>accountable.</em>',
    'lede' => 'We hire people who are kind, curious and precise. We look after each other, we tell the truth to clients, and we hold ourselves to the standard we promise them.']) ?>

<?= section([], function () use ($values) { ?>
  <?= section_head(['eyebrow' => 'Our values', 'title' => 'The four E&#39;s, <em>at work.</em>']) ?>
  <div class="grid gap-8 md:grid-cols-4">
    <?php foreach ($values as [$t, $b]): ?><div class="border-t-2 border-raspberry pt-5"><h3 class="text-[1.6rem]"><?= e($t) ?></h3><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= section(['tone' => 'paper'], split_feature(['eyebrow' => 'Learning', 'title' => 'A structured start, <em>then real responsibility.</em>', 'image' => photos()['team']['label'],
    'lede' => 'Every new colleague goes through our training programme: client conduct, products, compliance and role plays with senior colleagues. Then you get real work, with someone senior beside you.'])) ?>

<?= section([], function () use ($perks) { ?>
  <div class="grid gap-8 md:grid-cols-3">
    <?php foreach ($perks as [$t, $b]): ?><div class="rounded-2xl border border-line bg-white p-6"><h3 class="text-[1.35rem]"><?= e($t) ?></h3><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= cta(['title' => 'Sound like <em>your</em> kind of place?', 'primary' => ['label' => 'See open roles', 'href' => '/careers/roles']]) ?>
