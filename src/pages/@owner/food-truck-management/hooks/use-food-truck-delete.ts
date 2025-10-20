import { useState } from 'react';

export const useFoodTruckDelete = () => {
  const [isEditing, setIsEditing] = useState(false);
  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
    setDeleteFoodTruckIds([]);
  };
  const [deleteFoodTruckIds, setDeleteFoodTruckIds] = useState<number[]>([]);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);

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
