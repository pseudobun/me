'use client';

import dynamic from 'next/dynamic';

const BunnyScene = dynamic(() => import('@/components/BunnyScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-muted-foreground/20 border-t-primary animate-spin" />
    </div>
  ),
});

export default function BunnySceneLoader() {
  return <BunnyScene />;
}
