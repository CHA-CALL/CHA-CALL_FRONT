import type {
  GetFoodTruckDetailsData,
  GetFoodTruckMenusData,
  SearchFoodTruckMenusData,
} from 'apis/data-contracts';

import { apiRequest } from '@api/apiRequest';
import { MENU_PREVIEW_SIZE, PAGE_SIZE } from '@shared/constant/page-size';

export const getFoodTruckDetail = async (foodTruckId: number) => {
  const response = await apiRequest<GetFoodTruckDetailsData>({
    endPoint: `/food-trucks/${foodTruckId}`,
    method: 'GET',
  });
  return response.data;
};

export const getFoodTruckMenus = async (
  foodTruckId: number,
  isPreview: boolean,
  cursor?: number | null
) => {
  const params = {
    'cursorPagingRequest.cursor': cursor ?? undefined,
    'cursorPagingRequest.size': isPreview ? MENU_PREVIEW_SIZE : PAGE_SIZE,
  };
  // TODO: 프리뷰에서 몇 개만 보여줄지 정해지면 수정하기. size 수정하기
  const response = await apiRequest<GetFoodTruckMenusData>({
    endPoint: `/food-trucks/${foodTruckId}/menus`,
    method: 'GET',
    params,
  });
  return response.data;
};

export const searchFoodTruckMenus = async (
  foodTruckId: number,
  keyword: string
) => {
  const response = await apiRequest<SearchFoodTruckMenusData>({
    endPoint: `/food-trucks/${foodTruckId}/menus/search`,
    method: 'GET',
    params: { keyword },
  });
  return response.data;
};
