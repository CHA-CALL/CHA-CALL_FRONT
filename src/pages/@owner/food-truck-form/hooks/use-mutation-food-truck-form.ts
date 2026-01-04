import { useNavigate } from 'react-router-dom';
import type { UpdateFoodTruckInfoRequest } from 'apis/data-contracts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToast from '@hooks/use-toast';
import { updateMyFoodTruckInfoApi } from '@pages/@owner/food-truck-form/api';
import { ROUTES } from '@router/constant/routes';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';

export const useMutationFoodTruckForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: updateFoodTruckInfo } = useMutation({
    mutationFn: ({
      foodTruckId,
      data,
    }: {
      foodTruckId: number;
      data: UpdateFoodTruckInfoRequest;
    }) => updateMyFoodTruckInfoApi(foodTruckId, data),
    onSuccess: () => {
      toast.success('푸드트럭 정보가 업데이트 되었습니다.');
      queryClient.invalidateQueries({ queryKey: FOOD_TRUCKS_QUERY_KEY.ALL });
      navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
    },
    onError: error => {
      toast.error(`업데이트 실패 : ${error.message}`);
    },
  });

  return {
    updateFoodTruckInfo,
  };
};
