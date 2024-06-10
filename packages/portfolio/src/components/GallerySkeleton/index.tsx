export default function GallerySkeleton() {
  return (
    <div className="mt-2 text-xl">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className="w-full xl:w-1/3 2xl:w-1/4 flex justify-center"
          >
            <div className="h-[1024px] w-[512px] bg-gray-200 rounded-lg" />
          </div>
        ))}
    </div>
  );
}
