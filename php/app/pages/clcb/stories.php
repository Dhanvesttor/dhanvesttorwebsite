<?php
$meta = ['title' => 'CLCB Stories & Impact', 'description' => "What changes when women learn the language of money: stories and impact from Dhanvesttor's CLCB financial education programme.", 'path' => '/clcb/stories'];

$todo = todo();
$prod = !is_dev();
$stats = [];
if ($todo['clcbReachConfirmed'] || !$prod) $stats[] = ['value' => $todo['clcbReach'], 'label' => 'women and girls reached', 'flag' => $todo['clcbReachConfirmed'] ? null : '⚠ confirm'];
$stats[] = ['value' => $todo['clcbWorkshops'] ?? '—', 'label' => 'sessions held', 'flag' => $todo['clcbWorkshops'] || $prod ? null : '⚠ add'];
$stats[] = ['value' => $todo['clcbCities'] ?? '—', 'label' => 'cities and towns', 'flag' => $todo['clcbCities'] || $prod ? null : '⚠ add'];
$stats[] = ['value' => '2 lakh', 'label' => 'our next target, in 12 to 18 months'];
$stories = content('clcb')['stories'];
?>
<?= page_hero(['crumbs' => [['name' => 'CLCB', 'path' => '/clcb'], ['name' => 'Stories & impact', 'path' => '/clcb/stories']], 'eyebrow' => 'Stories & impact', 'title' => 'The milestone that matters most is when <em>learning becomes action.</em>',
    'lede' => 'A woman starts asking questions, understands her options, and makes a financial decision for herself. Here are a few of those moments.']) ?>

<?= section([], function () use ($stories) { ?>
  <div class="grid gap-8 md:grid-cols-3">
    <?php foreach ($stories as $s): ?>
      <figure class="flex flex-col justify-between rounded-2xl border border-line bg-white p-7">
        <blockquote class="font-display text-[1.4rem] font-light leading-snug">“<?= e($s['quote']) ?>”</blockquote>
        <figcaption class="mt-6 text-[13.5px] text-mist"><?= e($s['name']) ?> · <?= e($s['place']) ?></figcaption>
      </figure>
    <?php endforeach ?>
  </div>
  <p class="mt-6 text-[12.5px] text-mist">Shared with permission; names withheld at participants&#39; request.</p>
<?php }) ?>

<?= section(['tone' => 'paper'], section_head(['align' => 'split', 'eyebrow' => 'Impact', 'title' => 'Measuring what <em>changes.</em>',
    'lede' => 'We track participation, what people learn, and what they do afterwards: an account opened, a statement read, a first SIP, a policy checked. We will publish the full impact report here.'])
    . stat_band($stats, 'ivory')) ?>

<?= cta(['title' => 'Write the <em>next</em> story.', 'primary' => ['label' => 'Join the community', 'href' => '/clcb/join']]) ?>
