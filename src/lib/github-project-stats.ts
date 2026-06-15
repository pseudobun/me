import { unstable_cache } from 'next/cache';
import { createSupabaseServerClient } from '@/config/supabase';

export const GITHUB_STATS_REVALIDATE_SECONDS = 60 * 60 * 24;

export interface GithubProjectStats {
  additions: number;
  commits: number;
  deletions: number;
  measuredAt: string;
  repos: number;
}

async function fetchLatestGithubStats(): Promise<GithubProjectStats | null> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('github_stats')
    .select('commits, additions, deletions, repos, measured_at')
    .order('measured_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load GitHub stats snapshot: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  // The query result is untyped; validate the shape at runtime instead of
  // asserting it, so a malformed/empty snapshot degrades to "unavailable".
  const commits = Number(data.commits);
  const additions = Number(data.additions);
  const deletions = Number(data.deletions);
  const repos = Number(data.repos);
  const measuredAt = data.measured_at;

  if (
    ![commits, additions, deletions, repos].every(Number.isFinite) ||
    typeof measuredAt !== 'string'
  ) {
    return null;
  }

  return {
    additions: Math.max(0, additions),
    commits: Math.max(0, commits),
    deletions: Math.max(0, deletions),
    measuredAt,
    repos: Math.max(0, repos),
  } satisfies GithubProjectStats;
}

const getCachedProjectGithubStats = unstable_cache(
  fetchLatestGithubStats,
  ['project-github-stats'],
  {
    revalidate: GITHUB_STATS_REVALIDATE_SECONDS,
  }
);

export async function getProjectGithubStats() {
  try {
    return await getCachedProjectGithubStats();
  } catch {
    return null;
  }
}
