import { apiRequest } from '@api/apiRequest';
import type {
  BaseResponseVoid,
  BaseResponseFoodTruckNameDuplicateCheckResponse
} from 'apis/data-contracts';

export const createNewFoodTruck = async (params: {
  name: string,
  businessRegistrationUrl: string,
  otherDocumentUrls?: string[];
}) => {
  const response = await apiRequest<BaseResponseVoid>({
    endPoint: `/owner`,
    method: 'POST',
    params,
  });
  return response.data;
};

export const checkDuplicateName = async (name: string) => {
  const response = await apiRequest<BaseResponseFoodTruckNameDuplicateCheckResponse>({
    endPoint: `/food-trucks/duplicate-check`,
    method: 'POST',
    data: { name },
  });
  return response.data;
};
