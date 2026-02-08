import BunnySceneLoader from '@/components/BunnyScene/BunnySceneLoader';

export default function Home() {
  return (
    <div className="w-full flex-1 flex items-center justify-center -mt-8 md:-mt-12">
      <div className="w-full max-w-2xl aspect-square max-h-[70vh]">
        <BunnySceneLoader />
      </div>
    </div>
  );
}
