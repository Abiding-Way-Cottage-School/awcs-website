/**
 * Prefix a path in /public with the deployment's basePath.
 *
 * GitHub Pages serves a project repo from /<repo>, so `/brand/logo.png` has to
 * become `/awcs-website/brand/logo.png`. Next rewrites `next/link` hrefs and
 * bundled asset URLs for us, but `next/image` with `unoptimized: true` — which
 * a static export forces — passes `src` through untouched, so images need this
 * by hand. On a custom domain AWCS_BASE_PATH is empty and this is a no-op.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  if (!path.startsWith('/')) {
    throw new Error(`asset() expects a root-relative path, received "${path}"`);
  }
  return `${basePath}${path}`;
}
