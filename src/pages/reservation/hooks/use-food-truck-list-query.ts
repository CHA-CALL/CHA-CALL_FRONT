import type { CursorPagingResponseFoodTruckResponse } from 'apis/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getFoodTrucksData,
  updateFoodTruckSaveStatus,
  type FoodTrucksFilterType,
} from '@pages/reservation/api';
import {
  FOOD_TRUCKS_MUTATION_KEY,
  FOOD_TRUCKS_QUERY_KEY,
} from '@shared/querykey/food-trucks/food-trucks';

export const useFoodTruckListQuery = (filter?: FoodTrucksFilterType) => {
  return useQuery<CursorPagingResponseFoodTruckResponse | undefined>({
    queryKey: FOOD_TRUCKS_QUERY_KEY.FILTER(filter),
    queryFn: async () => {
      const response = await getFoodTrucksData(filter);
      return response;
    },
  });
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
