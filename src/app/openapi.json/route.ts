import { buildOpenApiDocument } from '@/lib/openapi';

export const revalidate = 86400;

export function GET() {
  return new Response(JSON.stringify(buildOpenApiDocument(), null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'access-control-allow-origin': '*',
    },
  });
}
