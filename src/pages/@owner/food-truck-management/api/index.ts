import type {
  UpdateFoodTruckViewedStatusData,
  DeleteFoodTruckData,
  GetMyFoodTrucksData,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';
import { PAGE_SIZE } from '@constant/page-size';
import type { ViewedStatus } from '@pages/@owner/food-truck-management/constants/viewed-status';

export interface GetOwnerFoodTrucksParams {
  cursor?: number;
}

export const getOwnerFoodTrucks = async ({
  cursor,
}: {
  cursor?: number;
  size?: number;
}) => {
  const response = await apiRequest<GetMyFoodTrucksData>({
    endPoint: '/owners/me/food-trucks',
    method: 'GET',
    params: {
      cursor,
      size: PAGE_SIZE,
    },
  });
  return response.data;
};

export const deleteOwnerFoodTrucks = async ({
  foodTruckId,
}: {
  foodTruckId: number;
}) => {
  const response = await apiRequest<DeleteFoodTruckData>({
    endPoint: `/owners/me/food-trucks/${foodTruckId}`,
    method: 'DELETE',
  });
  return response.data;
};

export const updateFoodTruckStatus = async ({
  foodTruckId,
  status,
}: {
  foodTruckId: number;
  status: ViewedStatus;
}) => {
  const response = await apiRequest<UpdateFoodTruckViewedStatusData>({
    endPoint: `/owners/me/food-trucks/${foodTruckId}/change-status`,
    method: 'PATCH',
    data: {
      status,
    },
  });

  return response.data;
};
