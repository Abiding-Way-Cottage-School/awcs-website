# Content still to confirm

The site is built and every page is complete, but some of the prose was **written
to the right tone without the underlying facts**. Everything below is marked with a
`DRAFT` comment in the content files. Nothing here is wrong in a dangerous way, but
none of it should be relied on by a family until leadership has confirmed it.

Search the codebase for `DRAFT` to find every instance.

## Needs real information

| Where | File | What is needed |
| --- | --- | --- |
| **Our Story** | `src/content/about.ts` → `story.body` | The whole narrative is invented. Who started the co-op, in what year, what prompted it, how many families at the start. |
| **Leadership bios** | `src/content/about.ts` → `leadership.people` | Names and roles are correct (from the handbook). The `bio` field is deliberately **empty** — we will not publish invented claims about real people. Ask Lily and Bethany for two or three sentences each. |
| **Calendar** | `src/content/families.ts` → `calendar` | Entirely placeholder. The page shows a visible warning banner until `isDraft` is set to `false`. Replace every row with the real 2026–2027 dates. |
| **Mid-day schedule** | `src/content/community.ts` → `aDay.schedule` | The day opens with assembly at 9:30 and ends at 1:30; there is no separate arrival window. Both are handbook facts. The 10:00, 12:00 and 12:30 blocks are a reasonable reconstruction — check them. |
| **What to bring** | `src/content/community.ts` → `aDay.bring` | A sensible list, not from the handbook. |
| **What the co-op asks** | `src/content/community.ts` → `forMothers.asks` | Fair for a participation co-op, but confirm the specifics: how many roles, whether preparation is weekly, the background-check policy. |
| **Visit process** | `src/content/join.ts` → `visit.steps` | Invented but plausible. Confirm, and say whether visits are limited to particular weeks. |
| **Application process** | `src/content/join.ts` → `apply.steps` | Invented but plausible. Confirm the real steps, the enrollment window, and whether there is a waiting list. |
| **FAQ answers** | `src/content/families.ts` → `faq` | Times, location, ages, subjects and fees are handbook facts. The rest is reasoned rather than quoted — particularly the answers on mid-year joining and additional needs. |
| **Not included in tuition** | `src/content/families.ts` → `tuition.notIncluded` | A reasonable list; confirm. |
| **"May not be a fit" list** | `src/content/families.ts` → `whoItsFor.fit.less` | Deliberately honest and therefore worth a leadership read for tone. |

## Confirmed as published

These came from the 2026–2027 Family Handbook and are on the site as fact:

- Meeting day, season, and the 9:30 / 1:30 times
- Location: Reach Church, 4815-200 Executive Park Ct, Ste 200, Jacksonville, FL 32216
- Age groups: Nursery (2 & under), Kinderleben (3–5), Main Subjects (6–11)
- The full subject list
- The six commitments and the three atmosphere words
- Email address and Venmo handle
- Director names and roles
- **Fees** — $300 per family, $25 background check, $15/$18 uniform shirts. Shown
  as *approximate and confirmed at enrollment*, per leadership's instruction.

## Deliberately withheld

- **Leadership phone numbers.** In the handbook, not on the site.
- **Full policy detail.** The handbook is a family document; the site links families
  to the directors instead.
