import { useState } from 'react';
import { useDeleteOwnerFoodTrucks } from '@pages/@owner/food-truck-management/hooks/use-food-truck-list';
import useToast from '@shared/hooks/use-toast';

export const useFoodTruckEditMode = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteFoodTruckIds, setDeleteFoodTruckIds] = useState<number[]>([]);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const toast = useToast();

  const { mutate } = useDeleteOwnerFoodTrucks();

  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
    setDeleteFoodTruckIds([]);
  };

  const handleConfirmModal = () => {
    if (deleteFoodTruckIds.length === 0) {
      toast.error('삭제할 푸드트럭을 선택해주세요.');
      return;
    }
    setIsDeleteConfirmModalOpen(prev => !prev);
  };

  const handleClickFoodTruck = (foodTruckId: number) => {
    if (deleteFoodTruckIds.includes(foodTruckId)) {
      setDeleteFoodTruckIds(
        deleteFoodTruckIds.filter(id => id !== foodTruckId)
      );
    } else {
      setDeleteFoodTruckIds([...deleteFoodTruckIds, foodTruckId]);
    }
  };

  const handleDeleteFoodTrucks = () => {
    handleConfirmModal();
    deleteFoodTruckIds.forEach(foodTruckId => {
      mutate(foodTruckId);
    });
    setDeleteFoodTruckIds([]);
  };

  return {
    isEditing,
    handleToggleEditing,
    deleteFoodTruckIds,
    isDeleteConfirmModalOpen,
    handleConfirmModal,
    handleClickFoodTruck,
    handleDeleteFoodTrucks,
  };
};
