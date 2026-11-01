export const docsOrigin = 'https://docs.bryng.xyz';

// Provider deployment metadata is automatic, not a product release switch.
export function isProductionDeployment(env = process.env) {
  return env.NODE_ENV === 'production'
    && (!env.CONTEXT || env.CONTEXT === 'production')
    && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production');
}

export function shouldIndex(hostname, env = process.env) {
  return isProductionDeployment(env) && hostname.toLowerCase() === 'docs.bryng.xyz';
}
