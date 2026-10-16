# Daily Pet Care — Pet Care Blog + Admin Panel

A production-ready blogging website for the U.S. pet care market, with a full admin panel, built for **Hostinger** (Node.js Web App + MySQL).

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · MySQL/MariaDB via `mysql2` · Tiptap editor
- **No ORM binaries** — works on Hostinger shared/Business plans without Prisma engines or extra memory.

---

## What's included

### Public website
- Homepage: hero + search, featured post, topic tags, latest guides, "pet services" band, most-read ranking, newsletter
- Blog index with search and pagination, category, tag and author archives
- Article pages: table of contents, breadcrumbs, author box, related posts, share buttons, affiliate/vet disclosure
- About, Contact (saves to DB), Privacy Policy (CCPA-aware), Terms, Disclaimer (FTC affiliate disclosure)
- **SEO:** per-page metadata, Open Graph/Twitter cards, `BlogPosting` + `BreadcrumbList` + `WebSite` JSON-LD, `sitemap.xml`, `robots.txt`, RSS at `/feed.xml`, canonical URLs
- Fast: pages are cached and refreshed every 5 minutes, and instantly when you publish

### Content: 24 ready-to-publish articles
- **15 SEO guides** (~900–1,350 words each) targeting high-intent U.S. searches: dog grooming cost, dog boarding cost, is pet insurance worth it, vet visit cost, doggy daycare, choosing a vet, finding a pet sitter, how often to bathe a dog, trimming nails, how much to feed a dog, human foods dogs can eat, stopping puppy biting, cats peeing outside the litter box, fireworks anxiety, flea & tick prevention
- Each has an SEO title (<60 chars), meta description (<160 chars), FAQ section, internal links to related guides and cited sources for price data
- **9 shorter starter articles** covering groomers, sitters vs. boarding, dog walker prices, vaccines, toxic foods, cat enrichment, crate training, adoption and summer heat
- Content lives in `database/seed-content.mjs` and `database/seo-articles-*.mjs` + `seo-expansions-*.mjs`

### Admin panel (`/admin`)
- Dashboard: post counts, views, subscribers, posts waiting for review, recent messages
- **Posts:** rich text editor (headings, lists, links, images, YouTube/Vimeo, quotes), cover image upload, categories, tags, featured toggle, **scheduled publishing**, SEO title/description with live Google preview and character counters
- **Roles:** Admin (everything) · Editor (all content) · Author (own posts, submits for review — can't publish)
- Categories, Media library (drag & drop upload, alt text), Subscribers (+ CSV export for Mailchimp/Brevo), Contact messages inbox, Users, Site settings (brand, homepage text, social links, Google Analytics), My profile + password change
- Security: bcrypt passwords, signed httpOnly session cookies, login rate limiting, HTML sanitizing, image type checking, honeypot spam protection on public forms

---

## Deploy on Hostinger (step by step)

Requires a plan with Node.js web apps: **Business Web Hosting** or any **Cloud** plan.

### 1. Create the MySQL database
hPanel → **Websites → Dashboard → Databases → Management**. Create a database, user and password. Note them — they look like `u123456789_petblog` / `u123456789_petuser`.

### 2. Put the code on GitHub
Create a **private** repository and push this folder to it (the `.gitignore` already excludes `.env`, `node_modules` and uploads).

### 3. Create the Node.js web app
hPanel → **Websites → Create Website → Web App → Import Git Repository**, authorize GitHub and pick the repo. Hostinger detects **Next.js**.
- Node version: **22.x** (20.x also works)
- Build command: `npm run build` · Start: `npm start` (auto-detected)

### 4. Add environment variables
In the app's dashboard → **Environment variables**, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `mysql://u123456789_petuser:YOUR_PASSWORD@localhost:3306/u123456789_petblog` |
| `AUTH_SECRET` | 48+ random characters (generate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`) |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` (no trailing slash) |
| `UPLOAD_DIR` | `/home/u123456789/petblog-uploads` |

> **Important — `UPLOAD_DIR`:** Hostinger replaces everything in `public_html` on every redeploy. Point uploads to a folder **outside** it (your home directory, as above) or uploaded images will disappear after each deploy. Your home path is shown in hPanel → File Manager.
>
> If your password has special characters like `@ : / #`, URL-encode them in `DATABASE_URL` (e.g. `@` → `%40`).

Click **Deploy** (or Redeploy after adding variables — `NEXT_PUBLIC_SITE_URL` is baked in at build time).

### 5. Run the installer
Open **`https://yourdomain.com/admin/setup`**. It creates the tables, your admin account, and (optionally) 8 categories + all 24 articles. It locks itself after the first run. Then:
1. **Site settings** → set your site name, tagline, contact email, social links, GA4 ID
2. Edit or replace the starter posts and add real cover photos
3. Submit `https://yourdomain.com/sitemap.xml` in **Google Search Console**

From now on, every `git push` redeploys automatically.

### Already installed an earlier version?
Push the new code, then go to **Admin → Site settings → SEO article pack → Import**. It adds only the articles you don't have yet and never changes posts you've already edited. (Over SSH: `npm run db:articles`.)

**Alternative setup:** import `database/schema.sql` in phpMyAdmin, then run `npm run db:setup` over SSH with `SEED_ADMIN_*` set.

---

## Run locally

```bash
cp .env.example .env      # fill in DATABASE_URL (local MySQL, or Hostinger with Remote MySQL enabled)
npm install
npm run db:setup          # tables + admin + all 24 articles (or use /admin/setup in the browser)
npm run db:articles       # add any missing SEO pack articles to an existing site
npm run dev               # http://localhost:3000  ·  admin: http://localhost:3000/admin
```

## Project structure

```
database/
  schema.sql            tables (import-ready for phpMyAdmin)
  setup.mjs             CLI installer: npm run db:setup
  seed-content.mjs      categories + 9 starter articles
  seo-articles-*.mjs    15 SEO guides (+ seo-expansions-*.mjs, merged by article-pack.mjs)
src/
  app/(site)/           public pages (home, blog, category, tag, author, about, contact, legal)
  app/admin/            admin panel (setup, login, dashboard, posts, categories, media, users…)
  app/admin/_actions/   server actions (all DB writes, with permission checks)
  app/api/              upload, view counter, subscriber CSV, media list
  lib/                  db pool, auth, permissions, queries, HTML sanitizing, settings
  components/           site + admin UI
  proxy.ts              protects /admin routes
```

## Content tips for the U.S. market
- Write 1,200–2,500 word guides that answer one question fully ("How much does dog boarding cost in 2026?").
- Use one H2 per main section — they build the table of contents and help Google show jump links.
- Add a real author bio with relevant experience (Users → edit). Pet health is a "Your Money or Your Life" topic; Google rewards expertise.
- Local + cost content performs well: "dog groomer prices in Texas", "best dog parks in Austin".
- Keep the disclosure text if you add affiliate links (FTC rule).

## Troubleshooting
| Problem | Fix |
|---|---|
| `/admin/setup` says it can't reach the database | Check `DATABASE_URL`: host `localhost`, port `3306`, user assigned to the DB in hPanel |
| Login loops back to sign-in | `AUTH_SECRET` missing/changed, or the site isn't on HTTPS (cookies are secure-only in production) |
| Uploaded images vanish after a deploy | Set `UPLOAD_DIR` to a folder outside `public_html` |
| Changes don't appear | Publishing refreshes pages instantly; otherwise they refresh within 5 minutes |
| Forgot admin password | Another admin resets it in Users; or run `npm run db:setup` with a new `SEED_ADMIN_EMAIL` to create a fresh admin |
