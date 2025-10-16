import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { postFoodTruckMenu } from '@pages/@owner/menu/api';
import { MENUS_QUERY_KEY } from '@shared/querykey/owner/menus';

export const useRegisterMenu = (foodTruckId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      price: number;
      photoUrl: string;
    }) => postFoodTruckMenu({ foodTruckId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MENUS_QUERY_KEY.LIST(foodTruckId),
      });
      navigate(ROUTES.MENU_LIST(foodTruckId.toString()));
    },
    onError: (error) => {
      console.error('메뉴 등록 실패:', error);
    },
  });
};
