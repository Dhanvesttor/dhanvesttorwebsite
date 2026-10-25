<?php
/**
 * Plugin Name: Dhanvesttor Headless
 * Description: Content types, HR role, GraphQL fields and on-publish revalidation for the Dhanvesttor Next.js website. Requires WPGraphQL.
 * Version: 1.0.0
 * Author: Dhanvesttor
 * Requires PHP: 8.0
 */

if (!defined('ABSPATH')) exit;

/* ------------------------------------------------------------------
 * 1. Content types
 * ------------------------------------------------------------------ */
add_action('init', function () {
    $common = ['public' => true, 'show_in_rest' => true, 'show_in_graphql' => true, 'has_archive' => false, 'menu_position' => 21];

    register_post_type('job', $common + [
        'labels' => ['name' => 'Careers', 'singular_name' => 'Job', 'add_new_item' => 'Add new job opening'],
        'menu_icon' => 'dashicons-businessperson',
        'supports' => ['title', 'editor', 'revisions'],
        'graphql_single_name' => 'job', 'graphql_plural_name' => 'jobs',
        'capability_type' => ['job', 'jobs'], 'map_meta_cap' => true,
        'rewrite' => ['slug' => 'careers/roles'],
    ]);
    register_post_type('event', $common + [
        'labels' => ['name' => 'CLCB Events', 'singular_name' => 'Event', 'add_new_item' => 'Add new CLCB event'],
        'menu_icon' => 'dashicons-groups', 'supports' => ['title', 'revisions'],
        'graphql_single_name' => 'event', 'graphql_plural_name' => 'events',
    ]);
    register_post_type('press_item', $common + [
        'labels' => ['name' => 'Press', 'singular_name' => 'Press item', 'add_new_item' => 'Add press coverage'],
        'menu_icon' => 'dashicons-megaphone', 'supports' => ['title'],
        'graphql_single_name' => 'pressItem', 'graphql_plural_name' => 'pressItems',
    ]);
    register_post_type('faq', $common + [
        'labels' => ['name' => 'FAQs', 'singular_name' => 'FAQ', 'add_new_item' => 'Add FAQ (title = question, content = answer)'],
        'menu_icon' => 'dashicons-editor-help', 'supports' => ['title', 'editor'],
        'graphql_single_name' => 'faq', 'graphql_plural_name' => 'faqs',
    ]);

    // Meta fields (stored as post meta; edited in the meta boxes below)
    $metas = [
        'job'        => ['department', 'location', 'job_type', 'summary', 'apply_email', 'is_open'],
        'event'      => ['event_date', 'city', 'mode', 'summary', 'register_url'],
        'press_item' => ['outlet', 'url', 'published_on'],
        'faq'        => ['faq_group'],
    ];
    foreach ($metas as $type => $keys) {
        foreach ($keys as $k) register_post_meta($type, $k, ['single' => true, 'type' => 'string', 'show_in_rest' => true]);
    }
});

/* ------------------------------------------------------------------
 * 2. HR role: can manage job openings only
 * ------------------------------------------------------------------ */
register_activation_hook(__FILE__, function () {
    $caps = ['read' => true, 'upload_files' => true];
    foreach (['edit_jobs', 'edit_others_jobs', 'publish_jobs', 'read_private_jobs', 'delete_jobs', 'delete_published_jobs', 'edit_published_jobs', 'delete_others_jobs'] as $c) $caps[$c] = true;
    add_role('dhanvesttor_hr', 'HR (Careers only)', $caps);
    foreach (['administrator', 'editor'] as $r) {
        $role = get_role($r);
        if ($role) foreach (array_keys($caps) as $c) $role->add_cap($c);
    }
    flush_rewrite_rules();
});

/* ------------------------------------------------------------------
 * 3. Simple meta boxes so editors never touch custom fields
 * ------------------------------------------------------------------ */
