<?php
$c = get_mf_category('solution-oriented');
$meta = ['title' => $c['seoTitle'], 'description' => $c['description'], 'path' => '/mutual-funds/solution-oriented'];
echo mf_category_page($c);
