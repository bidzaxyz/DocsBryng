# Bryng Docs

Fumadocs documentation for developers and business managers, using Next.js,
local MDX, and Bryng's approved logo assets and self-hosted fonts. The site has
article navigation, a table of contents, document search, light/dark themes,
and English/Georgian language switching. Ask AI is intentionally absent.

## Local review

Use Node >=22.12, then `npm ci` and `npm run dev`. The docs server binds strictly
to `127.0.0.1:4176` with a `/docs` base path. The existing `bryngFE` development
server proxies it at **http://127.0.0.1:4173/docs/**; keep that review server running.
There is no backend/database or external search service for documentation.

## Content

- English: `content/docs/en/`; Georgian: `content/docs/ka/`.
- Navigation order and section names: each folder's `meta.json`.
- Public paths remain `/`, `/developers/overview`, `/portal/*`, `/support`, and
  their `/ka` equivalents. Switching language preserves the current article.
- MDX components in `mdx-components.tsx` adapt the existing guides to Fumadocs.
- Assets and font licenses: `public/images/` and `public/fonts/`.

Use `npm test`, `npm run typecheck`, and `npm run build` before release. `npm start` serves
the production build; production builds use the domain root unless
`DOCS_BASE_PATH` is explicitly set when building.

## Release

This replaces the Mintlify configuration in the active `docsbryng` repository.
`bryngdocs` is an older bootstrap and is not the migration target. Mintlify
publishing, hosting replacement, and the `docs.bryng.xyz` DNS cutover must not
be triggered until the user approves the pending combined release. The new app
needs Next.js-capable hosting configured to build with `npm run build`; existing
Mintlify hosting cannot serve this app. Retain the live docs until cutover.
`proxy.ts` sends `X-Robots-Tag: noindex, nofollow` unless the request is for
`docs.bryng.xyz` in production. Provider preview/branch metadata also excludes
indexing, including when testing a production host header. There is no indexing
release toggle. Canonicals and the sitemap reference the public docs origin.

After the new hosting target is approved and verified, switch the Cloudflare
`docs` record to that target, verify HTTPS and existing routes, then remove the
custom-domain binding from Mintlify. Do not remove the Mintlify binding while
DNS still points there. Review unused Mintlify GitHub/DNS integration access
separately after cutover; public DNS cannot establish what account permissions
were granted. Keep the old deployment available until the switch is verified.

## Implementation boundaries

Only repository-controlled MDX is compiled; it is executable trusted source, not
an input format for untrusted uploads. `content/docs/` is the complete published
and searchable content boundary. Internal review notes and backend documentation
must stay outside it. The docs app has no authentication, customer records,
payment operations, database connection, or model calls. Search is local text
search over these public articles, with a 256-character input bound, supported
language validation, and a fixed 20-result limit.

Basic response protections deny framing and embedded objects and limit base/form
origins. This is not a nonce-based script CSP or a replacement for host-level
traffic limits. The two language trees share `components/article.tsx`; route
modules do not import each other. Header, search, and accessibility labels have
Georgian translations. Ask AI stays absent.
