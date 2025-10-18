import type { GetMyFoodTrucksData } from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export interface GetOwnerFoodTrucksParams {
  cursor?: number;
  size?: number;
}

export const getOwnerFoodTrucks = async ({
  cursor,
  size,
}: {
  cursor?: number;
  size?: number;
}) => {
  const response = await apiRequest<GetMyFoodTrucksData>({
    endPoint: '/owners/me/food-trucks',
    method: 'GET',
    params: {
      cursor,
      size,
    },
  });
  return response.data;
};
