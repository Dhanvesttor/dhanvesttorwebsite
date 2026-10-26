<?php
$meta = ['title' => 'Insights: Markets, Mutual Funds, PMS & Women and Money', 'description' => 'Plain-language articles from Dhanvesttor on markets, mutual funds, portfolio management, women and money, and notes from our CLCB community.', 'path' => '/insights'];

$posts = cms_posts();
$categories = cms_categories();
?>
<?= page_hero(['compact' => true, 'crumbs' => [['name' => 'Insights', 'path' => '/insights']], 'eyebrow' => 'Insights', 'title' => 'Read before you <em>invest.</em>', 'lede' => 'Plain-language writing from our fund manager, founder and research desk. No tips, no noise.']) ?>
<section class="sticky top-[72px] z-30 border-b border-line bg-ivory/90 backdrop-blur-md lg:top-[88px]">
  <nav aria-label="Categories" class="mx-auto flex max-w-[1180px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
    <a href="/insights" aria-current="page" class="shrink-0 rounded-full bg-indigo px-4 py-1.5 text-[13px] font-medium text-ivory">All</a>
    <?php foreach ($categories as $c): ?><a href="/insights/category/<?= e($c['slug']) ?>" class="shrink-0 rounded-full border border-line px-4 py-1.5 text-[13px] hover:border-indigo hover:text-indigo"><?= e($c['name']) ?></a><?php endforeach ?>
  </nav>
</section>
<?= section([], post_grid($posts, true)) ?>
<?= section(['tone' => 'sand', 'tight' => true], '<div class="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center"><div><p class="eyebrow mb-2">Monthly letter</p><h2 class="text-[2rem]">One email a month. <em>Never a pitch.</em></h2></div>' . newsletter_form() . '</div>') ?>
