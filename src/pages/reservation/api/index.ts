import type { GetFoodTrucksData } from '@/../apis/data-contracts';

import { apiRequest } from '@api/apiRequest';
import {
  AVAILABLE_QUANTITY,
  NEED_ELECTRICITY,
  PAYMENT_METHOD,
} from '@pages/filter/constant/filter-option-constants';

export interface FoodTrucksFilterType {
  regionCodes?: string[] | null;
  schedules?: string[] | null;
  availableQuantity?: typeof AVAILABLE_QUANTITY | null;
  categories?: string[] | null;
  needElectricity?: typeof NEED_ELECTRICITY | null;
  paymentMethod?: typeof PAYMENT_METHOD | null;
  'cursorPagingRequest.cursor'?: number;
  'cursorPagingRequest.size'?: number;
}

export const getFoodTrucksData = async (filter?: FoodTrucksFilterType) => {
  const response = await apiRequest<GetFoodTrucksData>({
    endPoint: `/food-trucks`,
    method: 'GET',
    params: toStringParams(filter),
  });
  return response;
};

// TODO: 추후 머지 이후 삭제 예정. apiRequest에서 해당 기능 수행 예정.
const toStringParams = (
  filter?: FoodTrucksFilterType
): Record<string, string> | undefined => {
  if (!filter) return undefined;
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(filter)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      result[key] = value.join(',');
    } else {
      const s = String(value);
      if (s === '') continue;
      result[key] = s;
    }
  }
  return Object.keys(result).length ? result : undefined;
};