$dv_fields = [
    'job' => [
        'department'  => ['Department', 'select', ['Sales', 'Finance', 'Marketing', 'Accounts', 'HR & Admin', 'CLCB', 'Compliance', 'Other']],
        'location'    => ['Location', 'text', 'Kolkata'],
        'job_type'    => ['Type', 'select', ['Full-time', 'Part-time', 'Internship', 'Contract']],
        'summary'     => ['One-line summary (shown in listings)', 'text', ''],
        'apply_email' => ['Applications go to', 'email', 'ho@dhanvesttor.com'],
        'is_open'     => ['Accepting applications', 'select', ['yes', 'no']],
    ],
    'event' => [
        'event_date'   => ['Date & time', 'datetime-local', ''],
        'city'         => ['City (or "Online")', 'text', 'Kolkata'],
        'mode'         => ['Mode', 'select', ['In person', 'Online', 'Hybrid']],
        'summary'      => ['Short description', 'textarea', ''],
        'register_url' => ['Registration link (leave empty to use the CLCB join form)', 'url', ''],
    ],
    'press_item' => [
        'outlet'       => ['Publication', 'text', ''],
        'url'          => ['Article link', 'url', ''],
        'published_on' => ['Published on', 'date', ''],
    ],
    'faq' => [
        'faq_group' => ['Show on', 'select', ['pms', 'mf', 'clcb', 'general']],
    ],
];

add_action('add_meta_boxes', function () use ($dv_fields) {
    foreach ($dv_fields as $type => $fields) {
        add_meta_box("dv_{$type}_details", 'Details', function ($post) use ($fields) {
            wp_nonce_field('dv_meta', 'dv_meta_nonce');
            echo '<table class="form-table">';
            foreach ($fields as $key => [$label, $kind, $default]) {
                $val = get_post_meta($post->ID, $key, true);
                if ($val === '' && !is_array($default)) $val = $default;
                echo '<tr><th><label for="dv_' . esc_attr($key) . '">' . esc_html($label) . '</label></th><td>';
                if ($kind === 'select') {
                    echo '<select name="dv[' . esc_attr($key) . ']" id="dv_' . esc_attr($key) . '">';
                    foreach ($default as $opt) echo '<option value="' . esc_attr($opt) . '"' . selected($val, $opt, false) . '>' . esc_html($opt) . '</option>';
                    echo '</select>';
                } elseif ($kind === 'textarea') {
                    echo '<textarea class="large-text" rows="3" name="dv[' . esc_attr($key) . ']" id="dv_' . esc_attr($key) . '">' . esc_textarea($val) . '</textarea>';
                } else {
                    echo '<input class="regular-text" type="' . esc_attr($kind) . '" name="dv[' . esc_attr($key) . ']" id="dv_' . esc_attr($key) . '" value="' . esc_attr($val) . '">';
                }
                echo '</td></tr>';
            }
            echo '</table>';
        }, $type, 'normal', 'high');
    }
});

