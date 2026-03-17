# Personal Website

Live at [pseudobun.dev](https://pseudobun.dev). Built with Next.js, Tailwind CSS, and Supabase.

Photos are stored in Supabase, exported from Lightroom as JPG long side 1024px, 30% quality.

## Getting Started

Run the development server from the repository root:

```bash
pnpm dev
```

Run the production build from the repository root:

```bash
pnpm typecheck
pnpm build
pnpm start
```

## Secrets

This repo uses `sops` with `age` for committing encrypted env files.

```bash
just encrypt
just decrypt
```

Encrypted secrets live in `.env.enc`, while `.env` stays local-only.

For GitHub stats syncing and reads, set:

```bash
GH_TOKEN=...
SUPABASE_URL=...
SUPABASE_SECRET_KEY=...
```

Run the daily snapshot sync manually with:

```bash
pnpm sync:github-stats
```

The cron job writes a single daily snapshot into Supabase, and the projects page reads that snapshot server-side with a 1 day cache.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Deployed on Vercel.

## Inspiration

* [martines3000/portfolio](https://github.com/martines3000/portfolio)
* [Mrtenz/morten.dev](https://github.com/Mrtenz/morten.dev) 
