<?php
// Front controller: every request that isn't a real file comes here (see .htaccess).
define('PUBLIC_DIR', __DIR__);

// The app folder normally sits next to public_html; it may also be uploaded inside it (it is then blocked by its own .htaccess).
$app = is_dir(__DIR__ . '/../app') ? __DIR__ . '/../app' : __DIR__ . '/app';
require $app . '/bootstrap.php';

handle_request();
