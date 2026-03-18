import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { getProjectGithubStats } from '@/lib/github-project-stats';

const monoFontDataPromise = readFile(
  path.join(process.cwd(), 'public/fonts/IBMPlexMono-Regular.ttf')
);
const darkLogoDataUriPromise = readFile(
  path.join(process.cwd(), 'public/dark-logo.svg'),
  'utf8'
).then((svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`);

const numberFormatter = new Intl.NumberFormat('en-US');
const decimalFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

const METRIC_COLORS = {
  additions: '#34d399',
  commits: '#f5f5f4',
  deletions: '#fb7185',
  repos: '#facc15',
} as const;

function formatMetricValue(value: number, options?: { prefix?: '+' | '-' }) {
  const safeValue = Math.max(0, value);
  const prefix = options?.prefix ?? '';

  if (safeValue >= 1_000_000) {
    return `${prefix}${decimalFormatter.format(safeValue / 1_000_000)}M`;
  }

  if (safeValue >= 1_000) {
    return `${prefix}${decimalFormatter.format(safeValue / 1_000)}k`;
  }

  return `${prefix}${numberFormatter.format(safeValue)}`;
}

export async function GET() {
  try {
    const [monoFontData, darkLogoDataUri, stats] = await Promise.all([
      monoFontDataPromise,
      darkLogoDataUriPromise,
      getProjectGithubStats(),
    ]);

    const metrics = stats
      ? [
          {
            color: METRIC_COLORS.commits,
            label: 'commits',
            value: formatMetricValue(stats.commits),
          },
          {
            color: METRIC_COLORS.additions,
            label: 'lines added',
            value: formatMetricValue(stats.additions, { prefix: '+' }),
          },
          {
            color: METRIC_COLORS.deletions,
            label: 'lines removed',
            value: formatMetricValue(stats.deletions, { prefix: '-' }),
          },
          {
            color: METRIC_COLORS.repos,
            label: 'repos',
            value: formatMetricValue(stats.repos),
          },
        ]
      : [];

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          color: '#f5f5f4',
          padding: '56px 68px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            border: '1px solid #27272a',
            background: '#111114',
            padding: '44px 48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 280,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 36,
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: next/og ImageResponse renders the SVG logo via a data URI. */}
            <img
              src={darkLogoDataUri}
              alt="Bunny's Den logo"
              width={206}
              height={268}
              style={{ display: 'flex' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              width: 1,
              height: '100%',
              background: '#27272a',
              marginRight: 44,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              <p
                style={{
                  fontFamily: 'IBMPlex',
                  fontSize: 78,
                  lineHeight: 1,
                  margin: 0,
                  maxWidth: 640,
                }}
              >
                pseudobun&apos;s portfolio
              </p>
              <div
                style={{
                  display: 'flex',
                  width: 132,
                  height: 2,
                  background: '#f5f5f4',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                marginTop: 42,
                width: '100%',
              }}
            >
              {stats ? (
                <div
                  style={{
                    display: 'flex',
                    gap: 18,
                    width: '100%',
                  }}
                >
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                        minHeight: 128,
                        padding: '22px 24px',
                        border: '1px solid #27272a',
                        background: '#18181b',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'IBMPlex',
                          fontSize: 18,
                          letterSpacing: 1.4,
                          textTransform: 'uppercase',
                          color: '#a1a1aa',
                          margin: 0,
                        }}
                      >
                        {metric.label}
                      </p>
                      <p
                        style={{
                          fontFamily: 'IBMPlex',
                          fontSize: 34,
                          lineHeight: 1,
                          color: metric.color,
                          margin: 0,
                        }}
                      >
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    border: '1px solid #27272a',
                    background: '#18181b',
                    padding: '24px 28px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'IBMPlex',
                      fontSize: 26,
                      lineHeight: 1.4,
                      color: '#d4d4d8',
                      margin: 0,
                    }}
                  >
                    GitHub stats unavailable right now.
                  </p>
                </div>
              )}
            </div>
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
