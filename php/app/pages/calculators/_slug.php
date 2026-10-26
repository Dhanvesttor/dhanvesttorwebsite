<?php
$c = get_calc($params['slug']);
if (!$c) not_found();
$meta = ['title' => $c['title'] . ' | Free Online Calculator', 'description' => $c['description'], 'path' => '/calculators/' . $c['slug'], 'scripts' => ['calculators']];

$related = array_slice(array_values(array_filter(calculators_meta(), fn($x) => $x['slug'] !== $c['slug'] && $x['group'] === $c['group'])), 0, 4);
?>
<?= json_ld(['@context' => 'https://schema.org', '@type' => 'WebApplication', 'name' => $c['title'] . ' by Dhanvesttor', 'applicationCategory' => 'FinanceApplication', 'operatingSystem' => 'Any', 'offers' => ['@type' => 'Offer', 'price' => '0', 'priceCurrency' => 'INR'], 'url' => 'https://dhanvesttor.com/calculators/' . $c['slug']]) ?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Calculators', 'path' => '/calculators'], ['name' => $c['name'], 'path' => '/calculators/' . $c['slug']]], 'eyebrow' => 'Calculator · ' . $c['group'], 'title' => e($c['title']), 'lede' => e($c['blurb'])]) ?>
<?= section(['tone' => 'paper'], calculator($c['slug'])) ?>

<?= section([], function () use ($c, $related) { ?>
  <div class="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
    <div>
      <p class="eyebrow mb-3">How it works</p>
      <div class="prose-dv"><?php foreach ($c['explainer'] as $p): ?><p><?= e($p) ?></p><?php endforeach ?></div>
      <?php if ($c['faqs']): ?><div class="mt-12"><h2 class="mb-6 text-[2rem]">Questions</h2><?= faq_list($c['faqs']) ?></div><?php endif ?>
    </div>
    <aside class="self-start rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-28">
      <p class="eyebrow mb-4">Related calculators</p>
      <ul class="grid gap-2">
        <?php foreach ($related as $r): ?><li><a href="/calculators/<?= e($r['slug']) ?>" class="block rounded-lg px-3 py-2 hover:bg-paper"><span class="font-medium"><?= e($r['name']) ?></span><span class="block text-[13px] text-mist"><?= e($r['blurb']) ?></span></a></li><?php endforeach ?>
      </ul>
      <a href="/calculators" class="mt-4 inline-block text-[13.5px] font-medium text-raspberry underline underline-offset-4">All calculators →</a>
    </aside>
  </div>
<?php }) ?>

<?= cta(['title' => 'A calculator gives a number. <em>A plan</em> gives a path.', 'primary' => ['label' => 'Build a plan with us', 'href' => '/contact']]) ?>
