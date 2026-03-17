#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const DEFAULT_GITHUB_LOGIN = 'pseudobun';
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_COMMIT_SEARCH_PAGE_LIMIT = 10;
const GITHUB_PAGE_SIZE = 100;
const GITHUB_STATS_CONCURRENCY = 4;
const GITHUB_STATS_RETRY_DELAYS_MS = [1500, 3000, 5000, 8000];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getRequiredEnv(name, fallbackNames = []) {
  const value = process.env[name] ?? fallbackNames.map((key) => process.env[key]).find(Boolean);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getGithubToken() {
  return getRequiredEnv('GITHUB_PAT', ['GITHUB_TOKEN', 'GH_TOKEN']);
}

function getGithubHeaders(accept = 'application/vnd.github+json') {
  return {
    Accept: accept,
    Authorization: `Bearer ${getGithubToken()}`,
    'User-Agent': 'pseudobun-dev-github-stats-sync',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function mapWithConcurrency(items, mapper, concurrency) {
  const results = new Array(items.length);
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  };

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));

  return results;
}

async function fetchRequiredGithubData(url, accept = 'application/vnd.github+json') {
  for (let attempt = 0; attempt <= GITHUB_STATS_RETRY_DELAYS_MS.length; attempt += 1) {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: getGithubHeaders(accept),
    });

    if (response.status === 202) {
      const retryDelay = GITHUB_STATS_RETRY_DELAYS_MS[attempt];

      if (retryDelay) {
        await sleep(retryDelay);
        continue;
      }
    }

    if (response.ok) {
      return response.json();
    }

    if (response.status >= 500 && attempt < GITHUB_STATS_RETRY_DELAYS_MS.length) {
      await sleep(GITHUB_STATS_RETRY_DELAYS_MS[attempt]);
      continue;
    }

    throw new Error(`GitHub request failed for ${url} with status ${response.status}`);
  }

  throw new Error(`GitHub request failed for ${url} after retries`);
}

async function fetchOptionalGithubData(url, accept = 'application/vnd.github+json') {
  for (let attempt = 0; attempt <= GITHUB_STATS_RETRY_DELAYS_MS.length; attempt += 1) {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: getGithubHeaders(accept),
    });

    if (response.status === 202) {
      const retryDelay = GITHUB_STATS_RETRY_DELAYS_MS[attempt];

      if (retryDelay) {
        await sleep(retryDelay);
        continue;
      }

      return null;
    }

    if ([204, 401, 403, 404, 422, 429].includes(response.status)) {
      return null;
    }

    if (response.ok) {
      return response.json();
    }

    if (response.status >= 500 && attempt < GITHUB_STATS_RETRY_DELAYS_MS.length) {
      await sleep(GITHUB_STATS_RETRY_DELAYS_MS[attempt]);
      continue;
    }

    return null;
  }

  return null;
}

async function getGithubLogin() {
  const user = await fetchRequiredGithubData(`${GITHUB_API_BASE}/user`);

  return user.login ?? DEFAULT_GITHUB_LOGIN;
}

async function fetchPagedRepoSlugs(baseUrl) {
  const repoSlugs = new Set();

  for (let page = 1; page <= 100; page += 1) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    const repos = await fetchRequiredGithubData(
      `${baseUrl}${separator}per_page=${GITHUB_PAGE_SIZE}&page=${page}`
    );

    if (!Array.isArray(repos) || repos.length === 0) {
      break;
    }

    for (const repo of repos) {
      if (repo.full_name) {
        repoSlugs.add(repo.full_name);
      }
    }

    if (repos.length < GITHUB_PAGE_SIZE) {
      break;
    }
  }

  return [...repoSlugs];
}

async function fetchOptionalPagedRepoSlugs(baseUrl) {
  const repoSlugs = new Set();

  for (let page = 1; page <= 100; page += 1) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    const repos = await fetchOptionalGithubData(
      `${baseUrl}${separator}per_page=${GITHUB_PAGE_SIZE}&page=${page}`
    );

    if (!Array.isArray(repos) || repos.length === 0) {
      break;
    }

    for (const repo of repos) {
      if (repo.full_name) {
        repoSlugs.add(repo.full_name);
      }
    }

    if (repos.length < GITHUB_PAGE_SIZE) {
      break;
    }
  }

  return [...repoSlugs];
}

async function fetchUserOrgLogins() {
  const orgs = await fetchOptionalGithubData(
    `${GITHUB_API_BASE}/user/orgs?per_page=${GITHUB_PAGE_SIZE}`
  );

  if (!Array.isArray(orgs)) {
    return [];
  }

  return orgs.map((org) => org.login).filter(Boolean);
}

