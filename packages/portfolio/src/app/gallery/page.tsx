'use client';

import supabaseClient from '@/config/supabase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import me from '@/public/me.png';

export default function Gallery() {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await supabaseClient.storage
        .from('images')
        .list('', { limit: 10, offset: 0 });
      const urls: string[] = [];
      data.data!.map((item) => {
        urls.push(
          supabaseClient.storage.from('images').getPublicUrl(item.name).data
            .publicUrl
        );
      });
      setData(urls);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-1 justify-center text-2xl">
      <div className="flex max-w-5xl flex-1 flex-col content-center items-center justify-center text-gray-200 md:flex-row">
        <div className="flex-1 items-center md:order-2 md:w-1/3">
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">Gallery</div>
            <div className="mt-2 text-xl">
              {data.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: no other key to use
                <div key={index}>
                  <Image
                    src={item}
                    alt="Portfolio"
                    width={500}
                    height={500}
                    placeholder="empty"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