add_action('save_post', function ($post_id) use ($dv_fields) {
    if (!isset($_POST['dv_meta_nonce']) || !wp_verify_nonce($_POST['dv_meta_nonce'], 'dv_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    $type = get_post_type($post_id);
    if (empty($dv_fields[$type]) || empty($_POST['dv'])) return;
    foreach (array_keys($dv_fields[$type]) as $key) {
        if (isset($_POST['dv'][$key])) update_post_meta($post_id, $key, sanitize_text_field(wp_unslash($_POST['dv'][$key])));
    }
});

/* ------------------------------------------------------------------
 * 4. GraphQL fields (names match src/lib/cms/wordpress.ts)
 * ------------------------------------------------------------------ */
add_action('graphql_register_types', function () {
    $m = fn($post, $k) => (string) get_post_meta($post->databaseId, $k, true);

    register_graphql_object_type('DvJobMeta', ['fields' => [
        'department' => ['type' => 'String'], 'location' => ['type' => 'String'], 'jobType' => ['type' => 'String'],
        'summary' => ['type' => 'String'], 'applyEmail' => ['type' => 'String'], 'isOpen' => ['type' => 'Boolean'],
    ]]);
    register_graphql_field('Job', 'jobMeta', ['type' => 'DvJobMeta', 'resolve' => fn($p) => [
        'department' => $m($p, 'department'), 'location' => $m($p, 'location') ?: 'Kolkata', 'jobType' => $m($p, 'job_type') ?: 'Full-time',
        'summary' => $m($p, 'summary'), 'applyEmail' => $m($p, 'apply_email') ?: 'ho@dhanvesttor.com', 'isOpen' => $m($p, 'is_open') !== 'no',
    ]]);

    register_graphql_object_type('DvEventMeta', ['fields' => [
        'eventDate' => ['type' => 'String'], 'city' => ['type' => 'String'], 'mode' => ['type' => 'String'], 'summary' => ['type' => 'String'], 'registerUrl' => ['type' => 'String'],
    ]]);
    register_graphql_field('Event', 'eventMeta', ['type' => 'DvEventMeta', 'resolve' => function ($p) use ($m) {
        $d = $m($p, 'event_date');
        // Stored as local Kolkata time from a datetime-local input; emit ISO with offset.
        $iso = $d ? (new DateTime($d, new DateTimeZone('Asia/Kolkata')))->format(DateTime::ATOM) : '';
        return ['eventDate' => $iso, 'city' => $m($p, 'city'), 'mode' => $m($p, 'mode') ?: 'In person', 'summary' => $m($p, 'summary'), 'registerUrl' => $m($p, 'register_url') ?: null];
    }]);

    register_graphql_object_type('DvPressMeta', ['fields' => ['outlet' => ['type' => 'String'], 'url' => ['type' => 'String'], 'publishedOn' => ['type' => 'String']]]);
    register_graphql_field('PressItem', 'pressMeta', ['type' => 'DvPressMeta', 'resolve' => fn($p) => ['outlet' => $m($p, 'outlet'), 'url' => $m($p, 'url'), 'publishedOn' => $m($p, 'published_on')]]);

    register_graphql_object_type('DvFaqMeta', ['fields' => ['faqGroup' => ['type' => 'String']]]);
    register_graphql_field('Faq', 'faqMeta', ['type' => 'DvFaqMeta', 'resolve' => fn($p) => ['faqGroup' => $m($p, 'faq_group') ?: 'general']]);

    // SEO that works with Yoast, Rank Math, or neither.
    register_graphql_object_type('DvSeo', ['fields' => ['title' => ['type' => 'String'], 'metaDesc' => ['type' => 'String']]]);
    register_graphql_field('Post', 'dvSeo', ['type' => 'DvSeo', 'resolve' => function ($p) {
        $id = $p->databaseId;
        $title = get_post_meta($id, '_yoast_wpseo_title', true) ?: get_post_meta($id, 'rank_math_title', true);
        $desc  = get_post_meta($id, '_yoast_wpseo_metadesc', true) ?: get_post_meta($id, 'rank_math_description', true);
        if ($title && function_exists('wpseo_replace_vars')) $title = wpseo_replace_vars($title, get_post($id));
        return ['title' => $title ?: null, 'metaDesc' => $desc ?: wp_strip_all_tags(get_the_excerpt($id))];
    }]);
});

/* ------------------------------------------------------------------
 * 5. Tell the website to refresh when content is published or changed
 * ------------------------------------------------------------------ */
add_action('transition_post_status', function ($new, $old, $post) {
    if ($new !== 'publish' && $old !== 'publish') return;
    $map = ['post' => 'post', 'job' => 'job', 'event' => 'event', 'press_item' => 'press', 'faq' => 'faq'];
    if (empty($map[$post->post_type])) return;
    $base = defined('DHANVESTTOR_SITE_URL') ? DHANVESTTOR_SITE_URL : getenv('DHANVESTTOR_SITE_URL');
    $secret = defined('DHANVESTTOR_REVALIDATE_SECRET') ? DHANVESTTOR_REVALIDATE_SECRET : getenv('DHANVESTTOR_REVALIDATE_SECRET');
    if (!$base || !$secret) return;
    wp_remote_post(trailingslashit($base) . 'api/revalidate?secret=' . rawurlencode($secret) . '&type=' . $map[$post->post_type], ['timeout' => 5, 'blocking' => false]);
}, 10, 3);

/* ------------------------------------------------------------------
 * 6. "View on site" links point at the Next.js site, not WordPress
 * ------------------------------------------------------------------ */
add_filter('post_type_link', 'dv_frontend_link', 10, 2);
add_filter('post_link', 'dv_frontend_link', 10, 2);
function dv_frontend_link($url, $post) {
    $base = defined('DHANVESTTOR_SITE_URL') ? DHANVESTTOR_SITE_URL : 'https://dhanvesttor.com';
    $paths = ['post' => 'insights', 'job' => 'careers/roles'];
    return isset($paths[$post->post_type]) ? trailingslashit($base) . $paths[$post->post_type] . '/' . $post->post_name : $url;
}
