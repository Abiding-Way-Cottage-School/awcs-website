/**
 * Abiding Way Cottage School
 *
 * Served by Vercel as a Node.js server, which is what the Family Portal needs:
 * route handlers, server actions, cookies and the proxy are all unavailable
 * in a static export. The site was a static export on GitHub Pages until the
 * domain moved; that mode, its basePath prefix and its post-build workaround
 * were retired when the portal arrived. See README.md "Deploying".
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Kept from the static era so every existing URL (/about/ etc.) still resolves.
  trailingSlash: true,
};

export default nextConfig;
