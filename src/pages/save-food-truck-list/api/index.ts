import { apiRequest } from '@api/apiRequest';
import type { SAVE_FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks/save-food-trucks';
import type { QueryFunctionContext } from '@tanstack/react-query';
import type {
  GetFoodTrucksData,
  // GetSavedFoodTrucksData,
  UpdateFoodTruckSaveStatusData,
} from 'apis/data-contracts';

type SaveFoodTruckQueryContext = QueryFunctionContext<
  typeof SAVE_FOOD_TRUCKS_QUERY_KEY.ALL,
  number | undefined
>;

const PAGE_SIZE = 20;

export const getSavedFoodTruckList = async ({
  pageParam,
}: SaveFoodTruckQueryContext) => {
  const params: { size: number; cursor?: number } = { size: PAGE_SIZE };
  if (pageParam !== undefined) {
    params.cursor = pageParam;
  }
  const response = await apiRequest<GetFoodTrucksData>({
    // TODO : 현재 백엔드 스웨거에서 피그마와 일치하지 않는 api와 타입이 설정되어 있음.
    // const response = await apiRequest<GetSavedFoodTrucksData>({
    endPoint: '/members/me/food-trucks',
    method: 'GET',
    params: params,
  });
  return response.data;
};

export const updateSavedFoodTruckList = async (foodTruckId: number) => {
  const response = await apiRequest<UpdateFoodTruckSaveStatusData>({
    endPoint: `/members/me/food-trucks/${foodTruckId}`,
    method: 'PATCH',
    data: {
      isSavedRequest: false,
    },
  });
  return response.data;
};
