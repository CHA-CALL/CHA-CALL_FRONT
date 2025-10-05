import type { GetFoodTrucksData } from 'apis/data-contracts';

import { apiRequest, type ParamValue } from '@api/apiRequest';
import {
  AVAILABLE_QUANTITY,
  NEED_ELECTRICITY,
  PAYMENT_METHOD,
} from '@pages/filter/constant/filter-option-constants';

export interface FoodTrucksFilterType {
  regionCodes?: string[] | null;
  schedules?: string[] | null;
  availableQuantity?: (typeof AVAILABLE_QUANTITY)[number] | null;
  categories?: string[] | null;
  needElectricity?: (typeof NEED_ELECTRICITY)[number] | null;
  paymentMethod?: (typeof PAYMENT_METHOD)[number] | null;
  'cursorPagingRequest.cursor'?: number;
  'cursorPagingRequest.size'?: number;

  [key: string]: ParamValue;
}

export const getFoodTrucksData = async (filter?: FoodTrucksFilterType) => {
  const response = await apiRequest<GetFoodTrucksData>({
    endPoint: `/food-trucks`,
    method: 'GET',
    params: filter ?? undefined,
  });
  return response;
};
