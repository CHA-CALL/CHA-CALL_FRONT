import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { FoodTruckDetailResponse } from 'apis/data-contracts';

import { getFoodTruckDetail } from '@pages/food-truck-detail/api';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';
import { useUpdateFoodTruckSaveStatus } from '@pages/reservation/hooks/use-food-truck-list-query';

const foodTruckDetailQuery = (foodTruckId: number) => ({
  queryKey: FOOD_TRUCKS_QUERY_KEY.DETAIL(foodTruckId),
  queryFn: () => getFoodTruckDetail(foodTruckId),
  staleTime: 5000,
  enabled: !!foodTruckId,
});

export default function useFoodTruckDetail(foodTruckId: number) {
  const navigate = useNavigate();

  const {
    data: foodTruckDetailData,
    isPending: isPendingFoodTruckDetail,
    isError: isErrorFoodTruckDetail,
  } = useQuery<FoodTruckDetailResponse | undefined>(
    foodTruckDetailQuery(foodTruckId)
  );

  const { mutate: updateSaveStatus } =
    useUpdateFoodTruckSaveStatus(foodTruckId);

  const handleClickSaveButton = (isSavedRequest: boolean) => {
    updateSaveStatus({ foodTruckId, isSavedRequest });
  };

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
