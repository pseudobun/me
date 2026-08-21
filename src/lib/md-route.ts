// Pure path mapping shared by the proxy (which rewrites) and the tests.

export function isCvPath(pathname: string): boolean {
  return pathname === '/cv' || pathname.startsWith('/cv/');
}

/** Map a page path to its Markdown route under /md. */
export function markdownPath(pathname: string): string {
  if (isCvPath(pathname)) {
    return '/md/cv';
  }

  return `/md${pathname.replace(/\/+$/, '')}`;
}
