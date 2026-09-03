# Abiding Way Cottage School · Brand Kit

Source of truth for the website. Everything here was pulled directly from the 2026–2027 Family Handbook and the logo file. Load `tokens.css` first; the rest of this document explains how to use it.

Tagline: **A Charlotte Mason Enrichment Co-op**
Location: Jacksonville, FL
One-line description: A Christ-centered, parent-participation homeschool co-op rooted in Charlotte Mason's philosophy.

---

## 1. Personality

The handbook reads like a well-made book, not a brochure. Every design decision should feel **quiet, unhurried, and warm**.

Words that describe the brand: rooted · slow · living · gentle · literary · homespun · reverent

Words that do NOT: bright · playful · bubbly · corporate · techy · glossy

Guiding image: a hand-drawn cottage with a sun, a winding path, and wildflowers. Ink-on-paper. Think of the site as a printed handbook that happens to live on a screen.

---

## 2. Color

Sampled from the PDF pages. Use these exact values.

| Token | Hex | Role |
|---|---|---|
| `--aw-olive` | `#31331F` | **Primary.** Deep olive. Cover and closing pages, dark panels, all headline text on light backgrounds. |
| `--aw-cream` | `#EBE5DC` | **Page background.** The default light surface. |
| `--aw-cream-2` | `#E8E2DA` | Alternate light surface. Alternate sections between the two creams instead of adding new colors. |
| `--aw-linen` | `#D6C9B4` | Warm tan. Full-bleed divider/callout pages, secondary cards. |
| `--aw-linen-2` | `#D5CDBC` | Softer tan for cards sitting on cream. |
| `--aw-slate` | `#455763` | **Secondary.** Dusty blue. Used sparingly for a full-bleed statement section (the handbook uses it for the culture and Matthew 18 pages). |
| `--aw-bronze` | `#645D3B` | **Accent.** Muted olive-bronze for eyebrows, small labels, short rules. |
| `--aw-ink` | `#24221E` | Long body text on cream. |
| `--aw-stone` | `#A29E97` | Muted captions, page-number-style labels. |
| `--aw-stone-light` | `#C7C1B9` | Hairline borders on cream. |
| `--aw-olive-light` | `#595948` | Hairline borders on olive. |

Rules:
- Roughly **80% cream, 15% olive, 5% linen/slate/bronze**. The site should feel mostly light with deliberate dark moments (hero, footer, one or two statement panels).
- Olive and cream are the only two colors that carry text weight. Slate and linen are surfaces, not text colors.
- No pure white (`#FFFFFF`) and no pure black anywhere. No gradients. No drop shadows.
- Contrast: olive on cream and cream on olive both pass WCAG AAA. Bronze on cream passes AA for normal text at 16px+, and passes for the uppercase eyebrows at 11px because they are 500 weight; do not use bronze for long paragraphs.

---

## 3. Typography

Two families, both on Google Fonts. These are the exact fonts embedded in the handbook.

**Display: Cormorant Garamond** (Light 300, Regular 400, Medium 500, SemiBold 600, and italics)
**Body / UI: Inter** (Regular 400, Medium 500, SemiBold 600)

| Role | Face | Size (tokens.css) | Notes |
|---|---|---|---|
| Hero wordmark | Cormorant Light 300, second line Italic 400 | `--fs-hero` | Exactly as the cover: "Abiding Way" upright, "Cottage School" italic beneath it. |
| H1 | Cormorant Regular 400 | `--fs-h1` | Sentence case, ends with a period. E.g. "The way we teach." |
| H2 / H3 | Cormorant Regular 400 | `--fs-h2` / `--fs-h3` | |
| Lead / subtitle | Cormorant Italic 400 | `--fs-lead` | Sits directly under an H1. |
| Body | Inter Regular 400 | `--fs-body` 16px, line-height 1.65 | Max line length `--measure` (62ch). |
| Emphasis in body | Inter SemiBold 600 | | The handbook bolds key phrases inline; use it, but sparingly. |
| Eyebrow / label | Inter Medium 500, UPPERCASE, letter-spacing 0.22em | `--fs-eyebrow` 11px | This is the most recognizable brand device. Every section opens with one. |
| Captions / attribution | Inter Regular, uppercase tracked | `--fs-small` | Scripture references: "J O H N 1 5 : 4" style. |
| Pull quotes | Cormorant Italic, ~22px | `blockquote` | Attribution in tracked uppercase Inter beneath. |

Handbook heading pattern to copy on every page section:

```
EYEBROW IN TRACKED CAPS          ← Inter 500, bronze
The big heading.                 ← Cormorant 400, olive, ends in a period
An italic lead line that sets the tone.   ← Cormorant Italic
```

Numbered items use small roman numerals in tracked Inter (`i · ii · iii`) or spelled-out `I .` with spaces. Middle dots ( · ) separate metadata, as in "S E C T I O N I V · A S S E M B L Y".

---

## 4. Logo

Files in this folder:

- `logo-white.png` — original, white line art on transparent. Use on olive and slate backgrounds.
- `logo-cream.png` — recolored to `#E8E2DA`. Preferred version on olive (softer than pure white, matches the cover).
- `logo-olive.png` — recolored to `#31331F`. Use on cream and linen backgrounds.
- `logo-olive-512.png` — 512px version for favicon / touch icon generation.

All are 1500×1500 with a lot of transparent padding; the circle occupies roughly the center 70%. Give it room. Minimum display size 80px; the interior cottage detail disappears below that, so use just a plain circle or the "AW" initials for a favicon at 32px.

