<?php
$d = content('protect')['bondPages']['structured-products'];
$meta = ['title' => $d['seoTitle'], 'description' => $d['description'], 'path' => '/bonds/structured-products'];
$siblings = array_values(array_filter([['name' => 'Fixed income overview', 'path' => '/bonds'], ['name' => 'Bonds & NCDs', 'path' => '/bonds/bonds-ncds'], ['name' => 'Corporate FDs', 'path' => '/bonds/corporate-fds'], ['name' => 'Structured products', 'path' => '/bonds/structured-products']], fn($s) => !str_ends_with($s['path'], '/structured-products')));
echo protect_page(['parent' => ['name' => 'Bonds & fixed income', 'path' => '/bonds'], 'slug' => 'structured-products', 'path' => 'bonds', 'eyebrow' => 'Fixed income', 'title' => $d['title'], 'lede' => $d['lede'],
    'items' => $d['items'], 'itemsTitle' => 'What you can <em>invest in.</em>', 'side' => ['title' => 'The risks, <em>plainly.</em>', 'list' => $d['risks']], 'siblings' => $siblings]);
