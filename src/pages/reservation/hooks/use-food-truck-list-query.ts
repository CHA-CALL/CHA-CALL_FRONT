import type {
  CursorPagingResponseFoodTruckResponse,
  FoodTruckResponse,
} from 'apis/data-contracts';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getFoodTrucksData,
  updateFoodTruckSaveStatus,
  type FoodTrucksFilterType,
} from '@pages/reservation/api';
import {
  FOOD_TRUCKS_MUTATION_KEY,
  FOOD_TRUCKS_QUERY_KEY,
} from '@shared/querykey/food-trucks/food-trucks';
import { PAGE_SIZE } from '@shared/constant/page-size';

const FALLBACK: CursorPagingResponseFoodTruckResponse = {
  content: [],
  lastCursor: undefined,
  hasNext: false,
};

export const useFoodTruckListQuery = (filter: FoodTrucksFilterType) => {
  const { data, isPending, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<CursorPagingResponseFoodTruckResponse>({
      queryKey: FOOD_TRUCKS_QUERY_KEY.FILTER(filter),
      initialPageParam: null,
      queryFn: async ({ pageParam }) => {
        const cursor =
          pageParam === null || typeof pageParam === 'number'
            ? pageParam
            : null;

        const response = await getFoodTrucksData({
          filter,
          cursor,
          size: PAGE_SIZE,
        });
        return response ?? FALLBACK;
      },
      getNextPageParam: last => {
        if (last.hasNext) return last.lastCursor;
      },
      refetchOnWindowFocus: true,
    });

  const foodTruckData: FoodTruckResponse[] =
    data?.pages.flatMap(p => p.content ?? []) ?? [];
  // 마지막 요소에 hasNext 값
  const hasNextFoodTrucks = data?.pages.at(-1)?.hasNext ?? false;

  return {
    foodTruckData,
    isPending,
    hasNextFoodTrucks,
    isFetchingNextPage,
    fetchNextPage,
  };
};

interface UpdateFoodTruckSaveStatusProps {
  foodTruckId: number;
  isSavedRequest: boolean;
}

export const useUpdateFoodTruckSaveStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: FOOD_TRUCKS_MUTATION_KEY.UPDATE_SAVE_STATUS,
    mutationFn: ({
      foodTruckId,
      isSavedRequest,
    }: UpdateFoodTruckSaveStatusProps) =>
      updateFoodTruckSaveStatus(foodTruckId, isSavedRequest),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.ALL,
        refetchType: 'all',
      });
    },
  });
};
