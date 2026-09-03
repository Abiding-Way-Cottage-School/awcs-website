/**
 * Work around a Next 16 static-export bug in the App Router prefetch payloads.
 *
 * When a route has more than one path segment, `next build` with
 * `output: 'export'` writes the RSC prefetch payload into a DIRECTORY whose
 * inner path uses "/" as the segment separator:
 *
 *     out/about/philosophy/__next.about/philosophy/__PAGE__.txt
 *
 * but the router asks for the same payload with "." as the separator:
 *
 *     /about/philosophy/__next.about.philosophy.__PAGE__.txt
 *
 * On a static host every one of those requests 404s. The page still renders —
 * the router falls back to a full navigation — but each page load fires a
 * 404 per prefetched link, which pollutes logs and defeats prefetching.
 *
 * This copies each payload to the flat, dotted name the router expects. The
 * originals are left in place: they are a few hundred bytes each and keeping
 * them means nothing breaks if a future Next version starts reading them.
 *
 * Delete this script (and the postbuild hook in package.json) once Next emits
 * the flat names itself — the "nothing to do" branch below will tell you.
 */
import { readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';

const OUT = 'out';

// Server deployments (AWCS_STATIC_EXPORT=false, e.g. Vercel) build into .next,
// not out/. There is no static payload to rename and no out/index.html, so bail
// out before the sanity check at the bottom fails the build.
if (process.env.AWCS_STATIC_EXPORT === 'false') {
  console.log('flatten-rsc-payloads: skipped — this is a server build, not a static export.');
  process.exit(0);
}

/** Every directory in `out` whose name starts with "__next." */
function findPayloadDirs(dir, found = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith('__next.')) {
      found.push(full);
    } else {
      findPayloadDirs(full, found);
    }
  }
  return found;
}

/** Every file inside a payload directory, as a path relative to that directory. */
function filesUnder(dir, prefix = '', found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) filesUnder(full, rel, found);
    else found.push(rel);
  }
  return found;
}

let copied = 0;

for (const payloadDir of findPayloadDirs(OUT)) {
  const parent = dirname(payloadDir);
  const prefix = basename(payloadDir); // e.g. "__next.about"

  for (const rel of filesUnder(payloadDir)) {
    // "leadership/__PAGE__.txt" -> "__next.about.leadership.__PAGE__.txt"
    const flatName = `${prefix}.${rel.split('/').join('.')}`;
    const target = join(parent, flatName);
    copyFileSync(join(payloadDir, rel), target);
    copied += 1;
  }
}

if (copied === 0) {
  console.log(
    'flatten-rsc-payloads: nothing to do — Next appears to emit flat payload ' +
      'names now, so this script and its postbuild hook can be removed.',
  );
} else {
  console.log(`flatten-rsc-payloads: wrote ${copied} flat prefetch payload(s).`);
}

// Sanity check: `out` should exist and contain an index.
try {
  statSync(join(OUT, 'index.html'));
} catch {
  console.error('flatten-rsc-payloads: out/index.html is missing — did the build run?');
  process.exit(1);
}
