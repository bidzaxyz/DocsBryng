import type { MetadataRoute } from 'next';
import { enSource, kaSource } from '@/lib/source';
import { docsOrigin } from '@/lib/site-policy.mjs';

export default function sitemap(): MetadataRoute.Sitemap {
  return [enSource, kaSource].flatMap(source => source.getPages().map(page => ({
    url: `${docsOrigin}${page.url}`,
  })));
}
