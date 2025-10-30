import type { GetFoodTruckMenusData } from 'apis/data-contracts';

import { apiRequest } from '@api/apiRequest';
import { MENU_PREVIEW_SIZE } from '@shared/constant/page-size';

export const getFoodTruckMenusPreview = async (foodTruckId: number) => {
  // TODO: 몇 개만 보여줄지 정해지면 수정하기. size 수정하기
  const response = await apiRequest<GetFoodTruckMenusData>({
    endPoint: `/food-trucks/${foodTruckId}/menus?cursorPagingRequest.size=${MENU_PREVIEW_SIZE}`,
    method: 'GET',
  });
  return response.data?.content;
};
