# CLAUDE.md — MaxLife staging preview

This folder is the **staging preview** of the new MaxLife homepage + coaching page, for Ben & Beth to approve before it's ported into the real Next app. It is its own git repo (`whoisjonray/maxlife-staging`) and deploys to Railway.

## Files
- `index.html` — new **homepage** (brand front door: two doors → podcast `/episodes` + coaching). Hero portrait is square (1:1). Links: "Coaching"/"Work with Ben" → `coaching.html`; podcast/episodes → live `https://maxlifebenlaws.com/episodes`.
- `coaching.html` — rewritten **coaching page**. Section order: Hero → Decisions ("calls that move millions") → Creative-producer positioning → Three Freedoms → What it's actually for (marriage/purpose) → Reckoning → Meet your producer → How I work (+ wiring strip) → Podcast → Testimonials → Methodology → Qualify → Engagement ($250k) → Apply.
- `brand/index.html` + `brand/assets/` — **Brand & logo presentation** for Ben/Beth (the #44 Shield + Twin Peaks logo system, logo lockups, 13 swag mockups, digital placements). Lives at `/brand/` on staging.
- `server.js` + `package.json` — tiny static server, binds `0.0.0.0` (Railway requirement). Serves directory requests (`/brand/` → `brand/index.html`). `npm start`.

Asset images and the `/episodes` links on the homepage/coaching pages point at the **live** `maxlifebenlaws.com`, so they render fully when opened directly. The `brand/` presentation bundles its own assets locally.

## Local preview
`python3 -m http.server 8799` from this folder → http://localhost:8799/

## Deploy to staging (does NOT auto-deploy on push)
```bash
git add -A && git commit -m "..." && git push origin master
# then trigger the build (Railway here won't auto-build):
RT=$(grep -hE "^RAILWAY_TOKEN=" "../../*WhoIsJonRay/.env.whoisjonray" | head -1 | cut -d= -f2-)
SHA=$(git rev-parse HEAD)
curl -s -X POST https://backboard.railway.com/graphql/v2 -H "Authorization: Bearer $RT" -H "Content-Type: application/json" \
  -d "{\"query\":\"mutation { serviceInstanceDeployV2(serviceId: \\\"832617d8-d59c-4306-8fb7-dd1c375a5f82\\\", environmentId: \\\"0fab45b4-bec3-4552-99ae-8a3921099436\\\", commitSha: \\\"$SHA\\\") }\"}"
```
Live at `https://staging-preview-production.up.railway.app/`.

## Writing rules
Net-new copy follows the brand sheet at `../calls/2026-06-09-maxlife-language-brand-sheet.md` and the root style guide (no em dashes, use contractions, no AI-tell vocabulary). Attribution dashes already in the page ("— Ben Laws") are pre-existing approved copy — leave them. The full project map is in `../CLAUDE.md` → "Marketing Site, Brand Voice & Content Work."
