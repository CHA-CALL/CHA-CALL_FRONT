import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editFoodTruckMenu } from '@pages/@owner/menu/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { MENUS_QUERY_KEY } from '@shared/querykey/owner/menus';
import useToast from '@shared/hooks/use-toast';

export const useEditMenu = (
  foodTruckId: number,
  menuId: number,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

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
      navigate(ROUTES.MENU_LIST(foodTruckId.toString()));
    },
    onError: () => {
      toast.error('메뉴 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
