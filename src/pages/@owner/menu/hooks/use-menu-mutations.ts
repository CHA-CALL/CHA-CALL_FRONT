import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import {
  postFoodTruckMenu,
  editFoodTruckMenu,
  deleteFoodTruckMenu,
  editMenuStatus,
  uploadImage,
  getPresignedUrl,
} from '@pages/@owner/menu/api';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';
import useToast from '@shared/hooks/use-toast';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';

// 메뉴 등록
export const useRegisterMenuMutation = (foodTruckId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();

  const foodTruckFormData = location.state?.formData;

  return useMutation({
    mutationFn: async (formData: MenuFormData) => {
      if (!formData.imageUrl) {
        toast.error('이미지를 업로드해주세요.');
        throw new Error('이미지 업로드해주세요.');
      }

      const fileExtension = formData.imageUrl.name.split('.').pop() || '';
      const imageInfo = await getPresignedUrl(fileExtension);

      if (!imageInfo.presignedUrl || !imageInfo.fileUrl) {
        toast.error('이미지 업로드 URL을 가져오는데 실패했습니다.');
        throw new Error('이미지 업로드 URL을 가져오는데 실패했습니다.');
      }

      await uploadImage(imageInfo.presignedUrl, formData.imageUrl);

      return postFoodTruckMenu({
        foodTruckId,
        data: {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          photoUrl: imageInfo.fileUrl,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.MENUS.SORTED_LIST(foodTruckId),
      });
      navigate(ROUTES.MENU_LIST(foodTruckId.toString()), {
        state: { formData: foodTruckFormData },
      });
      toast.success('메뉴가 등록되었습니다.');
    },
    onError: () => {
      toast.error('메뉴 등록에 실패했습니다.');
    },
  });
};

// 메뉴 수정
export const useEditMenuMutation = (foodTruckId: number, menuId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();

  const foodTruckFormData = location.state?.formData;

  return useMutation({
    mutationFn: async (formData: MenuFormData) => {
      if (!formData.imageUrl) {
        toast.error('이미지를 업로드해주세요.');
        throw new Error('이미지를 업로드해주세요.');
      }

      const fileExtension = formData.imageUrl.name.split('.').pop() || '';
      const imageInfo = await getPresignedUrl(fileExtension);

      await uploadImage(imageInfo.presignedUrl!, formData.imageUrl);

      return editFoodTruckMenu({
        foodTruckId,
        menuId,
        data: {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          photoUrl: imageInfo.fileUrl!,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.MENUS.SORTED_LIST(foodTruckId),
      });
      navigate(ROUTES.MENU_LIST(foodTruckId.toString()), {
        state: { formData: foodTruckFormData },
      });
      toast.success('메뉴가 수정되었습니다.');
    },
    onError: () => {
      toast.error('메뉴 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

// 메뉴 삭제
export const useDeleteMenuMutation = (foodTruckId: number, menuId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();

  const foodTruckFormData = location.state?.formData;

  return useMutation({
    mutationFn: () => deleteFoodTruckMenu({ foodTruckId, menuId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.MENUS.SORTED_LIST(foodTruckId),
      });
      navigate(ROUTES.MENU_LIST(foodTruckId.toString()), {
        state: { formData: foodTruckFormData },
      });
      toast.success('메뉴가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('메뉴 삭제에 실패했습니다.');
    },
  });
};

// 메뉴 상태 변경
export const useUpdateMenuStatusMutation = (foodTruckId: number) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (changedMenus: { menuId: number; status: 'ON' | 'OFF' }[]) => {
      const mutationPromises = changedMenus.map(menu =>
        editMenuStatus({
          foodTruckId,
          menuId: menu.menuId,
          data: { status: menu.status },
        })
      );
      return Promise.all(mutationPromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.MENUS.SORTED_LIST(foodTruckId),
      });
      toast.success('메뉴 표시 상태가 저장되었습니다.');
    },
    onError: () => {
      toast.error('메뉴 표시 상태 저장에 실패했습니다.');
    },
  });
};
