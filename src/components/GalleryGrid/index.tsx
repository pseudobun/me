'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Masonry } from 'react-plock';
import useImages from '@/hooks/useImages';

export default function GalleryGrid({ data }: { data: { src: string; placeholder: string }[] }) {
  const images = useImages(data);
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !images.isFetching && images.hasNextPage) {
          images.fetchNextPage();
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [images]);

  return (
    <div className="flex flex-col justify-center">
      <Masonry
        items={images.data.pages.flat()}
        config={{
          columns: [1, 2, 3, 4],
          gap: [12, 12, 6, 3],
          media: [640, 768, 1024, 1280],
        }}
        render={(item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              delay: 0.4,
            }}
          >
            <Image
              key={idx}
              src={item.src}
              alt={`Gallery image at: ${item}`}
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={512}
              placeholder="blur"
              blurDataURL={item.placeholder}
              height={512}
              sizes="100vw"
              className="rounded-xl object-fit shadow-lg"
            />
          </motion.div>
        )}
      />
      <div ref={sentinelRef} />
    </div>
  );
}
