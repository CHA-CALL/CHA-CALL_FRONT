import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editFoodTruckMenu, uploadImage, getPresignedUrl } from '@pages/@owner/menu/api';
import { ROUTES } from '@/router/constant/routes';
import { MENUS_QUERY_KEY } from '@shared/querykey/owner/menus';
import useToast from '@shared/hooks/use-toast';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';
import { useDeleteMenu } from '@pages/@owner/menu/hooks/use-menu-delete';

export const useEditMenu = (
  foodTruckId: number,
  menuId: number,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteMenu } = useDeleteMenu(foodTruckId, menuId);

  const { mutate: editMenu } = useMutation({
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
      toast.success('메뉴가 수정되었습니다.');
    },
    onError: () => {
      toast.error('메뉴 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleEditSubmit = async (formData: MenuFormData) => {
    if (!formData.imageUrl) {
      toast.error('이미지를 업로드해주세요.');
      return;
    }

    try {
      const fileExtension = formData.imageUrl.name.split('.').pop() || '';
      const imageInfo = await getPresignedUrl(fileExtension);

      await uploadImage(imageInfo.presignedUrl!, formData.imageUrl);

      editMenu({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        photoUrl: imageInfo.fileUrl!,
      });
    } catch (error) {
      console.error('메뉴 수정에 실패했습니다.:', error);
      toast.error('메뉴 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
    };

  const handleClickDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMenu();
    setIsModalOpen(false);
  };

  const handleClickBack = () => {
    navigate(ROUTES.MENU_LIST(foodTruckId.toString()));
  }

  return {
    isModalOpen,
    handleEditSubmit,
    handleConfirmDelete,
    handleCloseModal,
    handleClickDelete,
    handleClickBack,
  };
};
