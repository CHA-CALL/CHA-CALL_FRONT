import type { CursorPagingResponseMyFoodTruckResponse } from 'apis/data-contracts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getOwnerFoodTrucks } from '@pages/@owner/food-truck-management/api';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks/food-trucks';

const PAGE_SIZE = 20;

const FALLBACK: CursorPagingResponseMyFoodTruckResponse = {
  content: [],
  lastCursor: undefined,
  hasNext: false,
};

export const useGetOwnerFoodTrucks = () => {
  return useInfiniteQuery<CursorPagingResponseMyFoodTruckResponse>({
    queryKey: FOOD_TRUCKS_QUERY_KEY.ALL,
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam === null ? undefined : Number(pageParam);
      const response = await getOwnerFoodTrucks({
        cursor,
        size: PAGE_SIZE,
      });
      return response ?? FALLBACK;
    },
    initialPageParam: null,
    getNextPageParam: lastPage => {
      if (lastPage?.hasNext && lastPage.lastCursor !== undefined) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
  });
};
