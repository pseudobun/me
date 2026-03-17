'use client';

import { useEffect, useState } from 'react';
import type { GithubProjectStats } from '@/lib/github-project-stats';

interface GithubStatsStatementProps {
  additionsLabel: string;
  acrossLabel: string;
  andLabel: string;
  commitsLabel: string;
  locale: string;
  removalsLabel: string;
  reposLabel: string;
  stats: GithubProjectStats | null;
  unavailableLabel: string;
  withLabel: string;
}

interface AnimatedStats {
  additions: number;
  commits: number;
  removals: number;
  repos: number;
}

const ANIMATION_DURATION_MS = 900;
const EMPTY_STATS: AnimatedStats = {
  additions: 0,
  commits: 0,
  removals: 0,
  repos: 0,
};

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

export default function GithubStatsStatement({
  additionsLabel,
  acrossLabel,
  andLabel,
  commitsLabel,
  locale,
  removalsLabel,
  reposLabel,
  stats,
  unavailableLabel,
  withLabel,
}: GithubStatsStatementProps) {
  const [animatedStats, setAnimatedStats] = useState<AnimatedStats>(EMPTY_STATS);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!stats) {
      return;
    }

    setIsReady(true);

    const targetStats: AnimatedStats = {
      additions: Math.max(0, stats.additions),
      commits: Math.max(0, stats.commits),
      removals: Math.max(0, stats.deletions),
      repos: Math.max(0, stats.repos),
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimatedStats(targetStats);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / ANIMATION_DURATION_MS, 1);
      const easedProgress = easeOutCubic(progress);

      setAnimatedStats({
        additions: Math.round(targetStats.additions * easedProgress),
        commits: Math.round(targetStats.commits * easedProgress),
        removals: Math.round(targetStats.removals * easedProgress),
        repos: Math.round(targetStats.repos * easedProgress),
      });

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [stats]);

  if (!stats) {
    return (
      <p className="max-w-5xl text-base leading-8 text-muted-foreground md:text-lg">
        {unavailableLabel}
      </p>
    );
  }

  if (!isReady) {
    return <div className="h-8 w-full max-w-3xl animate-pulse rounded-full bg-muted/60" />;
  }

  const formatter = new Intl.NumberFormat(locale);

  return (
    <p
      className="max-w-5xl text-base leading-8 text-muted-foreground md:text-lg"
      aria-live="polite"
    >
      <span className="font-semibold text-foreground">
        {formatter.format(animatedStats.commits)}
      </span>{' '}
      {commitsLabel} {withLabel}{' '}
      <span className="font-semibold text-emerald-500 dark:text-emerald-400">
        +{formatter.format(animatedStats.additions)}
      </span>{' '}
      {additionsLabel} {andLabel}{' '}
      <span className="font-semibold text-rose-500 dark:text-rose-400">
        -{formatter.format(animatedStats.removals)}
      </span>{' '}
      {removalsLabel} {acrossLabel}{' '}
      <span className="font-semibold text-foreground">{formatter.format(animatedStats.repos)}</span>{' '}
      {reposLabel}.
    </p>
  );
}
