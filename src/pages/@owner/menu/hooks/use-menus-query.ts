import { useInfiniteQuery } from '@tanstack/react-query';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';
import { getFoodTruckMenus } from '@pages/@owner/menu/api';
import type { SortType } from '@pages/@owner/menu/constant/menu-list-sort';

export const useMenusQuery = (foodTruckId: number, isSorted: SortType) => {
  return useInfiniteQuery({
    queryKey: FOOD_TRUCKS_QUERY_KEY.MENUS.SORTED_LIST(foodTruckId, isSorted),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getFoodTruckMenus({
        foodTruckId,
        sort: isSorted,
        'cursorPagingRequest.cursor': pageParam,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: lastPage => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!foodTruckId,
  });
};
