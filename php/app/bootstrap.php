<?php
declare(strict_types=1);

define('APP_DIR', __DIR__);
define('BASE_URL', 'https://dhanvesttor.com');

date_default_timezone_set('Asia/Kolkata');
if (function_exists('mb_internal_encoding')) mb_internal_encoding('UTF-8');

require APP_DIR . '/lib/helpers.php';
require APP_DIR . '/lib/seo.php';
require APP_DIR . '/lib/markdown.php';
require APP_DIR . '/lib/cms.php';
require APP_DIR . '/lib/components.php';
require APP_DIR . '/lib/sections.php';
require APP_DIR . '/lib/home.php';
require APP_DIR . '/lib/layout.php';
require APP_DIR . '/lib/forms.php';
require APP_DIR . '/lib/mail.php';
require APP_DIR . '/lib/calc.php';
require APP_DIR . '/lib/calculators.php';
require APP_DIR . '/lib/router.php';
