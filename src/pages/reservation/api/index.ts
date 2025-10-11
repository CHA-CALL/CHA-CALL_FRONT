import type {
  BaseResponseSavedFoodTruckStatusResponse,
  BaseResponseCursorPagingResponseFoodTruckResponse,
} from 'apis/data-contracts';

import { apiRequest, type ParamValue } from '@api/apiRequest';
import type { FoodTrucksFilterType } from '@pages/reservation/types/food-trucks-filter-type';
import { formatParams } from '@pages/reservation/utils/format-params';

export const getFoodTrucksData = async ({
  filter,
  cursor,
  size,
}: {
  filter?: FoodTrucksFilterType;
  cursor?: number | null;
  size?: number;
}) => {
  const params = formatParams({
    ...(filter as unknown as Record<string, ParamValue>),
    'cursorPagingRequest.cursor': cursor ?? undefined,
    'cursorPagingRequest.size': size ?? undefined,
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
