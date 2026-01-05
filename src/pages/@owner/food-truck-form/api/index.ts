import type { BaseResponseFoodTruckIdResponse } from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export interface UpdateFoodTruckInfoApiRequest {
  name: string;
  description: string;
  phoneNumber: string;
  activeTime: string;
  timeDiscussRequired: boolean;
  foodTruckServiceAreas: number[];
  menuCategories: string[];
  availableQuantity: string;
  needElectricity: string;
  paymentMethod: string;
  availableDates: string[];
  photoUrls: string[];
  operatingInfo?: string;
  option?: string;
}
export const updateMyFoodTruckInfoApi = async (
  foodTruckId: number,
  data: UpdateFoodTruckInfoApiRequest
) => {
  const response = await apiRequest<BaseResponseFoodTruckIdResponse>({
    endPoint: `/food-trucks/${foodTruckId}`,
    method: 'PUT',
    data,
  });
  return response.data;
};
