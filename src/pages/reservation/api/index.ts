import type { GetFoodTrucksData } from '@/../apis/data-contracts';

import { apiRequest } from '@api/apiRequest';

interface GetFoodTrucksFilterType {
  regionCodes?: string | string[];
  schedules?: string | string[];
  availableQuantity?:
    | '50인분 미만'
    | '100인분 미만'
    | '150인분 미만'
    | '200인분 이상'
    | '논의 필요';
  categories?: string | string[]; // 예: ['분식','한식']
  needElectricity?: '가능' | '불가능' | '논의 필요';
  paymentMethod?: '무관' | '계좌이체' | '카드';
  'cursorPagingRequest.cursor'?: number;
  'cursorPagingRequest.size'?: number;
}

export const getFoodTrucksData = async (filter?: GetFoodTrucksFilterType) => {
  const response = await apiRequest<GetFoodTrucksData>({
    endPoint: `/food-trucks`,
    method: 'GET',
    params: toStringParams(filter),
  });
  return response;
};

const toStringParams = (
  filter?: GetFoodTrucksFilterType
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
