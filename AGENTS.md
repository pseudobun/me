# AGENTS.md - pseudobun.dev Codex Operating Guide

This repository is set up for Codex-first development. Follow this file for every task.

For each task you receive, check if you can load an existing appropriate skill.

## Core Objective

* Deliver working, validated changes. Do not stop at analysis-only output.
* Use reasonable assumptions and keep momentum unless truly blocked.
* Preserve the site's quality across code, content, SEO, and localization.
* For large or uncertain efforts, create an ExecPlan in `plans/` and keep it current.

## Repository Orientation

* `src/app`: Next.js 16 App Router routes, layouts, metadata surfaces, `robots.ts`, and the OG image route.
* `src/app/[lang]`: locale-aware routes and layouts for Slovenian and English content.
* `src/components`: reusable UI, animated components, and Radix/shadcn primitives under `src/components/ui`.
* `src/constants`: site content and metadata, especially `data.mjs` and `metadata.ts`.
* `src/dictionaries` and `src/i18n`: translation dictionaries, locale config, and dictionary loading.
* `src/config`: small app config modules such as Supabase and menu helpers.
* `src/hooks`: client hooks such as image fetching.
* `public` and `src/project-screenshots`: static assets, fonts, icons, and project imagery used by the site.
* `scripts/supabase`: operational shell scripts used by GitHub Actions cron jobs.
* `supabase`: Supabase-related local artifacts.

## Environment Baseline

* Node.js `v22.20.0` from `.nvmrc`.
* `pnpm@9.14.2` from `package.json`.
* Next.js 16 App Router, React 19, Tailwind CSS 4, Biome 2, Supabase JS, and Vercel Analytics/Speed Insights.
* Important environment variables:
  + `SUPABASE_URL`
  + `SUPABASE_ANON_PUBLIC`
  + `SUPABASE_PATH` for the keepalive cron workflow/script

## Mandatory Shell Preflight

* Before running `node`, `pnpm`, or `next` commands directly, run `fnm use` in that shell when available.
* If `fnm` is unavailable, ensure `node -v` matches `.nvmrc` before running build or lint commands.
* Run commands from the repository root unless a task clearly requires a different working directory.

## Default Workflow

1. Read local context first: `README.md`, `package.json`, relevant routes/components, and matching code paths.
2. Prefer the current codebase over inherited assumptions. This repo is a single Next.js app, not a multi-app monorepo.
3. Implement complete behavior, including mirrored localized pages, metadata, and asset/config updates when needed.
4. Run the narrowest checks that prove the change, then expand when the impact is broad.
5. Report changed files, verification performed, and any residual risk.

## Autonomy and Decision Policy

* Bias to action: make decisions and move forward unless blocked by missing intent or a high-risk irreversible operation.
* Decide without asking when tradeoffs are local and reversible.
* Ask only when one of these is true:
  + Public-facing biography, branding, social links, contact details, or portfolio content would materially change without explicit instruction.
  + Security/privacy posture changes materially, especially around Supabase access or secret handling.
  + External cost, analytics, or third-party service exposure is introduced.
  + Destructive data or storage changes are required.
  + Product or design intent is ambiguous and multiple incompatible outcomes are possible.
* For major decisions, record:
  + Decision taken.
  + Why it was chosen.
  + Alternatives considered and why rejected.
  + Risk or rollback note.
* Mirror the same decisions in `Decision Log` when using an ExecPlan.

## Tooling Expectations

* Prefer `rg` and `rg --files` for search.
* Batch independent read/list/search actions in parallel where possible.
* Prefer focused diffs with `apply_patch` for manual edits.
* Use explicit working directories for commands.
* Never use destructive git commands unless explicitly requested.
* Keep edits small and reviewable; avoid repo-wide blind search/replace scripts.
* Respect the `@/*` path alias from `tsconfig.json` when editing imports.

## Documentation and Regression Discipline

* Read relevant repository context before coding:
  + `README.md`
  + `package.json`
  + `.github/workflows/*.yml`
  + route/layout/config files that shape the affected feature
* If behavior, public content, developer workflow, or deployment expectations change, update docs in the same task.
* There is no dedicated automated test suite configured in `package.json` today; linting, building, and targeted manual checks are the primary regression tools.
* Prefer root-cause fixes over local patches. If you choose a temporary workaround, document why.
* If docs conflict with current code or config, trust the current code/config and update the stale docs when appropriate.
* Note that `README.md` still contains some legacy wording about `packages/portfolio`; prefer root-level scripts and the current folder structure when they disagree.

