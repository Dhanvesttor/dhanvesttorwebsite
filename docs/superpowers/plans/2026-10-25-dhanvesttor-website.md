# Dhanvesttor Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A 67-page, SEO-first Next.js website for Dhanvesttor with a headless WordPress CMS layer (local seed fallback), twelve calculators, and Hostinger deployment files.

**Architecture:** Next.js App Router renders every page on the server from two sources: static site data in `src/content/` (company facts, nav, AMCs, fees) and a CMS adapter in `src/lib/cms/` that reads WordPress via WPGraphQL when `WORDPRESS_GRAPHQL_URL` is set and otherwise reads seed files in `content/`. Pages are thin: they compose section components from `src/components/` and pass data. Calculators are pure functions in `src/lib/calc/` wrapped by client components.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4, `motion` (Framer Motion successor), `next/font` (Fraunces + Hanken Grotesk), `gray-matter` + `marked` for seed posts, `graphql-request` for WordPress, Vitest, Node 24, npm.

**Spec:** `docs/superpowers/specs/2026-10-25-dhanvesttor-website-design.md` and `docs/brand/direction-board.html`

## Global Constraints

- Palette tokens exactly: ivory `#FBF7F0`, indigo `#2E2A6E`, raspberry `#DE4D7A`, marigold `#F8C233`, terracotta `#C8876A`, sand `#E9DCC7`, ink `#1D1B3A`. Raspberry at most one accent element per section. Marigold only as hairlines.
- Fonts: Fraunces (display, weight 300–400, `opsz` 144) and Hanken Grotesk (text). No other font families.
- Logo unchanged; header shows it centred on desktop, left on mobile, Investor login on the right.
- No PMS return figures anywhere except `/pms/faith-fund`, and there only with benchmark, period and the SEBI disclaimer block.
- Copy: second person, short sentences, explain before sell, gloss every term, never "women only", "empower" at most once per page. Signature line "Her Money, Her Growth" appears in footer, CLCB and About only.
- Every page exports `metadata` via `buildMetadata()` and renders JSON-LD where the spec names a type.
- Any fact marked ⚠ in the spec is referenced through `src/content/todo.ts` constants so it can be swapped in one place.
- WCAG 2.1 AA: semantic landmarks, visible focus, `prefers-reduced-motion` disables motion, 16px side gutter at phone width, no horizontal scroll.
- Logins are external links: `https://login.dhanvesttor.com/client-login` and `https://faconnect.kotak.bank.in`.

## Review Focus

1. Calculator inputs of 0, negative, or empty strings must render a zero result, never NaN or a crash. (Tests in Task 6.)
2. CMS adapter with `WORDPRESS_GRAPHQL_URL` set but WordPress unreachable must fall back to seed content and log once, so the site never 500s. (Test in Task 3.)
3. A blog post slug that does not exist must return `notFound()`, not an empty page. (Test in Task 7.)
4. Enquiry form submitted without SMTP configured must still return 200 and show the thank-you page, logging the payload. (Test in Task 9.)
5. Mobile header at 375px must show logo, menu button and login without overflow. (Checked in Task 11 screenshots.)

---

### Task 1: Scaffold, tokens, fonts, repo

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/fonts.ts`, `.env.example`, `.gitignore`, `vitest.config.ts`
- Test: `tests/tokens.test.ts`

**Interfaces:**
- Produces: CSS custom properties `--color-ivory … --color-ink`, Tailwind utilities `bg-ivory`, `text-indigo`, `font-display`, `font-sans`; `fonts.display` and `fonts.sans` exports from `src/lib/fonts.ts`.

- [ ] Step 1: `git init`; `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`.
- [ ] Step 2: Install `motion graphql-request gray-matter marked nodemailer zod` and dev `vitest @vitejs/plugin-react jsdom @testing-library/react @types/nodemailer`.
- [ ] Step 3: In `globals.css` declare the seven colours under `@theme` plus `--font-display`/`--font-sans`; add base styles (ivory body, ink text, focus ring in raspberry, reduced-motion rule).
- [ ] Step 4: `src/lib/fonts.ts` exports `display = Fraunces({axes:['opsz','SOFT'], weight:'variable'})` and `sans = Hanken_Grotesk(...)`; `layout.tsx` applies both class names to `<html>`.
- [ ] Step 5: Test `tests/tokens.test.ts` reads `globals.css` and asserts each hex from Global Constraints is present. Run `npx vitest run`. Expected: PASS.
- [ ] Step 6: Commit `chore: scaffold next app with brand tokens`.

### Task 2: Site content and SEO helpers

**Files:**
- Create: `src/content/site.ts`, `src/content/nav.ts`, `src/content/team.ts`, `src/content/amcs.ts`, `src/content/pms.ts`, `src/content/todo.ts`, `src/lib/seo.ts`, `src/components/seo/JsonLd.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Test: `tests/seo.test.ts`

