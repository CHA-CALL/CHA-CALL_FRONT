import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { postFoodTruckMenu, uploadImage, getPresignedUrl } from '@pages/@owner/menu/api';
import { MENUS_QUERY_KEY } from '@shared/querykey/owner/menus';
import useToast from '@shared/hooks/use-toast';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';

export const useRegisterMenu = (foodTruckId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate: registerMenu } = useMutation({
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
      toast.success('메뉴가 등록되었습니다.');
    },
    onError: (error) => {
      console.error('메뉴 등록 실패:', error);
      toast.error('메뉴 등록에 실패했습니다.');
    },
  });

  const handleRegisterSubmit = async (formData: MenuFormData) => {
    if (!formData.imageUrl) {
      toast.error('이미지를 업로드해주세요.');
      return;
    }

    try {
      const fileExtension = formData.imageUrl.name.split('.').pop() || '';
      const imageInfo = await getPresignedUrl(fileExtension);

      if (!imageInfo.presignedUrl || !imageInfo.fileUrl) {
        toast.error('이미지 업로드 URL을 가져오는데 실패했습니다.');
        return;
      }

      await uploadImage(imageInfo.presignedUrl, formData.imageUrl);

      registerMenu({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        photoUrl: imageInfo.fileUrl,
      });
    } catch {
      toast.error('메뉴 등록 중 오류가 발생했습니다.');
    }
  };

  const handleClickBack = () => {
    navigate(ROUTES.MENU_LIST(foodTruckId.toString()));
  };

  return {
    handleRegisterSubmit,
    handleClickBack,
  };
};
