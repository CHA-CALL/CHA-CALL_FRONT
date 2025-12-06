import { useState } from 'react';
import {
  useChangeFoodTrucksViewedStatus,
  useDeleteOwnerFoodTrucks,
} from '@pages/@owner/food-truck-management/hooks/use-food-truck-list';
import useToast from '@hooks/use-toast';
import type { ViewedStatus } from '../constants/viewed-status';

export const useFoodTruckEditMode = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteFoodTruckIds, setDeleteFoodTruckIds] = useState<number[]>([]);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const toast = useToast();

  const { mutate } = useDeleteOwnerFoodTrucks();
  const { changeStatus } = useChangeFoodTrucksViewedStatus();

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
    // TODO: 카드 클릭 시 나의 푸드트럭 수정 페이지로 이동되도록
    console.info(foodTruckId, '번 푸드트럭 수정페이지로 이동');
  };

  const handleToggleFoodTruckStatus = (
    foodTruckId: number,
    status: ViewedStatus
  ) => {
    changeStatus({ foodTruckId, status });
  };

  const handleCheckToDelete = (foodTruckId: number) => {
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
    handleToggleFoodTruckStatus,
    handleCheckToDelete,
    handleDeleteFoodTrucks,
  };
};
