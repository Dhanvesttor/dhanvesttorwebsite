<?php
$meta = ['title' => 'Partner with CLCB: Institutions, NGOs & Speakers', 'description' => "Bring Dhanvesttor's free CLCB financial literacy sessions to your college, company, NGO or community. Speakers and partner organisations welcome.", 'path' => '/clcb/partners'];

$kinds = [['Colleges & universities', 'Campus sessions for final-year students and young alumni.'], ['Employers', "Lunch-and-learn sessions and women's network programmes for staff."], ['NGOs & self-help groups', 'Vernacular sessions on saving, safe banking, insurance and fraud.'], ['Government & institutions', 'Structured programmes with measurable participation and outcomes.']];
$partners = todo()['clcbPartners'];
?>
<?= page_hero(['crumbs' => [['name' => 'CLCB', 'path' => '/clcb'], ['name' => 'Partner with us', 'path' => '/clcb/partners']], 'eyebrow' => 'Partner with us', 'title' => 'Take financial education <em>beyond</em> investment circles.',
    'lede' => 'We work with colleges, employers, NGOs and government programmes to bring free, practical money sessions to the women they serve.']) ?>

<?= section([], function () use ($kinds, $partners) { ?>
  <?= section_head(['eyebrow' => 'Who we work with', 'title' => 'Four kinds of <em>partner.</em>']) ?>
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <?php foreach ($kinds as [$t, $b]): ?><div class="rounded-2xl border border-line bg-white p-6"><h3 class="text-[1.35rem]"><?= e($t) ?></h3><p class="mt-2 text-[15px] text-[#3f3d5c]"><?= e($b) ?></p></div><?php endforeach ?>
  </div>
  <?php if ($partners): ?><p class="mt-10 text-[15px] text-mist">Partners include <?= e(implode(', ', $partners)) ?>.</p><?php endif ?>
<?php }) ?>

<?= contact_band(['tone' => 'sand', 'defaultPath' => 'clcb', 'paths' => ['clcb'], 'heading' => 'Let&#39;s plan a <em>session.</em>', 'lede' => 'Tell us about your organisation, the audience, and the city. Sessions are free.']) ?>
