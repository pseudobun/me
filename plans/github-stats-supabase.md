# Goal

Move GitHub stats off the Next.js request path and into a daily Supabase-backed snapshot.

# Milestones

1. Replace request-time GitHub fetching with a server-side Supabase read helper.
2. Add a daily sync script that computes contributor stats from GitHub and stores them in Supabase.
3. Update the GitHub Actions cron workflow to run the sync job.
4. Verify the projects page still animates, but reads cached DB data only.
5. Document the required environment variables and operator steps.

# Progress

- In progress: wiring Supabase-backed reads and cron-based writes.

# Surprises & Discoveries

- The current request-time GitHub approach is slow on cold runs and GitHub stats endpoints are flaky enough to distort the page.
- The repo already has a cron workflow stub and Supabase keepalive script, but no real data-sync pipeline yet.
- The provided `github_stats.sql` currently defines a very small table shape: `id`, `commits`, `additions`, `deletions`, `repos`, `measured_at`.

# Decision Log

- Decision: use Supabase as the source of truth for the projects page instead of request-time GitHub aggregation.
- Why: this keeps page loads fast and isolates GitHub latency/rate limits to a daily background job.
- Alternatives considered: Next.js API-route aggregation with revalidation; request-time server fetch with `unstable_cache`.
- Risk / rollback: if the cron job fails, the page can still render the most recent snapshot; rollback is to restore the previous direct GitHub fetch helper.

# Outcomes & Retrospective

- Pending implementation.
