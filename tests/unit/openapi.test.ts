import { describe, expect, it } from 'vitest';
import { ALLOWED_METHODS, buildApiError } from '@/lib/api-errors';
import { buildOpenApiDocument } from '@/lib/openapi';

describe('buildApiError', () => {
  it('maps each code to its status and repeats it in the body', () => {
    for (const [code, status] of [
      ['not_found', 404],
      ['method_not_allowed', 405],
      ['internal_error', 500],
      ['upstream_unavailable', 503],
    ] as const) {
      const { body, status: actual } = buildApiError(code, 'msg', 'hint');

      expect(actual).toBe(status);
      expect(body.error.status).toBe(status);
      expect(body.error.code).toBe(code);
    }
  });

  it('always carries a message, a hint and a documentation url', () => {
    const { body } = buildApiError('not_found', 'No such endpoint.', 'Try /openapi.json.');

    expect(body.error.message).toBe('No such endpoint.');
    expect(body.error.hint).toBe('Try /openapi.json.');
    expect(body.error.documentation_url).toBe('https://pseudobun.dev/en/developers/');
  });

  it('lists only the read-only methods as allowed', () => {
    expect(ALLOWED_METHODS).toBe('GET, HEAD, OPTIONS');
  });
});

describe('OpenAPI document', () => {
  const doc = buildOpenApiDocument();

  it('is OpenAPI 3.1.0 with a production server', () => {
    expect(doc.openapi).toBe('3.1.0');
    expect(doc.servers[0].url).toBe('https://pseudobun.dev');
  });

  it('describes exactly the endpoints that exist', () => {
    expect(Object.keys(doc.paths)).toEqual(['/api/cv/', '/api/og/']);
  });

  // Function-calling formats key on operationId, so it must be unique and
  // present, and every operation needs a description to be selectable.
  it('gives every operation a unique operationId, summary and description', () => {
    const operations = Object.values(doc.paths).map((path) => path.get);
    const ids = operations.map((operation) => operation.operationId);

    expect(ids).toEqual(['getCurriculumVitae', 'getOpenGraphImage']);
    expect(new Set(ids).size).toBe(ids.length);

    for (const operation of operations) {
      expect(operation.summary.length).toBeGreaterThan(0);
      expect(operation.description.length).toBeGreaterThan(40);
      expect(operation.tags.length).toBeGreaterThan(0);
    }
  });

  it('declares both endpoints as unauthenticated and parameterless', () => {
    expect(doc.security).toEqual([]);
    expect(doc.components.securitySchemes).toEqual({});

    for (const path of Object.values(doc.paths)) {
      expect(path.get.security).toEqual([]);
      expect(path.get.parameters).toEqual([]);
    }
  });

  it('types every response, including the error paths', () => {
    for (const path of Object.values(doc.paths)) {
      const responses = path.get.responses as Record<string, { content?: object }>;

      expect(Object.keys(responses)).toEqual(['200', '405', '500']);
      for (const response of Object.values(responses)) {
        expect(response.content).toBeDefined();
      }
    }
  });

  it('points the error responses at the shared Error schema', () => {
    const error = doc.paths['/api/cv/'].get.responses['405'] as {
      content: Record<string, { schema: { $ref: string } }>;
    };

    expect(error.content['application/problem+json'].schema.$ref).toBe(
      '#/components/schemas/Error'
    );
  });

  it('defines the Error schema with every field the endpoints return', () => {
    const schema = doc.components.schemas.Error;

    expect(schema.properties.error.required).toEqual([
      'code',
      'message',
      'hint',
      'status',
      'documentation_url',
    ]);
    expect(schema.properties.error.properties.code.enum).toEqual([
      'not_found',
      'method_not_allowed',
      'internal_error',
      'upstream_unavailable',
    ]);
  });

  it('serialises to JSON without cycles or undefined values', () => {
    const json = JSON.stringify(doc);

    expect(json).not.toContain('undefined');
    expect(JSON.parse(json)).toEqual(JSON.parse(JSON.stringify(doc)));
  });
});
