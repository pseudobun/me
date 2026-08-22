// Structured error bodies for the public HTTP endpoints. Agents cannot parse an
// HTML error page, so every failure path under /api returns this shape.

import { SITE_URL } from '@/constants/metadata';

export const API_DOCS_URL = `${SITE_URL}/en/developers/`;

export type ApiErrorCode =
  | 'not_found'
  | 'method_not_allowed'
  | 'internal_error'
  | 'upstream_unavailable';

export interface ApiErrorBody {
  error: {
    code: ApiErrorCode;
    message: string;
    hint: string;
    status: number;
    documentation_url: string;
  };
}

const STATUS_BY_CODE: Record<ApiErrorCode, number> = {
  not_found: 404,
  method_not_allowed: 405,
  internal_error: 500,
  upstream_unavailable: 503,
};

export function buildApiError(
  code: ApiErrorCode,
  message: string,
  hint: string
): { body: ApiErrorBody; status: number } {
  const status = STATUS_BY_CODE[code];

  return {
    status,
    body: {
      error: { code, message, hint, status, documentation_url: API_DOCS_URL },
    },
  };
}

/** JSON error response, with the headers an agent needs to handle it. */
export function apiError(
  code: ApiErrorCode,
  message: string,
  hint: string,
  extraHeaders: Record<string, string> = {}
): Response {
  const { body, status } = buildApiError(code, message, hint);

  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'content-type': 'application/problem+json; charset=utf-8',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

export const ALLOWED_METHODS = 'GET, HEAD, OPTIONS';

/** Shared 405 for the read-only endpoints. */
export function methodNotAllowed(): Response {
  return apiError(
    'method_not_allowed',
    'This endpoint is read-only.',
    `Use one of: ${ALLOWED_METHODS}.`,
    { allow: ALLOWED_METHODS }
  );
}
