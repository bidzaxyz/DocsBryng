import { createMDX } from 'fumadocs-mdx/next';
const basePath = process.env.DOCS_BASE_PATH || '';
export default createMDX()({
  basePath,
  poweredByHeader: false,
  agentRules: false,
  env: {
    NEXT_PUBLIC_DOCS_BASE_PATH: basePath,
    DOCS_DEPLOY_CONTEXT: process.env.CONTEXT || process.env.VERCEL_ENV || '',
  },
  async redirects() {
    return [
      { source: '/index', destination: '/', permanent: true },
      { source: '/ka/index', destination: '/ka', permanent: true },
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ...(process.env.NODE_ENV !== 'production' ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
    ] }];
  },
});