Rules:
- The logo is a single-color line drawing. Never fill, add color, add a shadow, or place it on a photo without a solid overlay.
- Keep the circle intact. Do not crop it into a square or remove the ring.
- Do not rebuild the wordmark in a different font; the wordmark inside the logo is fixed, but the site's typographic wordmark ("Abiding Way / Cottage School" in Cormorant) can stand alone in the nav and hero.

---

## 5. Layout & structure

- **Square corners everywhere.** `--radius: 0`. No rounded buttons, cards, or images.
- **Hairline rules** (1px, `--aw-stone-light` on cream, `--aw-olive-light` on olive) separate content. A short centered 4rem rule (`.rule-short`) sits between a hero title and its subtitle.
- **Inner frame.** The cover and closing pages have a thin border inset about 1.5rem inside the page edge. Reuse this on the hero and footer (`.framed`).
- **Header/footer meta line.** Every handbook page has "A B I D I N G  W A Y" top-left and the section name top-right in tracked caps. The site nav can echo this: wordmark left, section labels right, all uppercase 11px tracked.
- **Cards.** Flat panels with no border and no shadow. Either an olive panel on cream (the Book Club box) or a linen panel on cream. Padding generous (2rem+).
- **Two-column with a sidebar.** The handbook's most common page: prose column on the left at 62ch, a dark card or pull quote on the right.
- **Whitespace is the main decoration.** Section padding `--section-y` (4–8rem). If a section feels empty, that is correct.
- Grid: 12 columns, container `72rem`, gutters `clamp(1.25rem, 4vw, 3rem)`.

Suggested page rhythm for the homepage:

```
[ olive hero, framed: logo, wordmark, tagline, short rule, one line ]
[ cream: eyebrow + H1 + lead + 62ch prose, dark card at right ]
[ linen band: the three words Truth · Beauty · Goodness ]
[ cream-2: A day at co-op, timeline as a simple ruled list ]
[ slate statement panel: one Scripture verse, centered, italic ]
[ cream: who we teach (Nursery / Kinderleben / Main), three flat columns ]
[ olive footer, framed: logo, contact, Charlotte Mason quote ]
```

---

## 6. Motion

Almost none. Acceptable: a slow fade-up on section entry (400ms, ease-out, 12px translate), link underline transitions. Nothing bounces, slides, parallaxes, or auto-plays. Respect `prefers-reduced-motion`.

---

## 7. Imagery

The handbook uses no photography, only line art and typography. If the site adds photos:
- Natural light, muted, warm. Children reading, nature, hands doing handicrafts. No stock-smile group shots.
- Desaturate slightly and warm the tone so photos sit on cream without popping.
- Photo policy from the handbook: only post photos of your own children, and get a parent's permission first. Assume every child photo on the site needs written consent.

Illustration: any additional drawings should match the logo's single-weight ink line style.

---

## 8. Voice & copy

Tone: warm, literary, unhurried, sincere. Write like a letter from a friend who reads a lot.

- Sentence-case headings that end with a period: "A welcome to your family."
- Use "we" and "our" throughout. The audience is mothers considering joining.
- Scripture and Charlotte Mason quotes are core content, not decoration. Attribute in tracked caps.
- Vocabulary to use naturally: living books, narration, habit training, atmosphere, wonder, feast, Kinderleben, masterly inactivity, mother culture.
- Avoid: "unlock," "empower," "journey," "world-class," exclamation points, emoji, and anything that sounds like a startup.

Key phrases already written (reuse verbatim):
- "Rooted in Christ, we grow in wisdom, delight in wonder, and glorify God in all things."
- "Education is an atmosphere, a discipline, a life." — Charlotte M. Mason
- "Abide in me, and I in you…" — John 15:4
- The six commitments: Christ at the center · Living over lifeless · Slow & thoughtful · Habit as kindness · Wonder protected · Mothers, together
- The three atmosphere words: Truth · Beauty · Goodness

---

## 9. Facts for the site

- Meets Wednesdays, September through May, 9:30 a.m. to 1:30 p.m. The day opens with assembly; there is no earlier arrival window.
- Location: Reach Church, 4815-200 Executive Park Ct, Ste 200, Jacksonville, FL 32216
- Ages: Nursery (2 & under), Kinderleben (3–5), Main Subjects (6–11)
- Subjects: Shakespeare, Poetry, Picture Study, Music/Composer Study, Handicrafts, Folk Dance, Swedish Drill, Balance & Coordination, Narration, Spanish
- Enrollment: $300 per family; $25 background check per adult; uniform t-shirt $15 child / $18 adult
- Email: abidingwaycottageschool@gmail.com
- Venmo: @abidingwaycottageschool
- Leadership: Lily Anderson and Bethany Lynch, Co-Directors
- Communication happens through the BAND app

Check with leadership before publishing the phone numbers or the full fee/policy detail; the handbook is a family document and not everything in it belongs on a public site.

---

## 10. Quick start for Claude Code

1. Copy `tokens.css` and the logo files into the repo (e.g. `/assets/brand/`).
2. Link `tokens.css` before any page styles.
3. Build every section with the eyebrow → heading → lead pattern from section 3.
4. Use only the surface classes (`.surface-dark`, `.surface-slate`, `.surface-linen`, `.surface-alt`) to change backgrounds; never invent new colors.
5. Before shipping, remove one decorative element from every page. If it still looks like the handbook, it is right.
