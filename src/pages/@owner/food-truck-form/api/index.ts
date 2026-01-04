import type {
  BaseResponseFoodTruckIdResponse,
  UpdateFoodTruckInfoRequest,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export const updateMyFoodTruckInfoApi = async (
  foodTruckId: number,
  data: UpdateFoodTruckInfoRequest
) => {
  const response = await apiRequest<BaseResponseFoodTruckIdResponse>({
    endPoint: `/food-trucks/${foodTruckId}`,
    method: 'PUT',
    data,
  });
  return response.data;
};