**Interfaces:**
- Produces: `site` (name, legalName, sebiReg `INP000008570`, llpin `ACB-0244`, address, phone `033 2280 0152`, email `ho@dhanvesttor.com`, hours, socials, loginUrl, pmsLoginUrl); `nav: NavGroup[]` with `{label, href, children?: {label, href, blurb}[]}`; `team: TeamMember[]` `{slug,name,role,bio,education?,photo?}`; `amcs: Amc[]` `{slug,name,blurb,website}` (20 entries from spec); `pms` (fund facts and fees from spec); `TODO` constants `{clcbReach:'1 lakh+', clcbReachConfirmed:false, advisers:[], insuranceLicence:'', bondsScope:[]}`; `buildMetadata({title, description, path, image?, type?}): Metadata` that sets canonical `https://dhanvesttor.com${path}`, OG and Twitter; `<JsonLd data={...}/>`; `organizationJsonLd()`, `articleJsonLd(post)`, `faqJsonLd(items)`, `breadcrumbJsonLd(crumbs)`, `personJsonLd(member)`.
- `sitemap.ts` lists every static route in the spec's site map plus dynamic posts/jobs from the CMS adapter (Task 3).

- [ ] Step 1: Write `tests/seo.test.ts`: `buildMetadata({title:'PMS',description:'x',path:'/pms'})` has `alternates.canonical === 'https://dhanvesttor.com/pms'` and title ends with `| Dhanvesttor`; `faqJsonLd([{q,a}])['@type']==='FAQPage'`.
- [ ] Step 2: Run, expect FAIL. Implement. Run, expect PASS.
- [ ] Step 3: Commit `feat: site content, nav and seo helpers`.

### Task 3: CMS adapter (WordPress + local seed)

**Files:**
- Create: `src/lib/cms/types.ts`, `src/lib/cms/wordpress.ts`, `src/lib/cms/local.ts`, `src/lib/cms/index.ts`, `content/posts/*.md` (6 seed posts, one per category), `content/jobs.json` (3), `content/events.json` (4), `content/press.json` (12 from spec), `content/faqs.json`
- Test: `tests/cms.test.ts`

**Interfaces:**
- Produces types `Post {slug,title,excerpt,html,date,author:Author,category:Category,tags:string[],cover?,seo:{title?,description?}}`, `Category {slug,name,description}`, `Author {slug,name,role,bio,photo?}`, `Job {slug,title,department,location,type,summary,html,applyEmail,postedAt,open:boolean}`, `Event {slug,title,date,city,mode,summary,registerUrl?,past:boolean}`, `PressItem {outlet,title,url,date}`, `Faq {q,a,group}`.
- Produces `cms` with `getPosts({category?,limit?})`, `getPost(slug)`, `getCategories()`, `getAuthors()`, `getJobs({openOnly?})`, `getJob(slug)`, `getEvents({upcoming?})`, `getPress()`, `getFaqs(group)`. Every function returns the same shape from either source. `index.ts` picks WordPress when `process.env.WORDPRESS_GRAPHQL_URL` is set, wraps each call in try/catch, and on error logs once and returns the local result.
- `wordpress.ts` queries WPGraphQL: posts with categories/author/featuredImage/seo (Yoast fields if present), and CPTs `job`, `event`, `pressItem`, `faq` registered by the plugin in Task 10.

- [ ] Step 1: Tests: local `getPosts()` returns 6 sorted by date desc; `getPost('missing')` returns null; with `WORDPRESS_GRAPHQL_URL='http://127.0.0.1:9'` `getPosts()` still returns the 6 local posts.
- [ ] Step 2: Run FAIL → implement → PASS. Commit `feat: cms adapter with wordpress and local seed`.

