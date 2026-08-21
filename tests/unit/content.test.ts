import { describe, expect, it } from 'vitest';
import {
  blocksToMarkdown,
  CONTENT_PAGES,
  contentLength,
  getPageContent,
  isContentPage,
  parseInline,
  toPlainText,
} from '@/content';
import { locales } from '@/i18n/config';

describe('parseInline', () => {
  it('returns a single text node when there are no links', () => {
    expect(parseInline('plain text')).toEqual([{ text: 'plain text' }]);
  });

  it('splits a link out of surrounding text', () => {
    expect(parseInline('see [docs](https://example.com) now')).toEqual([
      { text: 'see ' },
      { text: 'docs', href: 'https://example.com' },
      { text: ' now' },
    ]);
  });

  it('handles several links and mailto hrefs', () => {
    const nodes = parseInline('[a](/x/) and [b](mailto:c@d.e)');

    expect(nodes.filter((node) => node.href).map((node) => node.href)).toEqual([
      '/x/',
      'mailto:c@d.e',
    ]);
  });

  it('is reusable — the shared regex does not leak lastIndex between calls', () => {
    const input = '[one](/1/) [two](/2/)';

    expect(parseInline(input)).toEqual(parseInline(input));
  });

  it('leaves malformed link syntax as literal text', () => {
    expect(parseInline('[unclosed(/x/)')).toEqual([{ text: '[unclosed(/x/)' }]);
  });
});

describe('toPlainText', () => {
  it('strips link syntax down to the label', () => {
    expect(toPlainText('reach me at [email](mailto:a@b.c) today')).toBe(
      'reach me at email today'
    );
  });
});

describe('trust anchor page content', () => {
  it('exposes about, contact and privacy', () => {
    expect(CONTENT_PAGES).toEqual(['about', 'contact', 'privacy']);
    expect(isContentPage('about')).toBe(true);
    expect(isContentPage('nope')).toBe(false);
  });

  for (const locale of locales) {
    for (const page of CONTENT_PAGES) {
      // The audit requirement these pages exist to satisfy is a minimum of 500
      // characters of real content per trust anchor page, per locale.
      it(`${locale}/${page} carries at least 500 characters of content`, () => {
        expect(contentLength(getPageContent(locale, page))).toBeGreaterThanOrEqual(500);
      });

      it(`${locale}/${page} has a title, summary and heading structure`, () => {
        const content = getPageContent(locale, page);

        expect(content.title.length).toBeGreaterThan(0);
        expect(content.summary.length).toBeGreaterThan(0);
        expect(content.blocks.some((block) => block.kind === 'heading')).toBe(true);
      });
    }
  }
});

describe('blocksToMarkdown', () => {
  it('emits an H1, a blockquote summary, and the block tree', () => {
    const markdown = blocksToMarkdown({
      title: 'Title',
      summary: 'Summary line.',
      blocks: [
        { kind: 'heading', level: 2, text: 'Section' },
        { kind: 'paragraph', text: 'Body.' },
        { kind: 'heading', level: 3, text: 'Sub' },
        { kind: 'list', items: ['one', 'two'] },
        { kind: 'definitions', items: [{ term: 'Key', description: 'Value' }] },
      ],
    });

    expect(markdown).toContain('# Title');
    expect(markdown).toContain('> Summary line.');
    expect(markdown).toContain('## Section');
    expect(markdown).toContain('### Sub');
    expect(markdown).toContain('- one');
    expect(markdown).toContain('- **Key**: Value');
    expect(markdown.endsWith('\n')).toBe(true);
  });

  it('renders every real page without throwing', () => {
    for (const locale of locales) {
      for (const page of CONTENT_PAGES) {
        const markdown = blocksToMarkdown(getPageContent(locale, page));

        expect(markdown.split('\n')[0]).toMatch(/^# /);
        expect(markdown.length).toBeGreaterThan(500);
      }
    }
  });
});
