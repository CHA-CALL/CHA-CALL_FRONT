import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { FoodTruckDetailResponse } from 'apis/data-contracts';

import { getFoodTruckDetail } from '@pages/food-truck-detail/api';
import { FOOD_TRUCK_DETAIL } from '@shared/querykey/food-trucks/food-trucks';

export default function useFoodTruckDetail() {
  const navigate = useNavigate();
  const { foodTruckId } = useParams();

  const {
    data: foodTruckDetailData,
    isPending: isPendingFoodTruckDetail,
    isError: isErrorFoodTruckDetail,
  } = useQuery<FoodTruckDetailResponse | undefined>({
    queryKey: [FOOD_TRUCK_DETAIL.ALL(Number(foodTruckId))],
    queryFn: () => getFoodTruckDetail(Number(foodTruckId)),
    staleTime: 5000,
  });

  const handleClickSaveButton = () => {};

  const handleClickBack = () => navigate(-1);

  const handleToChatPage = () => alert('채팅 페이지로');

  return {
    foodTruckDetailData,
    handleClickSaveButton,
    handleClickBack,
    handleToChatPage,
    isPendingFoodTruckDetail,
    isErrorFoodTruckDetail,
  };
}
