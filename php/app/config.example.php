<?php
// Copy this file to config.php (same folder) and fill in the values. config.php is never committed.
return [
    // 'production' on the live server. 'development' shows "⚠ confirm" flags on unconfirmed facts
    // and logs form emails instead of sending them.
    'env' => 'production',

    // Headless WordPress (leave empty to use the seed content in app/content/data).
    'wordpress_graphql_url' => '',
    // Secret shared with the WordPress plugin (DHANVESTTOR_REVALIDATE_SECRET in wp-config.php).
    'revalidate_secret' => '',

    // Outgoing mail. For Google Workspace: create an App Password for the sending account
    // (Google Account → Security → 2-Step Verification → App passwords) and put it in 'pass'.
    // 'from' must be that account or an alias added to it in Gmail settings.
    'smtp' => [
        'host' => 'smtp.gmail.com',
        'port' => 587,
        'secure' => 'tls', // 'tls' for 587, 'ssl' for 465
        'user' => '',
        'pass' => '',
    ],
    'mail_from' => 'no-reply@dhanvesttor.com',
    'mail_from_name' => 'Dhanvesttor Website',
    'mail_to' => 'ho@dhanvesttor.com',
    'hr_mail_to' => 'ho@dhanvesttor.com',
];
