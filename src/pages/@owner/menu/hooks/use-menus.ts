import { useInfiniteQuery } from '@tanstack/react-query';
import { MENUS_QUERY_KEY } from '@shared/querykey/owner/menus';
import { getFoodTruckMenus } from '@pages/@owner/menu/api';
import type { SortType } from '@pages/@owner/menu/constant/menu-list-sort';

export const useMenus = (
  foodTruckId: number,
  isSorted: SortType,
) => {
  return useInfiniteQuery({
    queryKey: MENUS_QUERY_KEY.SORTED_LIST(foodTruckId, isSorted),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getFoodTruckMenus({
        foodTruckId,
        sort: isSorted,
        'cursorPagingRequest.cursor': pageParam,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!foodTruckId,
  });
};
