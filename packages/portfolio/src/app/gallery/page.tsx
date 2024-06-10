import GalleryGrid from '@/components/GalleryGrid';
import GallerySkeleton from '@/components/GallerySkeleton';
import supabaseClient from '@/config/supabase';
import { Suspense } from 'react';

export const metadata = {
  title: 'Gallery',
};

async function getImageUrls() {
  const data = await supabaseClient.storage
    .from('images')
    .list('', { limit: 100, offset: 0 });
  if (data.error) {
    console.error(data.error);
    throw new Error('Error fetching images');
  }
  const urls: string[] = [];
  data.data!.map((item) => {
    const url = supabaseClient.storage.from('images').getPublicUrl(item.name)
      .data.publicUrl;
    if (url.includes('.emptyFolderPlaceholder')) return;
    urls.push(
      supabaseClient.storage.from('images').getPublicUrl(item.name).data
        .publicUrl
    );
  });
  return urls;
}

export default async function Gallery() {
  const urls = await getImageUrls();
  return (
    <div className="flex flex-1 flex-col h-full gap-y-10 w-full justify-start mb-12 text-gray-200">
      <div>
        <p className="sm:text-3xl text-3xl">Gallery</p>
        <p className="sm:text-xl text-xl">Sometimes I 📸 stuff.</p>
      </div>
      <GalleryGrid urls={urls} />
    </div>
  );
}
