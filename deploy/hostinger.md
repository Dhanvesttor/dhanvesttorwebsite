# Deploying to Hostinger

The website is a Next.js app (it needs Node.js to run forms, the blog refresh and the calculators' pages). WordPress stays as the editing tool for the team, on a subdomain.

```
dhanvesttor.com        → Next.js website (this repository)
cms.dhanvesttor.com    → WordPress, used only by the team to write posts, jobs, events, FAQs
login.dhanvesttor.com  → unchanged (Wealth Elite investor portal)
```

## Which Hostinger plan

| Plan | Works? | Notes |
|---|---|---|
| **VPS (KVM 1 or above)** | Yes, recommended | Full control. Instructions below. |
| Business / Cloud web hosting with **Node.js apps** in hPanel | Yes, if your plan shows "Node.js" under Websites | Upload the release folder, set the start file to `server.js`, add the environment variables in hPanel. |
| Single / Premium shared hosting (PHP only) | No | Cannot run the website's server. Keep WordPress there and put the website on a VPS. |

## One-time VPS setup

```bash
# As root on a fresh Ubuntu 24.04 VPS
apt update && apt install -y nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && apt install -y nodejs
npm i -g pm2
mkdir -p /var/www/dhanvesttor/{releases,shared}
cp /path/to/.env /var/www/dhanvesttor/shared/.env      # fill in from .env.example
cp deploy/nginx.conf /etc/nginx/sites-available/dhanvesttor.com
ln -s /etc/nginx/sites-available/dhanvesttor.com /etc/nginx/sites-enabled/
certbot --nginx -d dhanvesttor.com -d www.dhanvesttor.com
nginx -t && systemctl reload nginx
pm2 startup && pm2 save
```

Then add the repository secrets listed at the top of `.github/workflows/deploy.yml`. Every push to `main` builds, tests and deploys. Old releases are pruned automatically; to roll back, point `current` at a previous folder in `releases/` and run `pm2 reload dhanvesttor-web`.

## Manual deploy (no GitHub)

```bash
npm ci && npm test && npm run build
rm -rf release && mkdir release
cp -r .next/standalone/. release/ && mkdir -p release/.next && cp -r .next/static release/.next/
cp -r public content ecosystem.config.cjs release/
rsync -az release/ user@VPS:/var/www/dhanvesttor/releases/$(date +%Y%m%d%H%M)/
```

## Environment variables

See `.env.example`. The site works with none of them set: it uses the seed content in `/content` and logs form submissions instead of emailing them. In production set at least `WORDPRESS_GRAPHQL_URL`, `REVALIDATE_SECRET`, and the `SMTP_*` and `MAIL_TO` values.

## WordPress side

1. Move WordPress to `cms.dhanvesttor.com` (Hostinger: Websites → Add subdomain → install or migrate WordPress).
2. Install **WPGraphQL** from the plugin directory.
3. Upload `wordpress/dhanvesttor-headless` as a plugin and activate it.
4. In `wp-config.php` add:
   ```php
   define('DHANVESTTOR_SITE_URL', 'https://dhanvesttor.com');
   define('DHANVESTTOR_REVALIDATE_SECRET', 'same value as REVALIDATE_SECRET');
   ```
5. Settings → Reading → tick "Discourage search engines" on the CMS subdomain, so only the main site is indexed.
6. Create categories with these slugs so posts land in the right section: `markets`, `pms`, `mutual-funds`, `women-and-money`, `clcb`, `media`.

## Redirects from the old site

`deploy/nginx.conf` maps the old WordPress URLs (about-us, services, blog posts) to their new homes, so existing links and search rankings carry over.
