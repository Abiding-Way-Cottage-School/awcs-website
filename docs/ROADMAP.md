# Roadmap — from brochure site to family portal

The public site is complete. This document records how the
member area, `/admin`, form signing, and payments get added, and why the current
setup does not have to be undone to get there.

---

## The constraint that shaped the early stages (now lifted)

The site began as a static export on GitHub Pages: no server, so nowhere to hold a
session, verify a webhook, or store a signed form. Moving to Vercel as a Node.js
server lifted that constraint, and the static mode was retired outright when the
portal arrived — a static export forbids the proxy, route handlers, cookies and
server actions the portal is built on. `next.config.mjs` is now a plain server
config with no environment switches.

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

## Stage 2 — move to a domain and a real host (done)

`abidingwaycottageschool.com` is registered at GoDaddy and served by Vercel as a
Node.js server, with `NEXT_PUBLIC_SITE_URL` set to the domain. Route handlers, the
proxy, and server actions are therefore available — everything Stage 3 onward
depends on. See the Deploying section of [../README.md](../README.md).

The GitHub Pages mirror was retired with the portal; a static export cannot host
any of it.

## Stage 3 — accounts and login (done)

What was chosen, and why:

- **[Auth.js](https://authjs.dev) v5** with its built-in **Resend** provider:
  magic links by email, JWT sessions, no passwords. Sign-in is invite-only — a
  director adds a family's address before it can get a link — with
  `ADMIN_EMAILS` as the bootstrap for the first director.
- **Neon Postgres** with **Drizzle**; migrations generated into `drizzle/` and
  committed.
- **Two roles**, `admin` (directors) and `family`. The family's name is a
  profile field, not a credential.

The portal has its own shell (`src/components/portal/PortalShell.tsx`) rather
than `SiteShell`, and sits beside the public pages without a route group:

```
src/
  proxy.ts               cookie-only redirect for /portal and /admin
  auth.ts, auth.config.ts
  db/                    schema + lazy db() handle
  lib/dal/               requireUser(), requireAdmin() — the real gate
  app/
    portal/              layout (shell, noindex) · sign-in · verify · error · home
    admin/               layout (shell, noindex) · redirects to /admin/users/
    api/auth/[...nextauth]/route.ts
```

Auth is checked in the data layer and in every page, server action and route
handler — never only in a layout, which does not re-render on navigation and
cannot stop a child segment from running. See the "Family portal" section of
[../README.md](../README.md).

## Stage 4 — what members do once they are logged in

- **Important info** — documents, the calendar, the semester schedule.
- **Forms to sign** — start with the simplest thing that is legally sound: render
  the form, capture typed name + timestamp + IP, store an immutable record, email
  a copy to both parties. Reach for DocuSign or Dropbox Sign only if a real
  signature is actually required.
- **Payments for services** — see below.

Sign-in lives at `/portal/sign-in/` and the family home at `/portal/`; the
header's Family Portal entry now leads somewhere real.

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

## Things to decide before building Stage 4

Stage 3 settled two of these: one account per family, keyed by the email a
director adds, and invite-only sign-in. The rest are questions for leadership,
not engineering:

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
