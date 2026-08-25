# Abiding Way Cottage School

The website for Abiding Way Cottage School — a Christ-centered, parent-participation
Charlotte Mason enrichment co-op in Jacksonville, Florida.

Built with Next.js 16 (App Router) and TypeScript. It currently exports to plain
static files so GitHub Pages can host it for free, and it is set up so that adding
a member login, an `/admin` area, form signing, and card payments later does not
require a rewrite. See [docs/ROADMAP.md](docs/ROADMAP.md).

---

## Running it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build; writes the static site to `out/` |
| `npm run typecheck` | TypeScript check with no build |

---

## Editing the site

**Almost every change you will want to make is in one file:
[`src/content/site.ts`](src/content/site.ts).**

Wording, the meeting time, the address, the list of subjects, the age groups, the
ways to give — all of it lives there as plain data. The page components read from
it and hold no copy of their own, so you never have to read JSX to change a
sentence.

### Adding a new way to give

Add an entry to the `give.methods` array in `src/content/site.ts`. The giving
section renders whatever is in that array:

```ts
{
  id: 'zelle',
  name: 'Zelle',
  detail: 'giving@example.org',
  note: 'No fees, straight to the school account.',
  href: null,          // or a URL for a button
  cta: null,           // button label; omit both for a plain listing
  available: true,     // false renders it greyed out as "coming soon"
}
```

Card and recurring giving need a server, so they arrive with the move off GitHub
Pages — the placeholder entry is already in the array.

### Brand

[`docs/BRAND.md`](docs/BRAND.md) is the brand kit, copied unmodified. It is the
reference for color, type, layout, voice, and the facts that may be published.
[`src/styles/tokens.css`](src/styles/tokens.css) is the design-token stylesheet
from that kit and **should not be edited** — page styles in
[`src/styles/site.css`](src/styles/site.css) are built entirely from its variables.

Two things are deliberately left off the site because the Family Handbook is a
family document: **leadership phone numbers** and the **fee and policy detail**
(enrollment cost, background-check fee, uniform prices). Add them only once
leadership confirms they may be public.

---

## Deploying

### Today — GitHub Pages

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes
on every push to `main`. One-time setup:

> Repo **Settings → Pages → Build and deployment → Source = "GitHub Actions"**

No `gh-pages` branch is needed. The site then serves from
`https://abiding-way-cottage-school.github.io/awcs-website/`.

Because GitHub Pages serves a project repo from a subdirectory, the workflow builds
with `AWCS_BASE_PATH=/awcs-website` so every asset URL is prefixed.

### When the custom domain goes live

1. In `.github/workflows/deploy.yml`, **delete the `AWCS_BASE_PATH` line** and set
   `NEXT_PUBLIC_SITE_URL` to the new domain. The site then serves from the root.
2. Add a file `public/CNAME` containing just the domain, e.g. `abidingwaycottageschool.org`.
3. Point the domain's DNS at GitHub Pages, then set it under **Settings → Pages →
   Custom domain** and tick **Enforce HTTPS**.

### Later — a host with a server

Set `AWCS_STATIC_EXPORT=false` and deploy to Vercel, Netlify, or Cloudflare. That
single flag drops the static-export restriction and unlocks API routes, middleware,
sessions, and Stripe. Nothing in `src/` changes. See
[docs/ROADMAP.md](docs/ROADMAP.md).

---

## Project layout

```
src/
  app/
    layout.tsx        root document, metadata, fonts, skip link
    page.tsx          the homepage — every section, in brand-kit order
    not-found.tsx     404
    globals.css       imports tokens.css then site.css
    icon.png          favicon / touch icon
  components/
    SiteShell.tsx     header + main + footer wrapper for public pages
    SiteHeader.tsx    the handbook meta line, as a nav
    SiteFooter.tsx    framed olive closing panel
    Reveal.tsx        the site's only motion: a 400ms fade-up on scroll
  content/
    site.ts           ← all copy and facts
  lib/
    asset.ts          basePath-aware URLs for files in /public
  styles/
    tokens.css        brand design tokens (do not edit)
    site.css          page styles, built from those tokens
public/
  brand/              logo files, all four variants
  og.png              social share card
docs/
  BRAND.md            the brand kit
  ROADMAP.md          how the portal, admin, and payments get added
```

---

## Notes

- **Fonts** (Cormorant Garamond, Inter) load from Google Fonts via `tokens.css`.
  If the school later needs the site to work fully offline or wants to drop the
  third-party request, switch to `next/font` and self-host them.
- **Favicon**: `src/app/icon.png` is the 512px olive logo. The brand kit notes the
  cottage detail disappears below 80px, so a purpose-drawn 32px mark would render
  better in a browser tab. Worth doing when there is time.
- **No route groups.** Next 16's static export mishandles a route group's prefetch
  payload (it writes a directory but the router requests a flat filename, so every
  page load 404s). `SiteShell` gives the same separation without that bug.