### Task 4: Layout shell and shared components

**Files:**
- Create: `src/components/layout/Header.tsx`, `MobileMenu.tsx`, `Footer.tsx`, `src/components/ui/{Button,Eyebrow,Container,Section,Hairline,Reveal,Stat,Card,Accordion,Breadcrumbs,CTA,ImagePlaceholder,Prose,Tabs,Table}.tsx`, `src/components/sections/{PageHero,SplitFeature,StatBand,PressStrip,ServiceGrid,FaqList,ContactBand,TeamGrid,LogoWall,Timeline,StepList,QuoteBlock,PostGrid,EventList}.tsx`, `src/app/not-found.tsx`, `src/app/thank-you/page.tsx`
- Docs: `docs/components.md` (one line per component: props and when to use)

**Interfaces:**
- `Header` renders `nav` from Task 2 with a mega-menu on desktop (three-column: group children with blurbs) and `MobileMenu` (sheet) below 1024px; logo from `/public/brand/logo.svg` (placeholder wordmark SVG until the real file is dropped in); login button to `site.loginUrl`.
- `Reveal` wraps children in a `motion.div` fade/lift once in view; no-ops under reduced motion.
- `PageHero {eyebrow,title,lede,image?,crumbs?,actions?}`; `StatBand {stats:{value,label,flag?}[]}`; `ServiceGrid {items:{title,blurb,href,tone}[]}`; `FaqList {items:Faq[]}` also renders `faqJsonLd`; `ContactBand {heading,paths:('pms'|'mf'|'clcb'|'insurance'|'bonds')[]}` embeds the enquiry form (Task 9).
- `ImagePlaceholder {label,ratio}` renders a sand matte with the one-rounded-corner motif and the label, used wherever a real photo is pending.

- [ ] Step 1: Build components per the direction board (hero grid, trust band, press strip, hairline 55/45).
- [ ] Step 2: `npm run build` passes; `docs/components.md` written. Commit `feat: layout shell and component library`.

### Task 5: Home page

**Files:** `src/app/page.tsx`, `src/components/home/{Hero,WhatWeDo,FaithTeaser,FounderNote,ClcbTeaser,CalculatorTeaser,InsightsTeaser}.tsx`

- Sections in the spec's order 01–10. Hero copy exactly: "Wealth you understand. Wealth you own." with the lede from the board. Trust band values from `TODO`/`site`. Inline SIP calculator from Task 6.
- [ ] Build; screenshot at 1280 and 375; commit `feat: home page`.

### Task 6: Calculators

**Files:**
- Create: `src/lib/calc/{sip,stepUpSip,lumpsum,swp,stp,goal,retirement,childEducation,cagr,inflation,pmsFee}.ts`, `src/lib/calc/format.ts` (`inr(n)` Indian grouping, `pct`), `src/components/calculators/{CalculatorShell,RangeField,ResultCard,GrowthChart}.tsx`, one client component per calculator, `src/app/calculators/page.tsx` (hub), `src/app/calculators/<slug>/page.tsx` ×11 with explainer copy, FAQ and `faqJsonLd`.
- Test: `tests/calc.test.ts`

**Interfaces:** pure functions, e.g. `sip({monthly, annualRatePct, years}) => {invested, value, gain, series:{year, invested, value}[]}`; `pmsFee({corpus, years, grossReturnPct, fixedPct:2, perfPct:20, hurdlePct:10, exitPct:1.5}) => {netValue, totalFees, series}`; all return zeros for non-positive inputs.
- [ ] Tests with known values: `sip({monthly:10000, annualRatePct:12, years:10}).value ≈ 23_23_391 ±1%`; `lumpsum({amount:100000, annualRatePct:10, years:5}).value ≈ 161_051`; `inr(1234567)==='₹12,34,567'`; zero/negative inputs → zeros, no NaN.
- [ ] Commit `feat: calculators`.

### Task 7: PMS, Mutual Funds, CLCB, Insurance, Bonds pages

