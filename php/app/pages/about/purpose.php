<?php
$meta = ['title' => 'Our Purpose & Values', 'description' => "Dhanvesttor's mission, vision and values: a women-inclusive financial ecosystem where people understand and own their wealth.", 'path' => '/about/purpose'];

$commitments = [['Start with the person', 'Your goals, responsibilities and comfort with risk come before any product.'], ['Explain before we invest', "If we can't explain it in plain words, we won't recommend it."], ['Tell the truth about performance', "Including the months that went badly, in SEBI's format, against the benchmark."], ['Earn when you earn', 'Our PMS performance fee applies only above a hurdle and a high-water mark.'], ['Teach beyond our clients', 'Part of what we earn funds free financial education through CLCB.'], ['Invest in high principles', 'A strict negative list keeps poor governance and harmful practices out of the portfolio.']];
$fourDs = content('pms')['pms']['fourDs'];
?>
<?= page_hero(['tone' => 'indigo', 'crumbs' => [['name' => 'About', 'path' => '/about'], ['name' => 'Purpose & values', 'path' => '/about/purpose']], 'eyebrow' => 'Purpose', 'title' => 'Make financial independence <em>accessible</em> at every income level.',
    'lede' => 'For one woman, that means managing an investment portfolio. For another, it means understanding her savings, asking the right question, or making her first independent financial decision. Both are greater control over her future.']) ?>

<?= section([], '<div class="grid gap-12 md:grid-cols-2">'
    . '<div class="border-t-2 border-raspberry pt-6"><p class="eyebrow">Mission</p><p class="mt-4 font-display text-[1.75rem] font-light leading-snug">To establish a women-inclusive financial ecosystem that encourages people to attain their financial dreams.</p></div>'
    . '<div class="border-t-2 border-marigold pt-6"><p class="eyebrow">Vision</p><p class="mt-4 font-display text-[1.75rem] font-light leading-snug">Women in control of their financial futures, not only maximising their wealth but becoming genuinely finance-confident.</p></div>'
    . '</div>') ?>

<?= section(['tone' => 'paper'], function () use ($commitments) { ?>
  <?= section_head(['eyebrow' => 'What we will always do', 'title' => 'Our <em>commitments.</em>']) ?>
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    <?php foreach ($commitments as [$t, $b]): ?><div><h3 class="text-[1.45rem]"><?= e($t) ?></h3><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= section([], function () use ($fourDs) { ?>
  <?= section_head(['eyebrow' => "The 4 D's", 'title' => 'How we work with <em>every</em> client.']) ?>
  <div class="grid gap-8 md:grid-cols-4">
    <?php foreach ($fourDs as $i => $d): ?><div class="border-t border-line pt-5"><span class="font-display text-raspberry"><?= pad2($i + 1) ?></span><h3 class="mt-2 text-[1.6rem]"><?= e($d['title']) ?></h3><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($d['text']) ?></p></div><?php endforeach ?>
  </div>
<?php }) ?>

<?= cta(['title' => 'Purpose is what you <em>do</em>, not what you say.', 'primary' => ['label' => 'See CLCB in action', 'href' => '/clcb'], 'secondary' => ['label' => 'Meet the team', 'href' => '/about/team']]) ?>
