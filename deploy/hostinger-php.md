# Deploying the PHP version to Hostinger

The `php/` folder is the whole website in plain PHP. It runs on **any** Hostinger plan, including Single/Premium shared hosting. No Node.js and no build step are needed on the server.

```
php/public/   → goes into public_html (the files visitors can reach)
php/app/      → code, content and settings (kept out of public_html)
```

## What the server needs

- PHP **8.1 or newer** (8.3 recommended). Hostinger: hPanel → Websites → *dhanvesttor.com* → Advanced → PHP Configuration.
- The usual extensions, which Hostinger enables by default: curl, mbstring, fileinfo, openssl.

## Upload

1. In hPanel open **File Manager** (or use FTP) and go to `domains/dhanvesttor.com/`.
2. Upload everything **inside** `php/public/` into `public_html/`, including the hidden `.htaccess` file (turn on "show hidden files").
3. Upload the `php/app/` folder next to `public_html` so you have `domains/dhanvesttor.com/app/`.
   If you can only upload inside `public_html`, put it at `public_html/app/` instead. It is then blocked from the web by its own `.htaccess`, and the site finds it automatically.
4. In `app/`, copy `config.example.php` to `config.php` and fill it in (see below).
5. Put the SEBI Disclosure Document at `public_html/documents/dhanvesttor-pms-disclosure-document.pdf`. The regulatory page links to it.
6. Install SSL (hPanel → Security → SSL). Then turn on **Force HTTPS** in hPanel, or uncomment the three HTTPS lines at the top of `public_html/.htaccess`.

## config.php

| Setting | What to put |
|---|---|
| `env` | `production` |
| `smtp.user` | The Google Workspace address that sends the emails, e.g. `website@dhanvesttor.com` |
| `smtp.pass` | An **App Password** for that account: Google Account → Security → 2-Step Verification → App passwords. Not the normal password. |
| `mail_from` | The same address as `smtp.user`, or an alias added to it in Gmail (Settings → Accounts → Send mail as) |
| `mail_to` / `hr_mail_to` | Where enquiries and job applications go |
| `wordpress_graphql_url` | Optional: `https://cms.dhanvesttor.com/graphql` once WordPress is set up (see `deploy/hostinger.md`). Empty = the posts, jobs and events in `app/content/data`. |
| `revalidate_secret` | Optional: the same secret as `DHANVESTTOR_REVALIDATE_SECRET` in WordPress, so new posts show immediately instead of within 5 minutes |

If sending fails, the visitor sees "Something went wrong… email ho@dhanvesttor.com" instead of a false thank-you, and the server's error log says why.

## Check after uploading

- The home page and a few inner pages load. `/robots.txt` allows crawling only on dhanvesttor.com itself, so copies on other domains stay out of Google.
- Send a test enquiry from `/contact` and confirm it arrives.
- `/about-us/`, `/blog/` and the other old WordPress addresses redirect to their new pages.

## Making changes

Run these on your computer from the repository folder, then upload the changed files.

| Change | Command |
|---|---|
| Run the site locally on http://localhost:8080 | `npm run php:serve` (needs PHP 8.1+) |
| Edited text in `src/content/*.ts` | `npm run php:content` (or edit `php/app/content/*.php` directly once Next.js is retired) |
| Added or changed Tailwind classes in a PHP or JS file | `npm run php:css` |
| Replaced a logo in `public/brand/` | `npm run build` then `npm run php:assets` |
| Posts, jobs, events, FAQs, press | Edit `php/app/content/data/` or use WordPress |

## Tests

```bash
php php/tests/run.php                 # routing, forms, Markdown, SEO, dates
npx vitest run tests/php-calc.test.ts # calculator maths = the Next.js site's, 2,200 random inputs
node php/tests/calc-parity.mjs        # PHP first render = live JavaScript, 3,300 inputs
node php/tests/parity.mjs             # every page vs the Next.js site (both running locally)
```
