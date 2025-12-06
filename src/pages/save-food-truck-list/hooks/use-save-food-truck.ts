import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import {
  getSavedFoodTruckList,
  updateSavedFoodTruckList,
} from '@pages/save-food-truck-list/api';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';
import useToast from '@shared/hooks/use-toast';
import type { CursorPagingResponseSavedFoodTruckResponse } from 'apis/data-contracts';

type CachedInfiniteData = InfiniteData<
  CursorPagingResponseSavedFoodTruckResponse | undefined
>;

export const useGetSaveFoodTrucks = () => {
  return useInfiniteQuery({
    queryKey: FOOD_TRUCKS_QUERY_KEY.SAVED(),
    queryFn: getSavedFoodTruckList,
    initialPageParam: undefined,
    getNextPageParam: lastPage => {
      if (lastPage && lastPage.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    select: data => ({
      foodTrucks: data.pages.flatMap(page => page?.content ?? []),
      totalSize: data.pages[0]?.totalSize,
    }),
  });
};

export const useUnsaveFoodTrucks = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (foodTruckId: number) => updateSavedFoodTruckList(foodTruckId),
    onMutate: async (foodTruckId: number) => {
      await queryClient.cancelQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.SAVED(),
      });

      const previousData = queryClient.getQueryData<CachedInfiniteData>(
        FOOD_TRUCKS_QUERY_KEY.SAVED()
      );

      if (previousData) {
        queryClient.setQueryData<CachedInfiniteData>(
          FOOD_TRUCKS_QUERY_KEY.SAVED(),
          {
            ...previousData,
            pages: previousData.pages.map(page => {
              if (!page?.content) {
                return page;
              }
              return {
                ...page,
                content: page.content.filter(
                  truck => truck.foodTruckId !== foodTruckId
                ),
              };
            }),
          }
        );
      }
      return { previousData };
    },
    onError: () => {
      toast.error('저장된 푸드트럭 삭제에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.SAVED(),
      });
    },
  });
};
