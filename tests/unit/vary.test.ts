import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { mergeVary, PAGE_VARY } from '@/lib/accept';

describe('mergeVary', () => {
  it('adds the token to an empty header', () => {
    expect(mergeVary(null, 'Accept')).toBe('Accept');
    expect(mergeVary('', 'Accept')).toBe('Accept');
  });

  it('appends without dropping existing values', () => {
    expect(mergeVary('rsc, next-router-state-tree', 'Accept')).toBe(
      'rsc, next-router-state-tree, Accept'
    );
  });

  it('does not duplicate a token that is already present, whatever its case', () => {
    expect(mergeVary('rsc, accept', 'Accept')).toBe('rsc, accept');
    expect(mergeVary('ACCEPT', 'Accept')).toBe('ACCEPT');
  });

  it('normalises whitespace and drops empty entries', () => {
    expect(mergeVary('  rsc ,, ', 'Accept')).toBe('rsc, Accept');
  });
});

// Prerendered pages are served from cache with their own headers, so the
// authoritative Vary for production lives in vercel.json. Keep it in lockstep
// with PAGE_VARY — a silent drift here is invisible until a CDN hands an agent
// the HTML variant for a Markdown request.
describe('vercel.json Vary rules', () => {
  const config = JSON.parse(
    readFileSync(resolve(import.meta.dirname, '../../vercel.json'), 'utf8')
  ) as { headers: { source: string; headers: { key: string; value: string }[] }[] };

  it('covers both the localized pages and the CV', () => {
    expect(config.headers.map((rule) => rule.source)).toEqual([
      '/(en|sl)(/.*)?',
      '/cv(/.*)?',
    ]);
  });

  it('declares exactly PAGE_VARY for every negotiable route', () => {
    for (const rule of config.headers) {
      const vary = rule.headers.find((header) => header.key === 'Vary');

      expect(vary).toBeDefined();
      expect(vary?.value).toBe(PAGE_VARY);
    }
  });

  // Diagnostic marker: proves whether the rule is applied at all in production,
  // separately from whether Vary specifically survives the framework's own.
  it('carries the X-Vary-Source marker on every rule', () => {
    for (const rule of config.headers) {
      expect(rule.headers.find((header) => header.key === 'X-Vary-Source')?.value).toBe(
        'vercel-json'
      );
    }
  });

  it('includes Accept and every Next router header', () => {
    const tokens = PAGE_VARY.toLowerCase().split(',').map((part) => part.trim());

    expect(tokens).toEqual([
      'accept',
      'rsc',
      'next-router-state-tree',
      'next-router-prefetch',
      'next-router-segment-prefetch',
      'accept-encoding',
    ]);
  });
});
