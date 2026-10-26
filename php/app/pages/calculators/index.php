<?php
$meta = ['title' => 'Financial Calculators: SIP, SWP, Retirement, Goal & More', 'description' => 'Free financial calculators from Dhanvesttor: SIP, step-up SIP, lumpsum, SWP, STP, goal planner, retirement, child education, CAGR, inflation and PMS fee illustration.', 'path' => '/calculators'];

$blurb = ['Grow' => 'See what investing regularly or all at once can become.', 'Plan' => 'Work back from a goal, a retirement, or an income you need.', 'Understand' => 'Decode the numbers behind returns, inflation and fees.'];
?>
<?= page_hero(['eyebrow' => 'Calculators', 'crumbs' => [['name' => 'Calculators', 'path' => '/calculators']], 'title' => 'Run the numbers <em>yourself.</em>',
    'lede' => 'Eleven calculators, no sign-up, no email required. Each one explains its assumptions in plain words, because a number without context is just a guess.']) ?>

<?php foreach (array_keys($blurb) as $gi => $g): ?>
  <?= section(['tone' => $gi % 2 ? 'paper' : 'ivory', 'tight' => true], function () use ($g, $gi, $blurb) { ?>
    <div class="grid gap-8 lg:grid-cols-[1fr_2.2fr]">
      <div><p class="eyebrow mb-2"><?= pad2($gi + 1) ?></p><h2 class="text-[2.4rem]"><?= e($g) ?></h2><p class="mt-3 text-[#3f3d5c]"><?= e($blurb[$g]) ?></p></div>
      <ul class="grid gap-3 sm:grid-cols-2">
        <?php foreach (array_filter(calculators_meta(), fn($c) => $c['group'] === $g) as $c): ?>
          <li><a href="/calculators/<?= e($c['slug']) ?>" class="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
            <span><span class="block font-display text-[1.4rem] leading-tight group-hover:text-indigo"><?= e($c['name']) ?></span><span class="mt-1 block text-[14px] text-[#3f3d5c]"><?= e($c['blurb']) ?></span></span>
            <span aria-hidden="true" class="text-raspberry transition-transform group-hover:translate-x-1">→</span>
          </a></li>
        <?php endforeach ?>
      </ul>
    </div>
  <?php }) ?>
<?php endforeach ?>
