'use server';
import sharp from 'sharp';
import supabaseClient from '@/config/supabase';

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

async function getFileBufferRemote(url: string) {
  const response = await fetch(url, {
    cache: 'no-cache',
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  return Buffer.from(await response.arrayBuffer());
}

async function getPlaceholderImage(filepath: string) {
  try {
    const originalBuffer = await getFileBufferRemote(filepath);
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer();
    return {
      src: filepath,
      placeholder: bufferToBase64(resizedBuffer),
    };
  } catch {
    return {
      src: filepath,
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==',
    };
  }
}

export async function getImageUrls(limit = 5, offset = 0) {
  const response = await supabaseClient.storage
    .from('images')
    .list('', { limit, offset });
  const { data, error } = response;
  if (error) {
    console.error(error);
    throw new Error('Error fetching images');
  }
  const urls: { src: string; placeholder: string }[] = [];
  for (const item of data) {
    const url = supabaseClient.storage.from('images').getPublicUrl(item.name)
      .data.publicUrl;
    if (url.includes('.emptyFolderPlaceholder')) continue;
    // TODO: continue when vercel has more than 10s of free tier timeout for server functions
    // const placeholder = await getPlaceholderImage(url);
    urls.push({
      src: url,
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==',
    });
  }
  return urls;
}
