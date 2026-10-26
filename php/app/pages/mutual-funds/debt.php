<?php
$c = get_mf_category('debt');
$meta = ['title' => $c['seoTitle'], 'description' => $c['description'], 'path' => '/mutual-funds/debt'];
echo mf_category_page($c);
