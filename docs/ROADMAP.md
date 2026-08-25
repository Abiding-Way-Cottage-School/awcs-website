# Roadmap — from brochure site to family portal

The public site is complete. This document records how the
member area, `/admin`, form signing, and payments get added, and why the current
setup does not have to be undone to get there.

---

## The one constraint that shapes everything

GitHub Pages serves **static files only**. There is no server, so there is no place
to check a password, hold a session, verify a Stripe webhook, or store a signed
form. Everything in the "later" column below needs a server.

That is a hosting change, not a rewrite. `next.config.mjs` reads two environment
variables:

| Variable | Today | After the move |
| --- | --- | --- |
| `AWCS_STATIC_EXPORT` | unset (static export on) | `false` |
| `AWCS_BASE_PATH` | `/awcs-website` | unset (site serves from the domain root) |

Setting `AWCS_STATIC_EXPORT=false` removes `output: 'export'`, and route handlers,
middleware, and server actions all start working. Nothing in `src/` changes.

**Recommended host: Vercel.** It is free at this size, it is the reference host for
Next.js so nothing needs adapting, and it gives preview deployments per pull
request. Netlify and Cloudflare Pages both work too.

---

## Stage 1 — the site as it stands (done)

- Nineteen pages across five sections: Home, About, Our Community, Families,
  Join Us, plus a Family Portal placeholder.
- Giving by Venmo, with the methods list built as data so more can be added.
- Contact by email link. No form, no backend, nothing to spam.
- Deploys to GitHub Pages on every push to `main`.

Outstanding before a wider launch: the draft copy listed in
[CONTENT-TODO.md](CONTENT-TODO.md), and real photographs in place of the
placeholders described in [PHOTO-CREDITS.md](PHOTO-CREDITS.md).

## Stage 2 — move to a domain and a real host

1. Buy the domain and point it at the host.
2. Set `AWCS_STATIC_EXPORT=false` and clear `AWCS_BASE_PATH`.
3. Set `NEXT_PUBLIC_SITE_URL` to the domain so canonical URLs and the social card
   resolve correctly.

Do this before Stage 3 — everything after here depends on it.

## Stage 3 — accounts and login

Suggested pieces:

- **[Auth.js](https://authjs.dev) (NextAuth v5)** for sessions. Email magic links
  suit this audience better than passwords: no password for a busy mother to
  forget or reset, and the co-op already communicates by email.
- **A hosted Postgres** — Neon or Supabase, both with usable free tiers — with
  **Prisma** or **Drizzle** for schema and queries.
- **Roles**, minimally `admin` (directors) and `member` (enrolled families).
  Keep it to two until a third is genuinely needed.

Suggested structure. `src/app/page.tsx` moves into a `(site)` group at this point
and the portal sits beside it:

```
src/app/
  (site)/            public pages — wrap in SiteShell as they do now
  (portal)/
    layout.tsx       auth boundary: redirect to sign-in when there is no session
    portal/          the family dashboard
    admin/           directors only, gated by role in middleware
  api/
    auth/[...nextauth]/route.ts
```

> Note: route groups are avoided today only because Next 16's **static export**
> mishandles their prefetch payload. Once the site runs on a server that bug is
> not in play, so the group structure above is safe from Stage 2 onward — and
> `scripts/flatten-rsc-payloads.mjs` can be deleted at the same time, along with
> the `&&` in the `build` script. See the README for what it works around.

Keep `/admin` out of the public nav and add `robots: { index: false }` to the
portal layout's metadata.

## Stage 4 — what members do once they are logged in

- **Important info** — documents, the calendar, the semester schedule.
- **Forms to sign** — start with the simplest thing that is legally sound: render
  the form, capture typed name + timestamp + IP, store an immutable record, email
  a copy to both parties. Reach for DocuSign or Dropbox Sign only if a real
  signature is actually required.
- **Payments for services** — see below.

The `/portal/` page already exists as a public placeholder describing what is
coming. When the real portal ships, that page becomes the sign-in route and the
nav entry stops being decorative.

## Stage 5 — payments

**Stripe** is the right fit: Checkout for one-off payments, Billing for recurring
giving, and Stripe Tax if it is ever needed. Concretely:

- A route handler creates a Checkout Session; the browser never sees a secret key.
- A **webhook** endpoint is what actually marks something paid. Do not mark a
  payment complete from the browser redirect — it is not trustworthy.
- Keep amounts server-side, keyed by a product id. Never accept a price from the
  client.

Once card giving is live, flip the `card` entry in `givingMethods`
(`src/content/home.ts`) to `available: true` and give it an `href` and `cta`. The
giving section will render it with no other change.

**Fees are worth a moment's thought.** Stripe takes roughly 2.9% + 30¢. For a small
co-op, Venmo and checks keep more of each gift, so it is reasonable to keep them
listed alongside cards rather than replacing them.

---

## Things to decide before building Stage 3

These are questions for leadership, not engineering:

- Who counts as a member — one account per family, or one per parent?
- Should prospective families be able to create an account, or is it invite-only
  once enrollment is accepted?
- Which forms genuinely need a signature, and which just need an acknowledgement?
- Should tuition be payable online, or does that add fee overhead for no real gain?
- What happens to a family's records when they leave the co-op?

---

## Deliberately not planned

- **A blog or CMS.** If the school starts publishing regularly, revisit — but
  Markdown files in the repo will carry it a long way first.
- **A public contact form.** The email link works, cannot be spammed, and needs no
  maintenance. Add a form only if the volume of email becomes a problem.
- **Photo galleries.** The handbook's photo policy requires parental consent for
  every child pictured. That is a process question to settle before it is a
  technical one.
