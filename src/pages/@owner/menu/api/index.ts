import type {
  BaseResponseCursorPagingResponseMyFoodTruckMenuResponse,
  UpdateMenuStatusRequest,
  BaseResponseVoid,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export const getFoodTruckMenus = async (params: {
  foodTruckId: number;
  sort?: '최신순' | '오래된순',
  'cursorPagingRequest.cursor'?: number;
  'cursorPagingRequest.size'?: number;
}) => {
  const response = await apiRequest<BaseResponseCursorPagingResponseMyFoodTruckMenuResponse>({
    endPoint: `/owners/me/food-trucks/${params.foodTruckId}/menus`,
    method: 'GET',
    params,
  });
  return response.data;
};

export const patchMenuStatus = async (params: {
  foodTruckId: number;
  menuId: number;
  data: UpdateMenuStatusRequest;
}) => {
  const { foodTruckId, menuId, data } = params;
  const response = await apiRequest<BaseResponseVoid>({
    endPoint: `/owners/me/food-trucks/${foodTruckId}/menus/${menuId}/change-status`,
    method: 'PATCH',
    data,
  });
  return response.data;
};
