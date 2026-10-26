<?php
$c = get_mf_category('elss');
$meta = ['title' => $c['seoTitle'], 'description' => $c['description'], 'path' => '/mutual-funds/elss'];
echo mf_category_page($c);
