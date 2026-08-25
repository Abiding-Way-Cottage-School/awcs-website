/**
 * Abiding Way Cottage School
 *
 * Two deployment modes, one codebase:
 *
 *   1. STATIC (today) — `output: 'export'` emits plain HTML/CSS/JS into ./out,
 *      which GitHub Pages serves for free. No server, so no auth, no API routes.
 *
 *   2. SERVER (when the domain moves to Vercel / Netlify / Cloudflare) — set
 *      AWCS_STATIC_EXPORT=false and the export + basePath machinery below drops
 *      away, unlocking route handlers, middleware, Auth.js sessions and Stripe.
 *      Nothing in src/ has to change. See docs/ROADMAP.md.
 */

// GitHub Pages serves a project repo from /<repo>, so assets need a prefix.
// A custom domain serves from the root, so it must not. Set AWCS_BASE_PATH=''
// (or drop the env var from the workflow) the day the domain goes live.
const basePath = process.env.AWCS_BASE_PATH ?? '';
const isStatic = process.env.AWCS_STATIC_EXPORT !== 'false';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStatic ? { output: 'export' } : {}),
  basePath: basePath || undefined,
  // Static hosts have no image optimiser; serve the originals untouched.
  images: { unoptimized: isStatic },
  // GitHub Pages resolves /about to /about/index.html, so emit directories.
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
