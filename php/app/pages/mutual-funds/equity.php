<?php
$c = get_mf_category('equity');
$meta = ['title' => $c['seoTitle'], 'description' => $c['description'], 'path' => '/mutual-funds/equity'];
echo mf_category_page($c);
