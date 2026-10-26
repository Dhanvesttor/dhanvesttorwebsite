# dhanvesttor.com

The Dhanvesttor website: Next.js 16 (App Router, TypeScript), Tailwind CSS 4, Motion, with WordPress as a headless CMS for the blog, careers, events, press and FAQs.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # calculator, CMS, SEO, form and token tests
npm run build
```

No environment variables are needed to run locally. Without `WORDPRESS_GRAPHQL_URL` the site reads the seed content in `content/`; without SMTP settings, forms log submissions to the console.

## PHP version

`php/` holds the same site in plain PHP 8.1+, for hosting on any Hostinger plan without Node.js: same pages, URLs, text, design and SEO. Run it with `npm run php:serve` (http://localhost:8080); deploy it with `deploy/hostinger-php.md`.

## Where things live

| What | Where |
|---|---|
| Pages | `src/app/**/page.tsx` |
| Company facts, team, fees, partner AMCs, nav | `src/content/*.ts` |
| Facts awaiting confirmation (CLCB reach, advisers, insurance licence) | `src/content/todo.ts` |
| The only place PMS returns live | `src/content/performance.ts` |
| Photo slots (swap placeholders for real photos) | `src/content/images.ts`, files in `public/photos/` |
| Calculators (pure functions, tested) | `src/lib/calc/` |
| CMS adapter (WordPress with local fallback) | `src/lib/cms/` |
| WordPress plugin | `wordpress/dhanvesttor-headless/` |
| Deployment | `deploy/hostinger.md` (Next.js), `deploy/hostinger-php.md` (PHP) |
| PHP version: pages, components, content | `php/app/pages/`, `php/app/lib/`, `php/app/content/` |
| Editors' guide for marketing and HR | `docs/editors-guide.md` |
| Brand direction | `docs/brand/direction-board.html` |
