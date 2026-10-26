<?php
$c = get_mf_category('index-etf');
$meta = ['title' => $c['seoTitle'], 'description' => $c['description'], 'path' => '/mutual-funds/index-etf'];
echo mf_category_page($c);
