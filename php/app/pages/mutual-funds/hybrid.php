<?php
$c = get_mf_category('hybrid');
$meta = ['title' => $c['seoTitle'], 'description' => $c['description'], 'path' => '/mutual-funds/hybrid'];
echo mf_category_page($c);
