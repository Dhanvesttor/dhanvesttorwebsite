<?php
// PHP unit tests without a framework: php php/tests/run.php  (exit code 1 on failure)
define('PUBLIC_DIR', dirname(__DIR__) . '/public');
putenv('DV_ENV=development');
require dirname(__DIR__) . '/app/bootstrap.php';

$failures = 0;
$count = 0;
function check(string $name, bool $ok, string $detail = ''): void
{
    global $failures, $count;
    $count++;
    if ($ok) return;
    $failures++;
    echo "FAIL  $name" . ($detail !== '' ? "  →  $detail" : '') . "\n";
}
function same(string $name, mixed $actual, mixed $expected): void { check($name, $actual === $expected, var_export($actual, true) . ' !== ' . var_export($expected, true)); }

/* ---- Routing ---- */
$pages = APP_DIR . '/pages';
same('home route', resolve_page('/'), [$pages . '/index.php', []]);
same('section index', resolve_page('/pms')[0], $pages . '/pms/index.php');
same('plain page', resolve_page('/pms/fees')[0], $pages . '/pms/fees.php');
same('dynamic slug', resolve_page('/insights/some-post'), [$pages . '/insights/_slug.php', ['slug' => 'some-post']]);
same('nested dynamic', resolve_page('/insights/category/markets'), [$pages . '/insights/category/_slug.php', ['slug' => 'markets']]);
same('exact file beats slug', resolve_page('/insights/newsletter')[0], $pages . '/insights/newsletter.php');
same('tag with ampersand', resolve_page('/insights/tag/women-&-money')[1], ['slug' => 'women-&-money']);
foreach (['/../app/config', '/insights/../../app', '/_404', '/pms/_slug', '/pms/index', '/.env', '/nope'] as $bad) same("blocked $bad", resolve_page($bad), null);

/* ---- Validation (same rules as src/lib/forms.ts) ---- */
$good = ['name' => 'Asha Roy', 'email' => 'asha@example.com', 'phone' => '9830000000', 'path' => 'mf', 'consent' => 'on'];
[, $err] = validate_form('enquiry', $good);
same('valid enquiry', $err, []);
[, $err] = validate_form('enquiry', ['name' => 'A', 'email' => 'nope', 'phone' => '1', 'path' => 'crypto']);
same('invalid enquiry fields', array_keys($err), ['name', 'email', 'phone', 'path', 'consent']);
same('consent message', $err['consent'][0], 'Please agree to be contacted.');
[, $err] = validate_form('enquiry', $good + ['message' => str_repeat('x', 2001)]);
same('message too long', array_keys($err), ['message']);
[, $err] = validate_form('enquiry', ['name' => 'आशा रॉय', 'phone' => '+91 98300 00000'] + $good);
same('unicode name and spaced phone', $err, []);
[, $err] = validate_form('clcb', ['name' => 'Asha', 'email' => 'a@b.co', 'phone' => '9830000000', 'city' => 'K', 'stage' => 'some', 'consent' => 'on']);
same('clcb city too short', array_keys($err), ['city']);
[, $err] = validate_form('newsletter', ['email' => 'a@b.co']);
same('newsletter needs only email', $err, []);
[, $err] = validate_form('apply', ['name' => 'Asha', 'email' => 'a@b.co', 'phone' => '9830000000', 'role' => 'RM', 'consent' => 'on']);
same('apply valid', $err, []);
same('no CV is fine', check_cv(null), [null, null]);
same('oversize CV', check_cv(['name' => 'cv.pdf', 'size' => 6 * 1024 * 1024, 'error' => UPLOAD_ERR_OK, 'tmp_name' => '']), [null, 'CV must be under 5 MB']);

/* ---- Markdown ---- */
$html = markdown("## Heading\n\nSome **bold** and *soft* text with a [link](/pms).\n\n- one\n- two\n\n1. first\n2. second\n\n> quoted\n\n| A | B |\n|---|---|\n| 1 | 2 |");
foreach (['<h2>Heading</h2>', '<strong>bold</strong>', '<em>soft</em>', '<a href="/pms">link</a>', "<ul>\n<li>one</li>", "<ol>\n<li>first</li>", '<blockquote>', '<th>A</th>', '<td>2</td>'] as $needle) check("markdown has $needle", str_contains($html, $needle), $html);
check('markdown escapes HTML', str_contains(markdown('<script>alert(1)</script>'), '&lt;script&gt;'));
check('markdown neutralises javascript: links', str_contains(markdown('[x](javascript:alert(1))'), 'href="#"'));
[$fm, $body] = parse_front_matter("---\ntitle: \"A 'quoted' title\"\ndate: 2026-07-30\ntags: [Markets, Long term]\n---\nBody");
same('front matter title', $fm['title'], "A 'quoted' title");
same('front matter tags', $fm['tags'], ['Markets', 'Long term']);
same('front matter body', trim($body), 'Body');

/* ---- Content and CMS (local seed) ---- */
$posts = cms_posts();
same('six seed posts', count($posts), 6);
check('posts newest first', $posts[0]['date'] >= $posts[5]['date']);
same('post date like JS toISOString', cms_post('what-a-bear-market-feels-like')['date'], '2026-07-30T00:00:00.000Z');
check('reading minutes at least 1', min(array_column($posts, 'readingMinutes')) >= 1);
same('category filter', count(cms_posts(['category' => 'pms'])), 1);
same('unknown post', cms_post('nope'), null);
check('upcoming events soonest first', ($e = cms_events(true)) && (count($e) < 2 || $e[0]['date'] <= $e[1]['date']));
same('pms faqs exist', count(cms_faqs('pms')) > 0, true);

/* ---- SEO ---- */
same('home title has no suffix', page_title(['title' => 'Dhanvesttor', 'path' => '/']), 'Dhanvesttor');
same('page title suffix', page_title(['title' => 'PMS', 'path' => '/pms']), 'PMS | Dhanvesttor');
$tags = meta_tags(['title' => 'PMS', 'description' => 'x', 'path' => '/pms']);
check('canonical', str_contains($tags, '<link rel="canonical" href="https://dhanvesttor.com/pms">'));
check('og image', str_contains($tags, 'og-default.png'));
check('noindex', str_contains(meta_tags(['title' => 'T', 'path' => '/t', 'noIndex' => true]), 'noindex, nofollow'));
check('json-ld escapes <', !str_contains(json_ld(['x' => '</script>']), '</script>"'));
same('breadcrumb items', breadcrumb_json_ld([['name' => 'Home', 'path' => '/']])['itemListElement'][0]['item'], 'https://dhanvesttor.com/');

/* ---- Formatting ---- */
same('date', format_date('2026-07-30T00:00:00.000Z'), '30 July 2026');
same('date-time, Indian time', format_datetime('2026-11-14T11:00:00+05:30'), '14 Nov 2026, 11:00 am');
same('September is "Sept" like en-IN', format_datetime('2026-09-05T16:00:00+05:30'), '5 Sept 2026, 4:00 pm');
same('performance cell', perf_cell(-3.93), '<span class="text-raspberry-deep">-3.93%</span>');
same('unsplash srcset', substr_count((string) img_srcset('https://images.unsplash.com/photo-1?auto=format&w=1200&q=75'), 'w='), 5);
same('no srcset for local images', img_srcset('/photos/a.jpg'), null);

echo $failures ? "\n$failures of $count checks failed\n" : "All $count checks passed\n";
exit($failures ? 1 : 0);
