import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { FoodTruckDetailResponse } from 'apis/data-contracts';

import { getFoodTruckDetail } from '@pages/food-truck-detail/api';
import { FOOD_TRUCK_DETAIL } from '@shared/querykey/food-trucks/food-trucks';
import { useUpdateFoodTruckSaveStatus } from '@pages/reservation/hooks/use-food-truck-list-query';

export default function useFoodTruckDetail() {
  const navigate = useNavigate();
  const { foodTruckId } = useParams();
  const foodTruckIdNumber = Number(foodTruckId);

  const {
    data: foodTruckDetailData,
    isPending: isPendingFoodTruckDetail,
    isError: isErrorFoodTruckDetail,
  } = useQuery<FoodTruckDetailResponse | undefined>({
    queryKey: FOOD_TRUCK_DETAIL.DETAIL(foodTruckIdNumber),
    queryFn: () => getFoodTruckDetail(foodTruckIdNumber),
    staleTime: 5000,
  });

  const { mutate: updateSaveStatus } =
    useUpdateFoodTruckSaveStatus(foodTruckIdNumber);

  const handleClickSaveButton = (
    foodTruckId: number,
    isSavedRequest: boolean
  ) => {
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
