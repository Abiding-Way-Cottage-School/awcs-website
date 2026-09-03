/**
 * Resolve a path in /public.
 *
 * This once prefixed the GitHub Pages basePath (/awcs-website). The site now
 * serves from the domain root, so it only validates the shape of the path; it
 * stays as the single call site to change if a CDN prefix is ever needed.
 */
export function asset(path: string): string {
  if (!path.startsWith('/')) {
    throw new Error(`asset() expects a root-relative path, received "${path}"`);
  }
  return path;
}
