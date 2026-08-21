// RFC 9110 §12.5.1 Accept parsing, used to serve `text/markdown` variants of the
// HTML pages (see https://acceptmarkdown.com). Kept dependency-free and pure so
// it can run in the proxy (edge) runtime and be unit tested directly.

export interface AcceptEntry {
  type: string;
  subtype: string;
  q: number;
  /** Index in the original header, used to break q-value ties stably. */
  order: number;
}

export type NegotiableType = 'html' | 'markdown';

export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8';

/**
 * Parse an Accept header into entries sorted by descending q-value.
 * Malformed parameters are ignored rather than throwing: a bad Accept header
 * must never take a page down.
 */
export function parseAccept(header: string | null | undefined): AcceptEntry[] {
  if (!header) {
    return [];
  }

  const entries: AcceptEntry[] = [];

  header.split(',').forEach((rawPart, order) => {
    const part = rawPart.trim();
    if (!part) {
      return;
    }

    const [rawRange, ...params] = part.split(';');
    const range = rawRange.trim().toLowerCase();
    if (!range) {
      return;
    }

    const slash = range.indexOf('/');
    const type = slash === -1 ? range : range.slice(0, slash);
    const subtype = slash === -1 ? '*' : range.slice(slash + 1);

    let q = 1;
    for (const param of params) {
      const [key, value] = param.split('=');
      if (key?.trim().toLowerCase() !== 'q') {
        continue;
      }
      const parsed = Number.parseFloat(value ?? '');
      // An unparseable q is treated as "not specified" (q=1) per RFC 9110's
      // guidance to ignore parameters that cannot be understood.
      if (Number.isFinite(parsed)) {
        q = Math.min(1, Math.max(0, parsed));
      }
    }

    entries.push({ type, subtype, q, order });
  });

  return entries.sort((a, b) => (b.q === a.q ? a.order - b.order : b.q - a.q));
}

function matches(entry: AcceptEntry, type: string, subtype: string) {
  const typeOk = entry.type === '*' || entry.type === type;
  const subtypeOk = entry.subtype === '*' || entry.subtype === subtype;

  return typeOk && subtypeOk;
}

/**
 * Score a concrete media type against the parsed Accept entries.
 * Returns the q-value of the most specific matching range, or 0 when the client
 * explicitly refuses the type (`q=0`) or lists no matching range at all.
 *
 * Specificity order per RFC 9110: `type/subtype` > `type/*` > `*​/*`.
 */
export function scoreMediaType(entries: AcceptEntry[], mediaType: string): number {
  const slash = mediaType.indexOf('/');
  const type = mediaType.slice(0, slash);
  const subtype = mediaType.slice(slash + 1);

  let best: { specificity: number; q: number } | null = null;

  for (const entry of entries) {
    if (!matches(entry, type, subtype)) {
      continue;
    }

    const specificity = entry.type === '*' ? 0 : entry.subtype === '*' ? 1 : 2;
    if (!best || specificity > best.specificity) {
      best = { specificity, q: entry.q };
    }
  }

  return best?.q ?? 0;
}

/**
 * Decide which representation to serve for a negotiable page.
 *
 * - `null` Accept (or `*​/*`) keeps the existing HTML behaviour.
 * - `text/markdown` wins only when it strictly outranks `text/html`, so a
 *   browser sending `text/html,...,*​/*;q=0.8` still gets HTML.
 * - `406` is reserved for clients that accept neither representation, which is
 *   what acceptmarkdown.com requires for unsupported types.
 */
export function negotiatePageType(header: string | null | undefined): NegotiableType | 406 {
  const entries = parseAccept(header);
  if (entries.length === 0) {
    return 'html';
  }

  const markdown = scoreMediaType(entries, 'text/markdown');
  const html = scoreMediaType(entries, 'text/html');

  if (markdown === 0 && html === 0) {
    return 406;
  }

  return markdown > html ? 'markdown' : 'html';
}
