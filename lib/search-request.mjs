export function readSearchRequest(url) {
  const query = url.searchParams.get('query') ?? '';
  const locale = url.searchParams.get('locale') ?? 'en';
  if (query.length > 256) throw new Error('Search query is too long.');
  if (locale !== 'en' && locale !== 'ka') throw new Error('Unsupported search language.');
  return { query: query.trim(), locale };
}
