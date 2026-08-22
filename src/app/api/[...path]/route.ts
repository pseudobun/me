import { apiError } from '@/lib/api-errors';

// Catch-all for unknown /api paths. Next's static segments (/api/cv, /api/og)
// take precedence, so this only sees genuinely unrouted requests — which must
// return structured JSON rather than the framework's HTML error page.
export const dynamic = 'force-dynamic';

function unknownEndpoint() {
  return apiError(
    'not_found',
    'No such endpoint.',
    'The published endpoints are GET /api/cv/ and GET /api/og/. See /openapi.json for the full specification.'
  );
}

export const GET = unknownEndpoint;
export const HEAD = unknownEndpoint;
export const POST = unknownEndpoint;
export const PUT = unknownEndpoint;
export const PATCH = unknownEndpoint;
export const DELETE = unknownEndpoint;
export const OPTIONS = unknownEndpoint;
