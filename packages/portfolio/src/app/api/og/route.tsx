import { ImageResponse } from 'next/og';
import Bunny from '../../../../public/bunnysden.svg';
import { METADATA } from '@/constants/metadata';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const monoFont = await fetch(
      new URL(
        '../../../../public/fonts/IBMPlexMono-Regular.ttf',
        import.meta.url,
      ),
      {
        next: { revalidate: 60 * 60 * 24 * 7 }, // cache for 7 days
      },
    );

    if (!monoFont.ok) {
      throw new Error('Failed to fetch the font file');
    }

    const monoFontData = await monoFont.arrayBuffer();
    const { searchParams } = new URL(request.url);
    const values = Object.fromEntries(searchParams);
    const {
      title = (METADATA.root.openGraph?.title as string) || "Bunny's Den",
      description = METADATA.root.openGraph?.description ||
        "Urban's personal website.",
    } = values;

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0C0A09',
          backgroundAttachment: 'fixed',
        }}
      >
        <div
          tw="flex flex-1 px-50 text-center items-center"
          className=""
          style={{ justifyContent: 'space-between' }}
        >
          <Bunny tw="h-64 w-64" />
          <div tw="h-[128px] w-[2px] bg-stone-600 mx-8" />
          <div tw="flex flex-col">
            <p tw="text-stone-200 text-3xl" style={{ fontFamily: '"IBMPlex"' }}>
              {title}
            </p>
            <p tw="text-stone-200 text-xl" style={{ fontFamily: '"IBMPlex"' }}>
              {description}
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
      },
    );
  } catch (error) {
    return new Response('Failed to generate image', {
      status: 500,
    });
  }
}
