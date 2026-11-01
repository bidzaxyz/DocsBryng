# Bryng documentation

- Docs use Fumadocs UI/Core and Fumadocs MDX on Next.js in this repository.
- English articles live in `content/docs/en/`; Georgian mirrors them in
  `content/docs/ka/`. Keep them aligned, use `ka`, and preserve public paths
  (`/`, `/developers/*`, `/portal/*`, `/support` and their `/ka` equivalents).
- Keep developer/API material separate from Business dashboard guides. Document
  only supported public contracts; never publish private routes or credentials.
- Use approved Bryng logo assets unchanged, Onest/Noto Sans Georgian, and blue
  `#3B82F6`. Assets live in `public/`. No Ask AI or AI chat in documentation.
- Keep content truthful; do not invent capabilities or dates.
- Work locally until the user approves the pending combined release. Do not push
  or deploy; hosting and domain cutover remain pending that approval.
- Review at `http://127.0.0.1:4173/docs/` through the existing frontend proxy.
  `npm run dev` binds strictly to loopback 4176 with `/docs` as a local base path.
  Production builds use the domain root. Leave review servers running.
- Verify with `npm run typecheck`, `npm run build`, and browser checks of English,
  Georgian, search, article links, and responsive navigation.
