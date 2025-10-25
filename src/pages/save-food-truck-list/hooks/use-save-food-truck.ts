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
import { SAVE_FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks/save-food-trucks';
import useToast from '@shared/hooks/use-toast';
import type { CursorPagingResponseSavedFoodTruckResponse } from 'apis/data-contracts';

type CachedInfiniteData = InfiniteData<
  CursorPagingResponseSavedFoodTruckResponse | undefined
>;

export const useGetSaveFoodTrucks = () => {
  return useInfiniteQuery({
    queryKey: SAVE_FOOD_TRUCKS_QUERY_KEY.ALL,
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
        queryKey: SAVE_FOOD_TRUCKS_QUERY_KEY.ALL,
      });

      const previousData = queryClient.getQueryData<CachedInfiniteData>(
        SAVE_FOOD_TRUCKS_QUERY_KEY.ALL
      );

      if (previousData) {
        queryClient.setQueryData<CachedInfiniteData>(
          SAVE_FOOD_TRUCKS_QUERY_KEY.ALL,
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
    onError: err => {
      console.error(err.message);
      toast.error('저장된 푸드트럭 삭제에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: SAVE_FOOD_TRUCKS_QUERY_KEY.ALL,
      });
    },
  });
};
