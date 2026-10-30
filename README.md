# Portfolio

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Development

```bash
npm run dev     # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build && npm run start
```

## How it works

- **Projects** are the repositories pinned on the GitHub profile in `src/data/profile.ts` (`githubUser`), in pinned order. GitHub's REST API has no pinned endpoint, so `src/lib/github.ts` reads the pinned list from the profile page and fetches live stats from the REST API. The result is cached for 5 minutes and refreshed in the background, so changes on GitHub show up without a redeploy.
- **Theme** is switched with the View Transitions API: the new theme grows out of the toggle button as a circle. Browsers without it, and people who prefer reduced motion, get an instant switch.
- **Type** is Geist Mono throughout; corners are square by design.

## Environment

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Optional. Raises GitHub's anonymous rate limit (60 requests/hour). |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata. |
