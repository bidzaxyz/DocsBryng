export const docsOrigin = 'https://docs.bryng.xyz';

// Provider deployment metadata is automatic, not a product release switch.
// Read literal properties so Next can inline build metadata in the edge bundle.
// Passing process.env wholesale loses NODE_ENV on Netlify's edge runtime.
export function isProductionDeployment(env = {
  NODE_ENV: process.env.NODE_ENV,
  CONTEXT: process.env.DOCS_DEPLOY_CONTEXT || process.env.CONTEXT,
  VERCEL_ENV: process.env.VERCEL_ENV,
}) {
  return env.NODE_ENV === 'production'
    && (!env.CONTEXT || env.CONTEXT === 'production')
    && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production');
}

export function shouldIndex(hostname, env) {
  return isProductionDeployment(env) && hostname.toLowerCase() === 'docs.bryng.xyz';
}
