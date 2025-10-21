import { useState } from 'react';
import { useDeleteOwnerFoodTrucks } from '@pages/@owner/food-truck-management/hooks/use-food-truck-list';

export const useFoodTruckDelete = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteFoodTruckIds, setDeleteFoodTruckIds] = useState<number[]>([]);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);

  const { mutate } = useDeleteOwnerFoodTrucks();

  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
    setDeleteFoodTruckIds([]);
  };

  const handleConfirmModal = () => {
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
