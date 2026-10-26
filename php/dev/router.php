<?php
// Router for PHP's built-in server (local development only), standing in for .htaccess:
//   DV_ENV=development php -c php/dev/php.ini -S localhost:8080 -t php/public php/dev/router.php
$file = __DIR__ . '/../public' . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($_SERVER['REQUEST_URI'] !== '/' && is_file($file)) return false;
require __DIR__ . '/../public/index.php';
