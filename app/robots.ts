import type { MetadataRoute } from 'next';
import { docsOrigin } from '@/lib/site-policy.mjs';

export default function robots(): MetadataRoute.Robots {
  // Let crawlers read the noindex response header on nonproduction hosts.
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${docsOrigin}/sitemap.xml` };
}
