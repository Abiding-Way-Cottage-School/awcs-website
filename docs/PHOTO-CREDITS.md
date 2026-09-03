# Photography

One photograph — `children-together.jpg`, the homepage hero — was taken at the
school and belongs to it. Every other photograph in `public/photos/` is from
**[Pexels](https://www.pexels.com)** and is used under the
[Pexels License](https://www.pexels.com/license/): free to use, including
commercially, with no attribution required and no permission needed.

Attribution is not required, but the source IDs are recorded here so any image can
be traced, re-downloaded at a different size, or replaced.

## Why these images

The brand kit says the handbook uses no photography at all, and that if the site
adds photos they should be *"natural light, muted, warm… no stock-smile group
shots."* It also notes that real photographs of children require written parental
consent.

Two rules follow, and both are deliberate:

1. **No identifiable faces.** Every image is a still life, a landscape, a pair of
   hands, or a child seen from behind. A stock photograph of a stranger's child on
   a school website implies, to a visiting parent, that the child is a student here.
2. **Warmed and desaturated in CSS**, not baked into the files — the `.photo img`
   rule in `src/styles/site.css` applies `saturate(0.85) sepia(0.1) contrast(0.97)`
   so the photographs sit on cream without popping. Real photographs will inherit
   the same treatment when they replace these.

## Replacing them with real photographs

These are placeholders. Real photographs of the co-op will always be better, and the
swap is a file-for-file replacement — keep the filename, drop the new image in, and
update the alt text in `src/content/site.ts`.

Before publishing any photograph of a child, get the parent's written permission.
The handbook's policy is that families post only photographs of their own children;
a public website is a higher bar than a family group, not a lower one.

## The school's own photograph

`children-together.jpg` is the only photograph here of real people connected to
the school: the children of the co-op in a line, arms around one another, in the
"I am, I can, I ought, I will" shirts, under live oaks. It holds the homepage
hero.

It follows the same no-identifiable-faces rule as the rest of the set — every
child is turned away from the camera — but it differs from everything else here
in one way that matters: **the subjects are real students, not licensed stock.**
Publishing it is the school's call to make, and the usual condition is a photo
release from the family of every child in the frame. Worth confirming that is on
file before the site is promoted widely, and worth re-checking each time another
real photograph is added.

The deployed version is not the camera original. The photograph was taken in
front of an office building and its car park, visible through the trees, and
the school used Google Gemini to replace that background with foliage. Nothing
about the children was changed. Both versions are kept in the gitignored
`/source-photos/`: the camera original `awcs-children-together.jpeg`
(3268x2451, 5.6MB) and the edited export `awcs-children-together-gemini.jpg`.

Gemini exported the edit at only 1195x896, so unlike every other photograph
here the web version is served at that native size rather than 1800px. On a
high-density desktop display the hero will look softer than the rest of the
set. If a sharper version is wanted, re-run the edit at a larger output size
and drop the result into `/source-photos/` — the alt text and content wiring
do not need to change.

| File | Origin | Used for |
| --- | --- | --- |
| children-together.jpg | The school's own photograph | Homepage hero |

## Supplied by the school

These six were chosen by the school and take priority — they hold the hero, the
homepage feature cards, the Scripture band, and the Our Story, Our Leadership,
The Feast, For Mothers, Who It's For and Visit Us page headers.

They arrived as full-resolution originals (up to 7669px, 3.4MB). The versions in
`public/photos/` are resized to a 1800px maximum and re-encoded; the originals are
kept in `/source-photos/` at the repo root, which is gitignored and never deployed.

| File | Original | Used for |
| --- | --- | --- |
| hand-in-hand.jpg | pexels-alena-32974299 | Homepage hero, Visit Us |
| watercolor-set.jpg | pexels-cottonbro-4709828 | The Feast, "a generous feast" |
| dancing-circle.jpg | pexels-elly-fairytale-4834133 | Our Story, For Mothers |
| arms-linked.jpg | pexels-mayaramombellifotografias-38816417 | Our Leadership, "mothers, together" |
| child-studying.jpg | pexels-mikhail-nilov-8923543 | Who It's For, "a living education" |
| silhouette-sunset.jpg | pexels-vladimirsrajber-27637122 | Homepage Scripture band |

> **Two of these show faces** — `dancing-circle` and `child-studying`. That is a
> departure from the no-identifiable-faces rule the rest of the set follows, and it
> was a deliberate choice by the school. Worth knowing if the rule matters later:
> a stock child's face on a school site can read to a visiting parent as a student
> here. Both are licensed stock, so there is no consent issue with the subjects
> themselves.

## Other sources

| File | Pexels ID | Page |
| --- | --- | --- |
| book-old-hands.jpg | 5937897 | https://www.pexels.com/photo/5937897/ |
| book-pages.jpg | 13580974 | https://www.pexels.com/photo/13580974/ |
| books-held.jpg | 8762862 | https://www.pexels.com/photo/8762862/ |
| bowl-linen.jpg | 6962747 | https://www.pexels.com/photo/6962747/ |
| candle-dried.jpg | 6794901 | https://www.pexels.com/photo/6794901/ |
| child-reading.jpg | 8342190 | https://www.pexels.com/photo/8342190/ |
| children-walking.jpg | 4982481 | https://www.pexels.com/photo/4982481/ |
| dried-grass.jpg | 7163189 | https://www.pexels.com/photo/7163189/ |
| field-golden.jpg | 6195790 | https://www.pexels.com/photo/6195790/ |
| hero-path.jpg | 10979 | https://www.pexels.com/photo/10979/ |
| knitting-hands.jpg | 5691896 | https://www.pexels.com/photo/5691896/ |
| light-wall.jpg | 12121995 | https://www.pexels.com/photo/12121995/ |
| misty-field.jpg | 16682740 | https://www.pexels.com/photo/16682740/ |
| pressed-flowers.jpg | 11066932 | https://www.pexels.com/photo/11066932/ |
| woodwork-hands.jpg | 13005858 | https://www.pexels.com/photo/13005858/ |
| wool-basket.jpg | 5788376 | https://www.pexels.com/photo/5788376/ |
