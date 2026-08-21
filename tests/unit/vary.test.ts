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

// Next.js replaces Vary on prerendered pages with its own router value, and
// neither next.config headers() nor vercel.json overrides it. PAGE_VARY is the
// value the proxy aims for on the responses it does control; keep it honest
// about what a negotiable page has to advertise.
describe('PAGE_VARY', () => {
  it('includes Accept and every Next router header', () => {
    const tokens = PAGE_VARY.toLowerCase()
      .split(',')
      .map((part) => part.trim());

    expect(tokens).toEqual([
      'accept',
      'rsc',
      'next-router-state-tree',
      'next-router-prefetch',
      'next-router-segment-prefetch',
      'accept-encoding',
    ]);
  });

  it('is what mergeVary produces from the Next router value', () => {
    const nextValue = 'Accept, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch';

    expect(mergeVary(nextValue, 'Accept-Encoding')).toBe(PAGE_VARY);
  });
});
