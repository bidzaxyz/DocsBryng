import assert from 'node:assert/strict';
import test from 'node:test';
import { shouldIndex } from '../lib/site-policy.mjs';
import { readSearchRequest } from '../lib/search-request.mjs';

test('only the public docs host on a production deployment can index', () => {
  const production = { NODE_ENV: 'production', CONTEXT: 'production' };
  assert.equal(shouldIndex('docs.bryng.xyz', production), true);
  for (const hostname of ['127.0.0.1', 'localhost', 'deploy-preview-42.netlify.app', 'docs.bryng.xyz.evil.test', 'bryng.xyz']) {
    assert.equal(shouldIndex(hostname, production), false, hostname);
  }
  for (const env of [
    { NODE_ENV: 'development' },
    { NODE_ENV: 'production', CONTEXT: 'deploy-preview' },
    { NODE_ENV: 'production', CONTEXT: 'branch-deploy' },
    { NODE_ENV: 'production', VERCEL_ENV: 'preview' },
  ]) assert.equal(shouldIndex('docs.bryng.xyz', env), false);
});

test('search validates length and supported language before entering the engine', () => {
  const read = params => readSearchRequest(new URL(`https://docs.bryng.xyz/api/search?${new URLSearchParams(params)}`));
  assert.deepEqual(read({ query: '  payments  ' }), { query: 'payments', locale: 'en' });
  assert.deepEqual(read({ query: 'გადახდები', locale: 'ka', limit: '999999', mode: 'vector' }), { query: 'გადახდები', locale: 'ka' });
  assert.deepEqual(read({}), { query: '', locale: 'en' });
  assert.throws(() => read({ query: 'x'.repeat(257) }), /too long/);
  assert.throws(() => read({ query: 'x', locale: 'unknown' }), /Unsupported/);
});
