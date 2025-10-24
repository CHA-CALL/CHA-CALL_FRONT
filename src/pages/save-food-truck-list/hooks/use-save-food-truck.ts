import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getSavedFoodTruckList } from '@pages/save-food-truck-list/api';
import { SAVE_FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks/save-food-trucks';

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
      foodTrucks: data.pages.flatMap(page => page?.content),
    }),
  });
};