## Validation Standards

Use the narrowest checks that prove your change, then expand if impact is broad.
Run `fnm use` first when needed.

Primary commands in this repo:

* `pnpm dev`: local development server with Turbopack.
* `pnpm exec biome check --write <paths...>`: focused formatting/lint fixes for touched files.
* `pnpm lint`: repo-wide Biome write pass.
* `pnpm lint:ci`: repo-wide read-only Biome gate used in CI.
* `pnpm build`: production Next build. This also runs `next-sitemap` via `postbuild`.
* `pnpm start`: serve the production build when manual runtime verification is useful.
* Root-level Markdown files such as `AGENTS.md` are currently outside the `biome.json` include globs, so review them manually unless the Biome config is updated.

Default gate policy:

* Docs-only or small content/config change: run a focused Biome check on touched files.
* UI, route, metadata, middleware, i18n, or data-flow change: run `pnpm lint:ci` and `pnpm build`.
* Risky or cross-cutting change: run focused Biome checks, then `pnpm lint:ci`, then `pnpm build`.
* Script or workflow change: lint touched files and run the script manually only when the required environment variables are available and safe to use.
* Before final handoff, document exactly which checks ran and what could not be run.

## Dependency Due Diligence

When adding a new dependency:

* Check release recency and maintenance activity.
* Confirm license compatibility with this repo.
* Prefer packages already aligned with this stack: Next.js, React, Radix, shadcn, TanStack, Supabase, and Tailwind-friendly tooling.
* Confirm compatibility with Next.js 16, React 19, Tailwind CSS 4, and Biome.
* Briefly record why the dependency was chosen in the task summary.

## Domain Guardrails

* App Router and RSC:
  + Prefer server components by default.
  + Add `'use client'` only when browser APIs, interactivity, or client hooks require it.
  + Keep root routes and locale-prefixed routes intentionally aligned when they represent the same page.
* Localization:
  + When changing locale-aware content, update both `src/dictionaries/*.json` and any consuming route/component logic as needed.
  + If adding or changing locales, update `src/i18n/config.ts`, `src/i18n/getDictionary.ts`, `src/middleware.ts`, and any route generation logic together.
* Content and metadata:
  + Treat `src/constants/data.mjs` and `src/constants/metadata.ts` as canonical content sources for portfolio data and SEO metadata.
  + When URLs, titles, descriptions, or page structure change, review `metadata.ts`, `src/app/robots.ts`, `src/app/api/og/route.tsx`, and `next-sitemap.config.js` for consistency.
* UI and design:
  + Reuse existing primitives from `src/components` and `src/components/ui` before adding new variants.
  + Preserve responsive behavior, theme support, and the site's existing motion/visual language unless the task explicitly calls for redesign.
* Images and assets:
  + Prefer imported local assets for project screenshots and bundled imagery.
  + If introducing new remote image sources, update `next.config.ts` `images.remotePatterns`.
* Supabase and data fetching:
  + Keep secret handling in environment variables.
  + Preserve intentional caching/revalidation behavior when changing fetch logic.
  + Do not introduce new Supabase write paths or storage assumptions without clear need.
* Scripts and automation:
  + Treat `scripts/supabase/keep-alive.sh` and `.github/workflows/cron.yml` as operational code. Keep changes idempotent and secret-aware.

## ExecPlans For Long Tasks

Create an ExecPlan file under `plans/` before coding when work is likely to:

* take longer than roughly 60-90 minutes,
* span multiple areas of the app,
* involve broad design/content/SEO restructuring,
* change deployment/runtime assumptions,
* or require meaningful research/prototyping.

This repo does not currently have a checked-in `PLANS.md`, so use a lightweight Markdown plan that includes:

* Goal
* Milestones
* Progress
* Surprises & Discoveries
* Decision Log
* Outcomes & Retrospective

Keep the plan live as you work and update it at each stopping point.

## Conventions Reference

When useful, mirror patterns in:

* `src/app/layout.tsx`
* `src/app/[lang]/layout.tsx`
* `src/app/page.tsx`
* `src/app/[lang]/page.tsx`
* `src/components/ui/*`
* `src/constants/data.mjs`
* `src/constants/metadata.ts`
* `src/i18n/config.ts`
* `src/i18n/getDictionary.ts`
* `src/middleware.ts`
* `.github/workflows/ci.yml`

If local conventions conflict with direct user instructions for a task, follow the user.
