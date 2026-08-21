import { NextResponse } from 'next/server';
import { buildAgentTxt } from '@/lib/llms-txt';

export const revalidate = 86400;

export function GET() {
  return new NextResponse(buildAgentTxt(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
