import type {
  CursorPagingResponseFoodTruckResponse,
  FoodTruckResponse,
} from 'apis/data-contracts';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import {
  getFoodTrucksData,
  updateFoodTruckSaveStatus,
  type FoodTrucksFilterType,
} from '@pages/reservation/api';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';

const FALLBACK: CursorPagingResponseFoodTruckResponse = {
  content: [],
  lastCursor: undefined,
  hasNext: false,
};

const foodTruckListQuery = (filter: FoodTrucksFilterType) => ({
  queryKey: FOOD_TRUCKS_QUERY_KEY.LIST(filter),
  queryFn: async ({
    pageParam,
  }: QueryFunctionContext<readonly unknown[], number | null>) => {
    const cursor = pageParam ?? null;

    const response = await getFoodTrucksData({
      filter,
      cursor,
    });
    return response ?? FALLBACK;
  },
  initialPageParam: null as number | null,
  getNextPageParam: (last: CursorPagingResponseFoodTruckResponse) => {
    if (last.hasNext) return last.lastCursor;
    return undefined;
  },
  refetchOnWindowFocus: true,
});

export const useFoodTruckListQuery = (filter: FoodTrucksFilterType) => {
  const { data, isPending, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(foodTruckListQuery(filter));

  const foodTruckData: FoodTruckResponse[] =
    data?.pages.flatMap(p => p.content ?? []) ?? [];
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

export const useUpdateFoodTruckSaveStatus = (foodTruckId?: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: FOOD_TRUCKS_QUERY_KEY.DETAIL(foodTruckId ?? 0),
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
      if (foodTruckId) {
        qc.invalidateQueries({
          queryKey: FOOD_TRUCKS_QUERY_KEY.DETAIL(foodTruckId ?? 0),
          refetchType: 'all',
        });
      }
    },
  });
};
