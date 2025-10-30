import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { FoodTruckMenuResponse } from 'apis/data-contracts';

import { getFoodTruckMenusPreview } from '@pages/food-truck-detail/api';
import { GET_FOOD_TRUCKS_MENUS_QUERY_KEY } from '@shared/querykey/food-trucks/menus';

export const useFoodTruckMenus = () => {
  const { foodTruckId } = useParams();

  const {
    data: menusPreview,
    isPending: isPendingMenusPreview,
    isError: isErrorMenusPreview,
  } = useQuery<FoodTruckMenuResponse[] | undefined>({
    queryKey: [GET_FOOD_TRUCKS_MENUS_QUERY_KEY.DETAIL(Number(foodTruckId))],
    queryFn: () => getFoodTruckMenusPreview(Number(foodTruckId)),
  });

  return {
    menusPreview,
    isPendingMenusPreview,
    isErrorMenusPreview,
  };
};
