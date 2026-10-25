# Editors' guide: blog, careers, events

Everything below happens in WordPress at **cms.dhanvesttor.com/wp-admin**. You never need a developer. Changes appear on dhanvesttor.com within a minute of publishing.

## Publish a blog post (Marketing)

1. **Posts → Add New.**
2. Write the **title** as the reader would search it: "How to read a mutual fund factsheet", not "Factsheets 101".
3. Write the post. Use **Heading 2** for sections. Keep paragraphs short.
4. **Excerpt** (right sidebar): one or two sentences. This appears on cards and in Google.
5. **Category**: choose one of Markets, Portfolio Management, Mutual Funds, Women & Money, CLCB, News & Media.
6. **Tags**: two to four topics.
7. **Featured image**: landscape, at least 1600 px wide. Fill in the **alt text** describing the photo.
8. **SEO** (Yoast or Rank Math box): an SEO title under 60 characters and a meta description under 155. If left empty, the site uses the title and excerpt.
9. **Publish.**

### Rules every post follows

- Plain language. Explain every term the first time.
- Never state or imply PMS returns. Link to the FAITH Fund page instead.
- Mutual fund returns only with the period and "past performance is not indicative of future returns".
- Link to one relevant calculator and one relevant service page.
- Compliance (Neha) reviews any post that mentions a specific product, fund or return before it is published.

## Post a job (HR)

HR logins have the role **HR (Careers only)** and see only **Careers** in the menu.

1. **Careers → Add new job opening.**
2. **Title**: the role, e.g. "Relationship Manager".
3. **Body**: what the person will do, and what we look for. Use bullet lists.
4. **Details box**: department, location, type, one-line summary, the email applications should go to, and "Accepting applications: yes".
5. **Publish.**

To close a role, set **Accepting applications** to "no" and update. It disappears from the open-roles list. Applications with CVs arrive by email at the address set in the website's `HR_MAIL_TO` setting.

## Add a CLCB event

**CLCB Events → Add new.** Title, date and time, city (or "Online"), mode, a short description, and an optional registration link. Events move to "Recently held" automatically after their date.

## Add press coverage

**Press → Add press coverage.** Headline as the title, then the publication, link and date.

## Add or edit FAQs

**FAQs → Add.** The question is the title, the answer is the body. Choose where it shows: PMS, Mutual Funds, CLCB or General.

## Things that live in code, not WordPress

Team bios, fund facts and fees, performance figures, partner fund houses and calculator text are kept in the website code so they go through compliance review. Send changes to the web team; the files are in `src/content/`.
