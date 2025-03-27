import { NextResponse, type NextRequest } from 'next/server';
import { getImageUrls } from '@/utils/fetchImages';

export async function POST(request: NextRequest) {
  try {
    const { limit, offset } = await request.json();
    const urls = await getImageUrls(limit, offset);
    return NextResponse.json(
      {
        urls,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(error as string, { status: 500 });
  }
}