async function fetchCommitSearchRepoSlugs(login) {
  const repoSlugs = new Set();

  for (let page = 1; page <= GITHUB_COMMIT_SEARCH_PAGE_LIMIT; page += 1) {
    const result = await fetchOptionalGithubData(
      `${GITHUB_API_BASE}/search/commits?q=${encodeURIComponent(
        `author:${login}`
      )}&per_page=${GITHUB_PAGE_SIZE}&page=${page}`,
      'application/vnd.github.cloak-preview+json'
    );

    const items = Array.isArray(result?.items) ? result.items : [];

    for (const item of items) {
      if (item?.repository?.full_name) {
        repoSlugs.add(item.repository.full_name);
      }
    }

    if (items.length < GITHUB_PAGE_SIZE) {
      break;
    }
  }

  return [...repoSlugs];
}

async function fetchRelevantGithubRepoSlugs(login) {
  const [userRepoSlugs, orgLogins, commitSearchRepoSlugs] = await Promise.all([
    fetchPagedRepoSlugs(`${GITHUB_API_BASE}/user/repos?type=all`),
    fetchUserOrgLogins(),
    fetchCommitSearchRepoSlugs(login),
  ]);

  const orgRepoSlugs = (
    await mapWithConcurrency(
      orgLogins,
      (orgLogin) => fetchOptionalPagedRepoSlugs(`${GITHUB_API_BASE}/orgs/${orgLogin}/repos`),
      4
    )
  ).flat();

  return [...new Set([...userRepoSlugs, ...orgRepoSlugs, ...commitSearchRepoSlugs])].sort();
}

async function fetchRepoStats(repoSlug, login) {
  const contributors = await fetchOptionalGithubData(
    `${GITHUB_API_BASE}/repos/${repoSlug}/stats/contributors`
  );

  if (!Array.isArray(contributors)) {
    return null;
  }

  const contributor = contributors.find((entry) => entry.author?.login === login);

  if (!contributor) {
    return null;
  }

  const weeks = Array.isArray(contributor.weeks) ? contributor.weeks : [];

  return {
    additions: weeks.reduce((sum, week) => sum + Math.max(0, week.a || 0), 0),
    commits: contributor.total || weeks.reduce((sum, week) => sum + Math.max(0, week.c || 0), 0),
    deletions: weeks.reduce((sum, week) => sum + Math.max(0, week.d || 0), 0),
    repos: 1,
  };
}

async function calculateGithubStats() {
  const login = await getGithubLogin();
  const repoSlugs = await fetchRelevantGithubRepoSlugs(login);

  console.log(`Discovered ${repoSlugs.length} repos:`);
  for (const slug of repoSlugs) {
    console.log(`  ${slug}`);
  }

  const results = await mapWithConcurrency(
    repoSlugs,
    (repoSlug) => fetchRepoStats(repoSlug, login),
    GITHUB_STATS_CONCURRENCY
  );
  const successfulStats = results.filter(Boolean);

  if (successfulStats.length === 0) {
    throw new Error('No GitHub contributor stats were available to store.');
  }

  const totals = successfulStats.reduce(
    (aggregate, repoStats) => ({
      additions: aggregate.additions + repoStats.additions,
      commits: aggregate.commits + repoStats.commits,
      deletions: aggregate.deletions + repoStats.deletions,
      repos: aggregate.repos + repoStats.repos,
    }),
    {
      additions: 0,
      commits: 0,
      deletions: 0,
      repos: 0,
    }
  );

  return {
    ...totals,
    discoveredRepos: repoSlugs.length,
    login,
    measuredAt: new Date().toISOString(),
  };
}

function createSupabaseAdminClient() {
  return createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_SECRET_KEY', ['SUPABASE_SERVICE_ROLE_KEY']),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

async function saveGithubStatsSnapshot(stats) {
  const supabase = createSupabaseAdminClient();
  const existingSnapshotQuery = await supabase
    .from('github_stats')
    .select('id')
    .order('measured_at', { ascending: false })
    .limit(1);

  if (existingSnapshotQuery.error) {
    throw new Error(
      `Failed to load existing GitHub stats snapshot: ${existingSnapshotQuery.error.message}`
    );
  }

  const existingSnapshot = existingSnapshotQuery.data?.[0];
  const snapshotPayload = {
    additions: stats.additions,
    commits: stats.commits,
    deletions: stats.deletions,
    id: existingSnapshot?.id ?? 1,
    measured_at: stats.measuredAt,
    repos: stats.repos,
  };

  if (existingSnapshot) {
    const { error } = await supabase
      .from('github_stats')
      .update(snapshotPayload)
      .eq('id', existingSnapshot.id);

    if (error) {
      throw new Error(`Failed to update GitHub stats snapshot: ${error.message}`);
    }

    return;
  }

  const { error } = await supabase.from('github_stats').insert(snapshotPayload);

  if (error) {
    throw new Error(`Failed to insert GitHub stats snapshot: ${error.message}`);
  }
}

async function main() {
  const stats = await calculateGithubStats();

  await saveGithubStatsSnapshot(stats);

  console.log(
    JSON.stringify(
      {
        additions: stats.additions,
        commits: stats.commits,
        deletions: stats.deletions,
        discoveredRepos: stats.discoveredRepos,
        login: stats.login,
        measuredAt: stats.measuredAt,
        repos: stats.repos,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
