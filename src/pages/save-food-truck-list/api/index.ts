import { apiRequest } from '@api/apiRequest';
import { PAGE_SIZE } from '@shared/constant/page-size';
import type {
  GetSavedFoodTrucksData,
  UpdateFoodTruckSaveStatusData,
} from 'apis/data-contracts';

export const getSavedFoodTruckList = async ({
  pageParam,
}: {
  pageParam: number | undefined;
}) => {
  const params: { size: number; cursor?: number } = { size: PAGE_SIZE };
  if (pageParam !== undefined) {
    params.cursor = pageParam;
  }
  const response = await apiRequest<GetSavedFoodTrucksData>({
    endPoint: '/members/me/food-trucks',
    method: 'GET',
    params: params,
  });
  return response.data;
};

export const updateSavedFoodTruckList = async (foodTruckId: number) => {
  const response = await apiRequest<UpdateFoodTruckSaveStatusData>({
    endPoint: `/members/me/food-trucks/${foodTruckId}`,
    method: 'PATCH',
    data: {
      isSavedRequest: false,
    },
  });
  return response.data;
};
