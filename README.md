# My Life app

Static web front end for the My Life project. One file: `index.html`, served by GitHub Pages.

Live: https://lmleung7.github.io/my-life-app/

## What it does

Google sign-in, then read-only views of data in Supabase:
- **Receipts** for allowlisted family accounts
- **Statements** tab for the owner account only

Access is enforced by row-level security in the database, not by this page.

## This repo is public

It holds only `index.html`. It must never contain:
- the Supabase `service_role` key, database password or Google OAuth client secret
- docs, schema, migrations, skills or any private data

The Supabase project URL and **publishable** key inside `index.html` are safe to publish.

The project's docs, data model, decision log, skills and migrations live in the private repo `lmleung7/my-life`.

## Hosting

Settings → Pages → Source: **Deploy from a branch** → `main` / `(root)`.

Supabase → Authentication → URL Configuration: Site URL and a Redirect URL must both be `https://lmleung7.github.io/my-life-app/` (trailing slash matters).
