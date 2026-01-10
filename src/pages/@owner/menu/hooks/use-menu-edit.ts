import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';
import {
  useEditMenuMutation,
  useDeleteMenuMutation,
} from '@pages/@owner/menu/hooks/use-menu-mutations';

export const useEditMenu = (foodTruckId: number, menuId: number) => {
  const navigate = useNavigate();
  const location = useLocation();

  const foodTruckFormData = location.state?.formData;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: editMenu } = useEditMenuMutation(foodTruckId, menuId);
  const { mutate: deleteMenu } = useDeleteMenuMutation(foodTruckId, menuId);

  const handleEditSubmit = (formData: MenuFormData) => {
    editMenu(formData);
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
    navigate(ROUTES.MENU_LIST(foodTruckId.toString()), {
      state: { formData: foodTruckFormData },
    });
  };

  return {
    isModalOpen,
    handleEditSubmit,
    handleConfirmDelete,
    handleCloseModal,
    handleClickDelete,
    handleClickBack,
  };
};
