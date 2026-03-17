import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TITLE } from '@/constants/metadata';
import Bunny from '../../../../public/bunnysden.svg';

const monoFontDataPromise = readFile(
  path.join(process.cwd(), 'public/fonts/IBMPlexMono-Regular.ttf')
);

export async function GET(request: Request) {
  try {
    const monoFontData = await monoFontDataPromise;
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') ?? SITE_TITLE;
    const description =
      searchParams.get('description') ??
      'Decentralized identity, verifiable credentials, Web3 product engineering, and applied research.';

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0c0a09',
          color: '#f5f5f4',
          padding: '56px 64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 256, height: 256, display: 'flex' }}>
              <Bunny />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 700,
            }}
          >
            <p
              style={{
                fontFamily: 'IBMPlex',
                fontSize: 56,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {title}
            </p>
            <p
              style={{
                fontFamily: 'IBMPlex',
                fontSize: 28,
                lineHeight: 1.35,
                margin: 0,
                color: '#d6d3d1',
              }}
            >
              {description}
            </p>
            <p
              style={{
                fontFamily: 'IBMPlex',
                fontSize: 20,
                margin: 0,
                color: '#a8a29e',
              }}
            >
              {SITE_NAME}
            </p>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'IBMPlex',
            data: monoFontData,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch {
    return new Response('Failed to generate image', {
      status: 500,
    });
  }
}
