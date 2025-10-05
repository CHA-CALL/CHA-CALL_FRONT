import { useQuery } from '@tanstack/react-query';

import {
  getFoodTrucksData,
  type FoodTrucksFilterType,
} from '@pages/reservation/api';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks/food-trucks';
import type { CursorPagingResponseFoodTruckResponse } from 'apis/data-contracts';

export default function useFoodTruckListQuery(filter?: FoodTrucksFilterType) {
  return useQuery<CursorPagingResponseFoodTruckResponse | undefined>({
    queryKey: FOOD_TRUCKS_QUERY_KEY.FILTER(filter),
    queryFn: async () => {
      const res = await getFoodTrucksData(filter);
      return res.data;
    },
    enabled: !!filter,
  });
}
