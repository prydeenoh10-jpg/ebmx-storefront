# EBMX Storefront

Electric Dirt Bike Australia — Next.js 14 storefront (Phase 1).

## Quick start (mock mode — no backend)

```bash
npm install
cp .env.example .env.local   # DATA_SOURCE=mock is the default
npm run dev                  # http://localhost:3000
```

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** CSS Modules + globals.css design tokens
- **Fonts:** Saira, Saira Condensed, JetBrains Mono via next/font/google
- **Data:** mock (`data/catalog-data.js`) → Medusa v2 (Phase 2)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Environment variables

| Variable | Default | Notes |
|---|---|---|
| `DATA_SOURCE` | `mock` | `mock` or `medusa` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | |
| `MEDUSA_BACKEND_URL` | `http://localhost:9000` | Medusa only |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | — | Medusa only |
