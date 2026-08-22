import { PERSONAL } from '@/constants/data';
import { SITE_NAME, SITE_URL } from '@/constants/metadata';
import { API_DOCS_URL } from '@/lib/api-errors';

// OpenAPI 3.1.0 description of the endpoints this site actually exposes.
// Both are public, unauthenticated, parameterless GETs — the spec says exactly
// that rather than implying a product API that does not exist.

const ERROR_SCHEMA = {
  type: 'object',
  required: ['error'],
  additionalProperties: false,
  properties: {
    error: {
      type: 'object',
      required: ['code', 'message', 'hint', 'status', 'documentation_url'],
      additionalProperties: false,
      properties: {
        code: {
          type: 'string',
          enum: ['not_found', 'method_not_allowed', 'internal_error', 'upstream_unavailable'],
          description: 'Stable, machine-readable identifier for the failure.',
        },
        message: {
          type: 'string',
          description: 'Human-readable description of what went wrong.',
        },
        hint: {
          type: 'string',
          description: 'Suggested next action for resolving the error.',
        },
        status: {
          type: 'integer',
          description: 'HTTP status code, repeated in the body for convenience.',
        },
        documentation_url: {
          type: 'string',
          format: 'uri',
          description: 'Where these endpoints are documented.',
        },
      },
    },
  },
} as const;

function errorResponse(description: string) {
  return {
    description,
    content: { 'application/problem+json': { schema: { $ref: '#/components/schemas/Error' } } },
  };
}

export function buildOpenApiDocument() {
  return {
    openapi: '3.1.0',
    info: {
      title: `${SITE_NAME} public endpoints`,
      version: '1.0.0',
      summary: 'Two read-only endpoints published by the personal site of Urban Vidovič.',
      description: [
        `Public, unauthenticated, read-only endpoints on ${SITE_URL}.`,
        '',
        'There are no API keys, no accounts, and no sandbox environment: this is a personal',
        'site, not a product API. Both operations are plain GETs that take no parameters.',
        'Please be reasonable with request volume — sustained automated traffic to the origin',
        'can trip the host’s bot mitigation and temporarily challenge every visitor.',
        '',
        'Errors are returned as `application/problem+json` using the `Error` schema below.',
      ].join('\n'),
      contact: { name: PERSONAL.fullName, email: PERSONAL.email, url: API_DOCS_URL },
      license: { name: 'CC BY 4.0', identifier: 'CC-BY-4.0' },
    },
    servers: [{ url: SITE_URL, description: 'Production' }],
    externalDocs: { description: 'Developer documentation', url: API_DOCS_URL },
    tags: [
      { name: 'documents', description: 'Generated documents about Urban Vidovič.' },
      { name: 'images', description: 'Generated social preview imagery.' },
    ],
    paths: {
      '/api/cv/': {
        get: {
          operationId: 'getCurriculumVitae',
          summary: 'Download the CV as a PDF',
          description:
            'Renders the current curriculum vitae of Urban Vidovič to a PDF and returns it as an attachment. Generated per request from the same source data as the HTML CV at /cv/, so the two never diverge. Takes no parameters and requires no authentication.',
          tags: ['documents'],
          security: [],
          parameters: [],
          responses: {
            '200': {
              description: 'The CV as a PDF document.',
              headers: {
                'Content-Disposition': {
                  description: 'Attachment filename, always urban-vidovic-cv.pdf.',
                  schema: { type: 'string' },
                },
              },
              content: { 'application/pdf': { schema: { type: 'string', format: 'binary' } } },
            },
            '405': errorResponse('The endpoint is read-only and the method was not GET or HEAD.'),
            '500': errorResponse('PDF rendering failed.'),
          },
        },
      },
      '/api/og/': {
        get: {
          operationId: 'getOpenGraphImage',
          summary: 'Render the social preview image',
          description:
            'Returns the 1200x630 PNG used as the Open Graph and Twitter card image for this site. The image embeds a daily snapshot of aggregate public GitHub contribution statistics. Takes no parameters and requires no authentication.',
          tags: ['images'],
          security: [],
          parameters: [],
          responses: {
            '200': {
              description: 'A 1200x630 PNG social preview image.',
              content: { 'image/png': { schema: { type: 'string', format: 'binary' } } },
            },
            '405': errorResponse('The endpoint is read-only and the method was not GET or HEAD.'),
            '500': errorResponse('Image generation failed.'),
          },
        },
      },
    },
    components: {
      securitySchemes: {},
      schemas: { Error: ERROR_SCHEMA },
    },
    security: [],
  };
}
