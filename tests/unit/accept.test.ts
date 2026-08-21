import { describe, expect, it } from 'vitest';
import { negotiatePageType, parseAccept, scoreMediaType } from '@/lib/accept';

describe('parseAccept', () => {
  it('returns nothing for a missing or empty header', () => {
    expect(parseAccept(null)).toEqual([]);
    expect(parseAccept('')).toEqual([]);
    expect(parseAccept('   ')).toEqual([]);
  });

  it('defaults q to 1 and sorts by descending q', () => {
    const entries = parseAccept('text/html;q=0.5, text/markdown, application/json;q=0.9');

    expect(entries.map((entry) => `${entry.type}/${entry.subtype}`)).toEqual([
      'text/markdown',
      'application/json',
      'text/html',
    ]);
    expect(entries[0].q).toBe(1);
  });

  it('keeps header order for equal q-values', () => {
    const entries = parseAccept('text/html, text/markdown');

    expect(entries.map((entry) => entry.subtype)).toEqual(['html', 'markdown']);
  });

  it('clamps out-of-range q and ignores unparseable ones', () => {
    expect(parseAccept('text/html;q=5')[0].q).toBe(1);
    expect(parseAccept('text/html;q=-2')[0].q).toBe(0);
    expect(parseAccept('text/html;q=banana')[0].q).toBe(1);
  });

  it('normalises case and tolerates a bare type', () => {
    expect(parseAccept('TEXT/MarkDown')[0]).toMatchObject({ type: 'text', subtype: 'markdown' });
    expect(parseAccept('*')[0]).toMatchObject({ type: '*', subtype: '*' });
  });
});

describe('scoreMediaType', () => {
  it('prefers the most specific matching range regardless of order', () => {
    const entries = parseAccept('*/*;q=0.1, text/*;q=0.5, text/markdown;q=0.9');

    expect(scoreMediaType(entries, 'text/markdown')).toBe(0.9);
    expect(scoreMediaType(entries, 'text/html')).toBe(0.5);
    expect(scoreMediaType(entries, 'image/png')).toBe(0.1);
  });

  it('returns 0 when nothing matches', () => {
    expect(scoreMediaType(parseAccept('application/json'), 'text/markdown')).toBe(0);
  });

  it('honours an explicit q=0 refusal', () => {
    const entries = parseAccept('*/*, text/html;q=0');

    expect(scoreMediaType(entries, 'text/html')).toBe(0);
  });
});

describe('negotiatePageType', () => {
  it('serves HTML when no Accept header is sent', () => {
    expect(negotiatePageType(null)).toBe('html');
    expect(negotiatePageType(undefined)).toBe('html');
  });

  it('serves HTML to a normal browser Accept header', () => {
    const browser =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8';

    expect(negotiatePageType(browser)).toBe('html');
  });

  it('serves markdown for the acceptmarkdown.com request', () => {
    expect(negotiatePageType('text/markdown')).toBe('markdown');
  });

  it('serves markdown when it outranks html by q-value', () => {
    expect(negotiatePageType('text/markdown;q=0.9, text/html;q=0.8')).toBe('markdown');
  });

  it('serves html when html outranks markdown', () => {
    expect(negotiatePageType('text/markdown;q=0.4, text/html;q=0.8')).toBe('html');
  });

  it('prefers html on an exact tie, keeping existing behaviour', () => {
    expect(negotiatePageType('text/markdown, text/html')).toBe('html');
  });

  it('serves html for a wildcard client', () => {
    expect(negotiatePageType('*/*')).toBe('html');
  });

  it('treats text/* as acceptable rather than a 406', () => {
    expect(negotiatePageType('text/*')).toBe('html');
  });

  it('returns 406 when neither representation is acceptable', () => {
    expect(negotiatePageType('application/json')).toBe(406);
    expect(negotiatePageType('image/png, application/pdf')).toBe(406);
  });

  it('returns 406 when both representations are explicitly refused', () => {
    expect(negotiatePageType('text/html;q=0, text/markdown;q=0')).toBe(406);
  });
});
