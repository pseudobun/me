import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const useImages = (initialData: { src: string; placeholder: string }[]) => {
  return useInfiniteQuery({
    queryKey: ['images'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch('/api/images', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          limit: 5,
          offset: pageParam,
        }),
        next: { revalidate: 60 * 60 * 24 * 7 }, // cache for 7 days
      });
      if (response.status !== 200) {
        return [];
      }
      return (await response.json()).urls;
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
