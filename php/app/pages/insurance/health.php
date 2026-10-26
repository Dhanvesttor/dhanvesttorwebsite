<?php
$d = content('protect')['insurancePages']['health'];
$meta = ['title' => $d['seoTitle'], 'description' => $d['description'], 'path' => '/insurance/health'];
$siblings = array_values(array_filter([['name' => 'Insurance overview', 'path' => '/insurance'], ['name' => 'Health', 'path' => '/insurance/health'], ['name' => 'Property & motor', 'path' => '/insurance/property-motor'], ['name' => 'Business & group', 'path' => '/insurance/business']], fn($s) => !str_ends_with($s['path'], '/health')));
echo protect_page(['parent' => ['name' => 'Insurance', 'path' => '/insurance'], 'slug' => 'health', 'path' => 'insurance', 'eyebrow' => 'Insurance', 'title' => $d['title'], 'lede' => $d['lede'],
    'items' => $d['covers'], 'itemsTitle' => 'Cover we help you <em>choose.</em>', 'side' => ['title' => 'Questions we make sure <em>you ask.</em>', 'list' => $d['ask']], 'siblings' => $siblings]);
