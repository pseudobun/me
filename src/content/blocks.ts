// Content blocks are the single source of truth for the trust-anchor pages.
// The same tree renders to React (src/app/(main)/[lang]/…) and to Markdown
// (src/lib/markdown.ts), so the HTML and `Accept: text/markdown` variants can
// never drift apart.

export type Block =
  | { kind: 'heading'; level: 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'definitions'; items: { term: string; description: string }[] }
  | { kind: 'code'; language: string; code: string };

export interface PageContent {
  /** Rendered as the page H1 and the Markdown `#` title. */
  title: string;
  /** Lead paragraph, rendered under the H1 and as the Markdown blockquote. */
  summary: string;
  blocks: Block[];
}

export interface InlineNode {
  text: string;
  href?: string;
}

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Split a content string into plain-text and link nodes. Only the
 * `[label](href)` form is supported — this is deliberately not a Markdown
 * parser, just enough inline syntax to keep the source readable.
 */
export function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let lastIndex = 0;

  INLINE_LINK.lastIndex = 0;
  let match = INLINE_LINK.exec(text);

  while (match !== null) {
    if (match.index > lastIndex) {
      nodes.push({ text: text.slice(lastIndex, match.index) });
    }
    nodes.push({ text: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
    match = INLINE_LINK.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push({ text: text.slice(lastIndex) });
  }

  return nodes;
}

/** Strip inline link syntax down to its visible label. */
export function toPlainText(text: string): string {
  return parseInline(text)
    .map((node) => node.text)
    .join('');
}

/** Visible character count of a page, used by the content-length guard tests. */
export function contentLength(page: PageContent): number {
  let total = toPlainText(page.title).length + toPlainText(page.summary).length;

  for (const block of page.blocks) {
    if (block.kind === 'heading' || block.kind === 'paragraph') {
      total += toPlainText(block.text).length;
    } else if (block.kind === 'list') {
      total += block.items.reduce((sum, item) => sum + toPlainText(item).length, 0);
    } else if (block.kind === 'code') {
      total += block.code.length;
    } else {
      total += block.items.reduce(
        (sum, item) => sum + toPlainText(item.term).length + toPlainText(item.description).length,
        0
      );
    }
  }

  return total;
}

/** Render a content-block page to Markdown. Mirrors ContentBlocks 1:1. */
export function blocksToMarkdown(page: PageContent): string {
  const lines: string[] = [`# ${page.title}`, '', `> ${page.summary}`];

  for (const block of page.blocks) {
    switch (block.kind) {
      case 'heading':
        lines.push('', `${'#'.repeat(block.level)} ${block.text}`);
        break;
      case 'paragraph':
        lines.push('', block.text);
        break;
      case 'list':
        lines.push('');
        for (const item of block.items) {
          lines.push(`- ${item}`);
        }
        break;
      case 'definitions':
        lines.push('');
        for (const item of block.items) {
          lines.push(`- **${item.term}**: ${item.description}`);
        }
        break;
      case 'code':
        lines.push('', `\`\`\`${block.language}`, block.code, '```');
        break;
    }
  }

  return `${lines.join('\n')}\n`;
}
