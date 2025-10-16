import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFoodTruckMenu } from '@pages/@owner/menu/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { MENUS_QUERY_KEY } from '@shared/querykey/owner/menus';

export const useDeleteMenu = (
  foodTruckId: number,
  menuId: number,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteFoodTruckMenu({ foodTruckId, menuId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MENUS_QUERY_KEY.LIST(foodTruckId),
      });
      navigate(ROUTES.MENU_LIST(foodTruckId.toString()));
    },
    onError: (error) => {
      console.error('메뉴 삭제 실패:', error);
    },
  });
};
