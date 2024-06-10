import { getImageUrls } from '@/utils/fetchImages';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const useImages = (initialData: { src: string; placeholder: string }[]) => {
  return useInfiniteQuery({
    queryKey: ['images'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getImageUrls(20, pageParam);
      console.log(res);
      return res;
    },
    staleTime: Number.POSITIVE_INFINITY,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return null;
      }
      return pages.flat().length + 1;
    },
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
    placeholderData: keepPreviousData,
  });
};

export default useImages;
