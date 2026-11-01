# Bryng Docs

Mintlify documentation for developers, API users, and business admins.

Connect this repository in Mintlify with the documentation directory set to the
repository root, where `docs.json` lives.

## Local editing

Install the official Mintlify CLI (`npm install -g mint`), then run `mint dev`
from this directory. Content lives in MDX files; navigation and branding live in
`docs.json`.

Mintlify can publish automatically when a connected branch changes. Review
changes locally and obtain approval before pushing release content.

## Content structure

English articles live at the repository root; Georgian translations mirror them
in `ka/`. Keep both versions aligned. Developer information and Business dashboard
guides have separate navigation tabs. Initial guides cover setup, products,
payments, websites, and support.

Mintlify does not currently accept Georgian in its native language configuration.
An English / ქართული dropdown selects mirrored navigation instead. Built-in
platform labels retain Mintlify’s default language. `locale.js` sets the page
language to `ka` for Georgian routes and updates it after navigation. Georgian
uses the approved self-hosted Noto Sans Georgian font as the Onest fallback.

The default template quickstart and contributor instructions are excluded with
`.mintignore`. Validate with `mint validate` and `mint broken-links`.

`docsbryng` is the repository connected during onboarding; the earlier
`bryngdocs` repository contains the initial bootstrap only.
