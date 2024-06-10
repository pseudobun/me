'use client';
import Image from 'next/image';
import { Masonry } from 'react-plock';

export default function GalleryGrid({
  data,
}: { data: { src: string; placeholder: string }[] }) {
  return (
    <Masonry
      items={data}
      config={{
        columns: [1, 2, 3, 4],
        gap: [24, 12, 6, 3],
        media: [640, 768, 1024, 1280],
      }}
      render={(item, idx) => (
        <Image
          key={idx}
          src={item.src}
          alt={`/Gallery image at: ${item}`}
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={1000}
          placeholder="blur"
          blurDataURL={item.placeholder}
          height={1000}
          sizes="100vw"
          className="rounded-xl object-fit"
        />
      )}
    />
  );
}
