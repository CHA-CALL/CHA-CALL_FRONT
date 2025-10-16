import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editFoodTruckMenu } from '@pages/@owner/menu/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { MENUS_QUERY_KEY } from '@shared/querykey/owner/menus';

export const useEditMenu = (
  foodTruckId: number,
  menuId: number,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      price: number;
      photoUrl: string;
    }) => editFoodTruckMenu({ foodTruckId, menuId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MENUS_QUERY_KEY.LIST(foodTruckId),
      });
      navigate(ROUTES.MENU_LIST);
    },
    onError: (error) => {
      console.error('메뉴 수정 실패:', error);
    },
  });
};
