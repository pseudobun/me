import GalleryGrid from '@/components/GalleryGrid';
import { getImageUrls } from '../utils/images';

export const metadata = {
  title: 'Gallery',
};

export default async function Gallery() {
  const urls = await getImageUrls();
  return (
    <div className="flex flex-1 flex-col h-full gap-y-10 w-full justify-start mb-12 text-gray-200">
      <div>
        <p className="sm:text-3xl text-3xl">Gallery</p>
        <p className="sm:text-xl text-xl">Sometimes I 📸 stuff.</p>
      </div>
      <GalleryGrid data={urls} />
    </div>
  );
}
