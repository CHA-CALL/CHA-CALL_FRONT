import type {
  BaseResponseSavedFoodTruckStatusResponse,
  BaseResponseCursorPagingResponseFoodTruckResponse,
} from 'apis/data-contracts';

import { apiRequest, type ParamValue } from '@api/apiRequest';

import { formatParams } from '@pages/reservation/utils/format-params';

import { PAGE_SIZE } from '@shared/constant/page-size';
import type {
  AvailableQuantityValue,
  FoodTruckCategoryValue,
  NeedElectricityValue,
  PaymentMethodValue,
} from '@shared/types/category-types';

export interface FoodTrucksFilterType {
  regionCodes?: string[] | null;
  schedules?: string[] | null;
  availableQuantity: AvailableQuantityValue | null;
  categories: FoodTruckCategoryValue[] | null;
  needElectricity: NeedElectricityValue | null;
  paymentMethod: PaymentMethodValue | null;

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
