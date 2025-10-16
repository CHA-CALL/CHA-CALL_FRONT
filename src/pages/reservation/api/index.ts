import type {
  BaseResponseSavedFoodTruckStatusResponse,
  BaseResponseCursorPagingResponseFoodTruckResponse,
} from 'apis/data-contracts';

import { apiRequest, type ParamValue } from '@api/apiRequest';

import { formatParams } from '@pages/reservation/utils/format-params';

import type {
  AVAILABLE_QUANTITY,
  NEED_ELECTRICITY,
  PAYMENT_METHOD,
} from '@pages/filter/constant/filter-option-constants';
import { PAGE_SIZE } from '@shared/constant/page-size';

export interface FoodTrucksFilterType {
  regionCodes?: string[] | null;
  schedules?: string[] | null;
  availableQuantity?: (typeof AVAILABLE_QUANTITY)[number] | null;
  categories?: string[] | null;
  needElectricity?: (typeof NEED_ELECTRICITY)[number] | null;
  paymentMethod?: (typeof PAYMENT_METHOD)[number] | null;

  [key: string]: ParamValue;
}

export const getFoodTrucksData = async ({
  filter,
  cursor,
}: {
  filter?: FoodTrucksFilterType;
  cursor?: number | null;
}) => {
  const params = formatParams({
    ...(filter as unknown as Record<string, ParamValue>),
    'cursorPagingRequest.cursor': cursor ?? undefined,
    'cursorPagingRequest.size': PAGE_SIZE,
  });
  const response =
    await apiRequest<BaseResponseCursorPagingResponseFoodTruckResponse>({
      endPoint: `/food-trucks`,
      method: 'GET',
      params,
    });
  return response.data;
};

export const updateFoodTruckSaveStatus = async (
  foodTruckId: number,
  isSavedRequest: boolean
) => {
  const response = await apiRequest<BaseResponseSavedFoodTruckStatusResponse>({
    endPoint: `/members/me/food-trucks/${foodTruckId}`,
    method: 'PATCH',
    data: { isSavedRequest },
  });
  return response.data;
};
