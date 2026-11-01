import { createSearchAPI } from 'fumadocs-core/search/server';
import { enSource, kaSource } from '@/lib/source';
import { readSearchRequest } from '@/lib/search-request.mjs';

const search = createSearchAPI('advanced', {
  localeFilter: true,
  indexes: [enSource, kaSource].flatMap((source, index) =>
    source.getPages().map(page => ({
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      structuredData: page.data.structuredData,
      locale: index === 0 ? 'en' : 'ka',
    })),
  ),
});

export async function GET(request: Request) {
  let input;
  try {
    input = readSearchRequest(new URL(request.url));
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
  // Public text search only. Client parameters cannot enable vectors or unbound results.
  const results = input.query
    ? await search.search(input.query, { locale: input.locale, limit: 20, mode: 'full' })
    : [];
  return Response.json(results, { headers: { 'Cache-Control': 'no-store' } });
}
