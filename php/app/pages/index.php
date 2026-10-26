<?php
$description = 'Dhanvesttor is a SEBI-registered portfolio manager in Kolkata. Personal portfolios through the FAITH Fund, curated mutual funds from 20+ fund houses, insurance, bonds, and CLCB financial education.';
$meta = ['title' => 'Dhanvesttor | Wealth you understand. Wealth you own.', 'description' => $description, 'path' => '/', 'scripts' => ['calculators'],
    'preloadImage' => ['src' => photos()['hero']['src'], 'sizes' => '(min-width:1024px) 48vw, 100vw']];

$posts = cms_posts(['limit' => 3]);
$events = cms_events(true);
$todo = todo();
$photos = photos();
?>
<?= json_ld(web_page_json_ld('Dhanvesttor', '/', $description)) ?>
<?= home_hero() ?>

<section aria-label="Why people trust us">
  <?= stat_band([
      $todo['clcbReachConfirmed'] || is_dev()
          ? ['value' => $todo['clcbReach'], 'label' => 'women and girls reached through our financial education', 'flag' => $todo['clcbReachConfirmed'] ? null : '⚠ confirm']
          : ['value' => 'Free', 'label' => 'financial education through CLCB, open to every woman'],
      ['value' => '20+', 'label' => 'partner mutual fund houses, one curated shortlist'],
      ['value' => '19 yrs', 'label' => 'fund manager experience; Bloomberg-ranked analyst'],
      ['value' => '2024', 'label' => 'SEBI portfolio manager registration, ' . site()['sebiReg']],
  ]) ?>
  <?= press_strip(null, 'bg-paper') ?>
</section>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'What we do', 'title' => 'One firm for the <em>whole</em> of your money.',
    'lede' => 'Some clients start with a ₹5,000 SIP. Some bring a family portfolio. Many start at a CLCB session with a question they were embarrassed to ask anywhere else. Every path is explained before anything is invested.'])
    . reveal(what_we_do())) ?>

<?= section(['tone' => 'indigo', 'class' => 'grain'], function () { ?>
  <?= section_head(['light' => true, 'align' => 'split', 'eyebrow' => 'The FAITH strategy', 'title' => 'Five questions every company <em>must answer.</em>',
      'lede' => 'Our flagship PMS strategy is flexi-cap: it can own large, mid or small companies. What it cannot do is skip a question. Every holding has to pass all five.']) ?>
  <?= reveal(faith_letters()) ?>
  <div class="mt-14 flex flex-wrap items-center gap-4 border-t border-ivory/15 pt-8">
    <?= button('See the FAITH Fund', ['href' => '/pms/faith-fund', 'variant' => 'raspberry']) ?>
    <?= button('Our philosophy &amp; process', ['href' => '/pms/philosophy', 'variant' => 'light']) ?>
    <span class="text-[13px] text-ivory/60">Benchmark: BSE 500 TRI · Minimum ₹50 lakh · Managed by Ishan Daga</span>
  </div>
<?php }) ?>

<?= section([], function () use ($photos) { ?>
  <div class="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
    <?= reveal(image_placeholder(['label' => $photos['founder']['label'], 'src' => $photos['founder']['src'] ?? null, 'alt' => $photos['founder']['alt'], 'ratio' => '4/5'])) ?>
    <?= reveal(function () { ?>
      <?= hairline('mb-6') ?>
      <p class="eyebrow mb-4">Why we exist</p>
      <blockquote class="font-display text-[1.9rem] font-light leading-snug text-ink sm:text-[2.4rem]">
        “I kept meeting women who ran households, teams and companies, and still left money to someone else. Not because they couldn&#39;t. Because no one had made room for their questions. <em>Dhanvesttor is that room.</em>”
      </blockquote>
      <p class="mt-6 text-[14px] text-mist"><span class="font-medium text-ink">Anooshka Soham Bathwal</span> · Founder &amp; CEO · M.Sc. (LSE)</p>
      <div class="mt-8 flex flex-wrap gap-3"><?= button('Our story', ['href' => '/about', 'variant' => 'ghost']) ?><?= button('Meet the team →', ['href' => '/about/team', 'variant' => 'link']) ?></div>
    <?php }, ['delay' => 0.1]) ?>
  </div>
<?php }) ?>

<?= section(['tone' => 'sand'], function () use ($photos, $events) { ?>
  <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
    <div>
      <?= hairline('mb-6') ?>
      <p class="eyebrow mb-3 text-terracotta">Co-Learning &amp; Community Building</p>
      <h2 class="text-[2.4rem] sm:text-[3rem]">The room where <em>no question</em> is too basic.</h2>
      <p class="mt-5 max-w-[50ch] text-lg text-[#3f3d5c]">CLCB is free and carries no sales pitch. Workshops, learning circles and masterclasses across Bengal and online, for anyone starting out and anyone who wants to go deeper.</p>
      <div class="mt-8 grid grid-cols-2 gap-4">
        <?= image_placeholder(['label' => $photos['clcbWorkshop']['label'], 'ratio' => '4/5']) ?>
        <?= image_placeholder(['label' => $photos['clcbCircle']['label'], 'ratio' => '4/5', 'class' => 'mt-10']) ?>
      </div>
    </div>
    <div>
      <div class="mb-6 flex items-end justify-between gap-4"><h3 class="text-[1.75rem]">Next sessions</h3><a href="/clcb/events" class="text-[13.5px] font-medium text-raspberry underline underline-offset-4">All events →</a></div>
      <?= event_list(array_slice($events, 0, 2)) ?>
      <div class="mt-8 flex flex-wrap gap-3"><?= button('Join the community', ['href' => '/clcb/join']) ?><?= button('What CLCB is', ['href' => '/clcb', 'variant' => 'ghost']) ?></div>
    </div>
  </div>
<?php }) ?>

<?= section([], section_head(['align' => 'split', 'eyebrow' => 'Calculators', 'title' => 'Run the numbers <em>yourself.</em>',
    'lede' => 'Twelve calculators, no sign-up. Start with a SIP: change the amount, the rate and the years, and see what patience does.'])
    . reveal(calculator('sip', true))) ?>

<?= section(['tone' => 'paper'], function () use ($posts) { ?>
  <div class="mb-12 flex flex-wrap items-end justify-between gap-6">
    <div><p class="eyebrow mb-3">Insights</p><h2 class="text-[2.4rem] sm:text-[3rem]">Read before you <em>invest.</em></h2></div>
    <?= button('All insights', ['href' => '/insights', 'variant' => 'ghost']) ?>
  </div>
  <?= post_grid($posts) ?>
<?php }) ?>

<?= contact_band(['paths' => ['pms', 'mf', 'clcb', 'insurance', 'bonds']]) ?>
