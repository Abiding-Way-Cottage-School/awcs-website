# Abiding Way Cottage School

The website for Abiding Way Cottage School — a Christ-centered, parent-participation
Charlotte Mason enrichment co-op in Jacksonville, Florida.

Built with Next.js 16 (App Router) and TypeScript. It currently exports to plain
static files so GitHub Pages can host it for free, and it is set up so that adding
a member login, an `/admin` area, form signing, and card payments later does not
require a rewrite. See [docs/ROADMAP.md](docs/ROADMAP.md).

> **Before this goes to a wider audience**, read
> [docs/CONTENT-TODO.md](docs/CONTENT-TODO.md). Several pages contain prose written
> to the right tone without the underlying facts — the co-op's story, the calendar,
> parts of the FAQ. Every instance is marked `DRAFT` in the source.

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

**Almost every change you will want to make is in `src/content/`.** The page
components read from those files and hold no copy of their own, so you never have
to read JSX to change a sentence.

| File | Holds |
| --- | --- |
| `site.ts` | School facts, the navigation tree, quotes, the photo list and alt text |
| `home.ts` | The homepage, and the list of ways to give |
| `about.ts` | Our Philosophy, Our Story, Our Leadership |
| `community.ts` | The Experience, A Day, The Feast, For Mothers |
| `families.ts` | Who It's For, Tuition & Fees, FAQ, Calendar |
| `join.ts` | Visit Us, Apply, and the Family Portal placeholder |

### Adding a page

1. Add it to the `nav` tree in `src/content/site.ts` — it appears in the header
   dropdown and the footer sitemap automatically.
2. Add its copy to the relevant content file.
3. Create `src/app/<section>/<page>/page.tsx`. Copy the closest existing page; they
   all follow the same shape: `SiteShell` → `PageHeader` → sections → `CtaBand`.

### Adding a new way to give

Add an entry to `givingMethods` in `src/content/home.ts`. The giving section renders
whatever is in that array:

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

### Photographs

All current photographs are Pexels placeholders. Most were chosen so that **no
identifiable faces appear**; two supplied by the school (`dancing-circle` and
`child-studying`) do show faces. See [docs/PHOTO-CREDITS.md](docs/PHOTO-CREDITS.md)
for the reasoning, the source list, and how to swap in real photographs. Before
publishing any photograph of a child, get the parent's written permission.

Images are warmed and desaturated by CSS (`.photo img` in `src/styles/site.css`), not
baked into the files, so real photographs inherit the same treatment.

### Brand

[`docs/BRAND.md`](docs/BRAND.md) is the brand kit, copied unmodified — the reference
for color, type, layout, voice, and which facts may be published.
[`src/styles/tokens.css`](src/styles/tokens.css) is its design-token stylesheet and
**should not be edited**; page styles in [`src/styles/site.css`](src/styles/site.css)
are built entirely from its variables.

**The header mark** (`public/brand/logo-mark-olive.png`, and its cream twin for
dark surfaces) is the full logo with the wordmark taken out from inside the ring
and the ring redrawn tighter around the drawing, so the space the text used to
occupy is not left empty. The circle, sun, cottage and path are all kept, and the
ring keeps the original's stroke weight and colour. It exists because the full
lockup — ring, illustration and two lines of type — is an unreadable smudge at
header size; the complete logo still appears intact in the footer of every page.

To regenerate it from `logo-olive.png` / `logo-cream.png`: lift the drawing from
roughly x 460–1020, y 300–955 of the 1500×1500 original, trim to the ink bounds,
find the smallest radius from the drawing's centre that contains all the ink, and
stroke a circle at 1.3× that radius using the original ring's 12px weight.

Two things stay off the site because the Family Handbook is a family document:
**leadership phone numbers** and the **full policy detail**. Fees are published as
approximate and confirmed at enrollment.

---

## Deploying

### Production — Vercel

`abidingwaycottageschool.com` is served by [Vercel](https://vercel.com), which
builds and deploys on every push to `main` and gives every pull request its own
preview URL. There is no workflow file for it: Vercel watches the repository
directly.

The site runs as a Node.js server — the Family Portal's sign-in, uploads and
form signing need route handlers, server actions and cookies, none of which a
static export can provide. Environment variables are listed in
[`.env.example`](.env.example) and set in the Vercel project (Settings →
Environment Variables) for all environments.

### The static era

Until the domain moved, the site was a static export served by GitHub Pages from
`/awcs-website`. That mode, its `basePath` prefix, the `AWCS_STATIC_EXPORT` and
`AWCS_BASE_PATH` variables, the Pages workflow, and a post-build script that
patched Next 16's static-export prefetch payloads were all retired when the portal
arrived. `src/lib/asset.ts` remains as the one place a CDN prefix would go.

---

## Project layout

```
src/
  app/
    layout.tsx          root document, metadata, fonts, skip link
    page.tsx            homepage
    about/              philosophy · story · leadership
    community/          experience · a-day · the-feast · for-mothers
    families/           who-its-for · tuition · faq · calendar
    join/               visit · apply
    portal/             Family Portal placeholder (noindex)
    not-found.tsx       404
  components/
    SiteShell.tsx       header + main + footer wrapper
    SiteHeader.tsx      wordmark, cottage mark, and nav
    SiteNav.tsx         dropdown nav (client); mobile disclosure panel
    SiteFooter.tsx      framed olive footer with sitemap
    PageHeader.tsx      breadcrumb + eyebrow + heading + lead + photo
    Feature.tsx         alternating photo-and-prose block
    PhotoBand.tsx       full-bleed photo, optionally with a quote
    CardGrid.tsx        section-index cards
    CtaBand.tsx         closing invitation
    Photo.tsx           brand-treated image with alt-text lookup
    Reveal.tsx          the site's only motion: a 400ms fade-up
  content/              ← all copy and facts
  lib/asset.ts          the one place a CDN prefix for /public files would go
  styles/
    tokens.css          brand design tokens (do not edit)
    site.css            page styles, built from those tokens
public/
  brand/                logo files
  photos/               photography (see docs/PHOTO-CREDITS.md)
  og.png                social share card
docs/
  BRAND.md              the brand kit
  ROADMAP.md            how the portal, admin, and payments get added
  CONTENT-TODO.md       what still needs real information
  PHOTO-CREDITS.md      image sources and the photo policy
```

---

## A note on route groups

The public pages are not in a `(site)` route group; `SiteShell` gives the same
separation. That began as a workaround for a static-export bug in Next 16 and is now
simply the shape of the code — a group is safe to introduce whenever it earns its
keep.

## Other notes

- **Fonts** (Cormorant Garamond, Inter) load from Google Fonts via `tokens.css`.
  Switch to `next/font` if the site ever needs to work offline or drop the
  third-party request.
- **Favicon**: `src/app/icon.png` is the 512px olive logo. The brand kit notes the
  cottage detail disappears below 80px, so a purpose-drawn 32px mark would read
  better in a browser tab.