**Files:** `src/app/pms/{page,faith-fund,philosophy,who-is-it-for,fees,pms-vs-mutual-funds,faqs}`, `src/app/mutual-funds/{page,how-we-select,partners,equity,debt,hybrid,index-etf,elss,solution-oriented,sip,stp-swp,faqs}`, `src/app/clcb/{page,programmes,events,gallery,stories,join,partners}`, `src/app/insurance/{page,health,property-motor,business}`, `src/app/bonds/{page,bonds-ncds,corporate-fds,structured-products}`

- `faith-fund` is the only page with returns: a `PerformanceTable` fed by `src/content/performance.ts` (`asOf`, rows for 1Y/2Y/3Y/5Y/since-inception with fund and benchmark, blanks allowed) and the SEBI disclaimer block from `src/content/disclaimers.ts`. Fee table from `pms`.
- Insurance and bonds pages read `TODO.insuranceLicence` / `TODO.bondsScope`; while empty they render the offering as described in the spec with an "offer details being finalised" note instead of a product list.
- [ ] Each page: `buildMetadata`, breadcrumb JSON-LD, 300–600 words of original copy, one `ContactBand`. Commit per group.

### Task 8: Insights (blog), careers, media, about, compliance, utility

**Files:** `src/app/insights/{page,[slug],category/[slug],author/[slug],tag/[slug],newsletter}`, `src/app/careers/{page,life-at-dhanvesttor,roles,roles/[slug]}`, `src/app/media/{page,kit}`, `src/app/about/{page,purpose,team,team/[slug]}`, `src/app/contact/page.tsx`, `src/app/login/page.tsx`, `src/app/regulatory/{page,disclosure-document,investor-charter,grievance,complaints-data,privacy,disclaimer,accessibility}`, `src/app/sitemap-page/page.tsx`
- Blog post page renders `articleJsonLd`, reading time, related posts, author card. `generateStaticParams` from `cms.getPosts()`; missing slug → `notFound()` (test).
- Careers role page has an apply form (Task 9) with CV upload.
- Complaints data page renders a monthly table from `content/complaints.json` in SEBI's prescribed columns.
- [ ] Commit per group.

### Task 9: Forms and API routes

**Files:** `src/components/forms/{EnquiryForm,ClcbJoinForm,ApplyForm,NewsletterForm}.tsx`, `src/app/api/{enquiry,clcb,apply,newsletter}/route.ts`, `src/lib/mail.ts`
- Test: `tests/api.test.ts`
- `mail.ts` `send({subject, html, replyTo, attachments?})` uses SMTP env (`SMTP_HOST/PORT/USER/PASS`, `MAIL_TO`); without env it logs and resolves. Zod validation; honeypot field; 200 JSON `{ok:true}`; client redirects to `/thank-you?for=<path>`.
- [ ] Test: POST without SMTP env → 200. Commit `feat: forms and api`.

### Task 10: WordPress headless plugin

**Files:** `wordpress/dhanvesttor-headless/dhanvesttor-headless.php`, `wordpress/README.md`
- Registers CPTs `job`, `event`, `press_item`, `faq`, `team_member` with `show_in_graphql`, meta fields via `register_post_meta` exposed to GraphQL, a `dhanvesttor_hr` role limited to `job`, and a `save_post` hook that POSTs to `REVALIDATE_URL` (the site's `/api/revalidate?secret=`). README: install WPGraphQL, this plugin, set `WORDPRESS_GRAPHQL_URL`, map categories.
- Create `src/app/api/revalidate/route.ts` calling `revalidatePath('/insights')` etc. on valid secret.
- [ ] Commit `feat: wordpress headless plugin and revalidation`.

### Task 11: Hostinger deployment and verification

**Files:** `deploy/hostinger.md`, `ecosystem.config.cjs`, `.github/workflows/deploy.yml`, `Dockerfile`, `README.md`
- VPS path: Node 24, `npm ci && npm run build`, pm2 `ecosystem.config.cjs`, nginx reverse proxy snippet, env list. Static-export fallback documented for PHP-only plans.
- [ ] `npm run build` with zero errors; `npx vitest run` green; screenshots of home, PMS, FAITH, a calculator, a post, careers at 1280 and 375; fix anything broken. Commit `chore: deploy files and docs`.
