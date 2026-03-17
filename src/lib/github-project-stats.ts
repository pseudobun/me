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

interface GithubStatsRow {
  additions: number;
  commits: number;
  deletions: number;
  measured_at: string;
  repos: number;
}

async function fetchLatestGithubStats() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('github_stats')
    .select('commits, additions, deletions, repos, measured_at')
    .order('measured_at', { ascending: false })
    .limit(1)
    .maybeSingle<GithubStatsRow>();

  if (error) {
    throw new Error(`Failed to load GitHub stats snapshot: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return {
    additions: data.additions,
    commits: data.commits,
    deletions: data.deletions,
    measuredAt: data.measured_at,
    repos: data.repos,
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
