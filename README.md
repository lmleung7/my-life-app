# My Life app

Static web front end for the My Life project: a few plain files, no build step, served by GitHub Pages.

Live: https://lmleung7.github.io/my-life-app/

## What it does

Google sign-in, then read-only views of data in Supabase, one page per module:

| File | Role |
|---|---|
| `index.html` | Landing page: sign-in, checks which modules this account can open, links to them |
| `receipts.html` | Receipts module, for allowlisted family accounts |
| `statements.html` | Statements module, for the owner account only |
| `shared.js`, `shared.css` | Supabase client, session guard and nav/base styles used by every page |

The statement overview and detail views show a net total (money in − money out), always with a + or − sign. The overview adds one net total for the current selection, split per currency and never summed across currencies. It follows the "leave out transfers" toggle.

Each module page checks the session itself and sends signed-out visitors back to `index.html`. Hiding a link on the landing page is convenience only: access is enforced by row-level security in the database, not by these pages.

Old bookmarks (`index.html#/st/...`, `#/receipts`) redirect to the new pages. `?demo=1` shows the Statements module with invented data and no sign-in.

To add a module: a new `<name>.html` that loads `shared.js`, calls `guardPage(...)`, plus a probe and a card on the landing page.

## This repo is public

It holds the app files listed above plus its CI config (`.github/`, `.htmlvalidate.json`). It must never contain:
- the Supabase `service_role` key, database password or Google OAuth client secret
- docs, schema, migrations, skills or any private data

The Supabase project URL and **publishable** key inside `shared.js` are safe to publish.

The project's docs, data model, decision log, skills and migrations live in the private repo `lmleung7/my-life`.

## Workflow and CI

`main` is deployed to GitHub Pages, so every change goes through a pull request. Two checks run on every PR and on `main`:

- **HTML validation**: `html-validate` on `index.html`, `receipts.html` and `statements.html` (config in `.htmlvalidate.json`; two style-only rules are off).
- **Secret scan**: fails on Supabase secret keys, `service_role` JWTs or assignments, Google OAuth client secrets, private keys, AWS and GitHub tokens, and database URLs with passwords. It prints file, line and rule only, never the value, because CI logs are public.

Commit style: conventional commits (`feat:`, `fix:`, `chore:`).

## Hosting

Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`.

Supabase → Authentication → URL Configuration: Site URL and a Redirect URL must both be `https://lmleung7.github.io/my-life-app/` (trailing slash matters).
