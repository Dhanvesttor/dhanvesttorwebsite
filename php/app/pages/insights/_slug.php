<?php
$post = cms_post($params['slug']);
if (!$post) not_found();
$meta = ['title' => $post['seo']['title'] ? preg_replace('/\s*\|\s*Dhanvesttor$/', '', $post['seo']['title']) : $post['title'], 'description' => $post['seo']['description'] ?? $post['excerpt'],
    'path' => '/insights/' . $post['slug'], 'image' => $post['cover'] ?? null, 'type' => 'article', 'publishedTime' => $post['date'], 'authors' => [$post['author']['name']]];

$related = array_slice(array_values(array_filter(cms_posts(['category' => $post['category']['slug']]), fn($p) => $p['slug'] !== $post['slug'])), 0, 3);
$more = $related ?: array_slice(array_values(array_filter(cms_posts(['limit' => 4]), fn($p) => $p['slug'] !== $post['slug'])), 0, 3);
$tagUrl = fn(string $t) => '/insights/tag/' . rawurlencode(strtolower(preg_replace('/\s+/', '-', $t)));
?>
<?= json_ld(article_json_ld($post)) ?>
<article>
  <header class="border-b border-line">
    <?= container(function () use ($post) { ?>
      <?= breadcrumbs([['name' => 'Insights', 'path' => '/insights'], ['name' => $post['category']['name'], 'path' => '/insights/category/' . $post['category']['slug']], ['name' => $post['title'], 'path' => '/insights/' . $post['slug']]], false, 'mb-8') ?>
      <div class="max-w-[860px]">
        <?= hairline('mb-6') ?>
        <a href="/insights/category/<?= e($post['category']['slug']) ?>" class="eyebrow"><?= e($post['category']['name']) ?></a>
        <h1 class="mt-4 text-[2.5rem] leading-[1.04] sm:text-[3.5rem]"><?= e($post['title']) ?></h1>
        <p class="mt-6 text-[1.2rem] text-[#3f3d5c]"><?= e($post['excerpt']) ?></p>
        <p class="mt-8 text-[13.5px] text-mist">
          By <a href="/insights/author/<?= e($post['author']['slug']) ?>" class="font-medium text-ink hover:text-raspberry"><?= e($post['author']['name']) ?></a> · <time datetime="<?= e($post['date']) ?>"><?= format_date($post['date']) ?></time> · <?= $post['readingMinutes'] ?> min read
        </p>
      </div>
    <?php }, 'py-14 sm:py-20') ?>
  </header>
  <?php if (!empty($post['cover'])): ?><?= container(image_placeholder(['label' => $post['coverAlt'] ?? $post['title'], 'src' => $post['cover'], 'alt' => $post['coverAlt'] ?? '', 'ratio' => '21/9', 'priority' => true, 'sizes' => '(min-width: 1180px) 1180px, 100vw']), 'pt-12') ?><?php endif ?>
  <?= container(function () use ($post, $tagUrl) { ?>
    <div class="grid gap-12 lg:grid-cols-[1fr_260px]">
      <?= prose($post['html'], 'mx-auto lg:mx-0') ?>
      <aside class="self-start lg:sticky lg:top-28">
        <div class="rounded-2xl border border-line bg-white p-5">
          <p class="eyebrow mb-2">Written by</p>
          <p class="font-display text-[1.25rem]"><?= e($post['author']['name']) ?></p>
          <?php if ($post['author']['role']): ?><p class="text-[13px] text-mist"><?= e($post['author']['role']) ?></p><?php endif ?>
          <p class="mt-3 text-[13.5px] text-[#3f3d5c]"><?= e($post['author']['bio']) ?></p>
        </div>
        <?php if ($post['tags']): ?>
          <ul class="mt-5 flex flex-wrap gap-2"><?php foreach ($post['tags'] as $t): ?><li><a href="<?= e($tagUrl($t)) ?>" class="inline-block rounded-full border border-line px-3 py-1 text-[12.5px] hover:border-indigo"><?= e($t) ?></a></li><?php endforeach ?></ul>
        <?php endif ?>
      </aside>
    </div>
    <p class="mt-14 max-w-[68ch] border-t border-line pt-6 text-[12.5px] text-mist"><?= e(disclaimers()['general']) ?></p>
  <?php }, 'py-14') ?>
</article>
<?php if ($more): ?><?= section(['tone' => 'paper'], '<h2 class="mb-10 text-[2.2rem]">Keep <em>reading.</em></h2>' . post_grid($more)) ?><?php endif ?>
<?= cta(['title' => 'Questions after reading? <em>Ask a person.</em>', 'primary' => ['label' => 'Start a conversation', 'href' => '/contact'], 'secondary' => ['label' => 'Join CLCB', 'href' => '/clcb/join']]) ?>
