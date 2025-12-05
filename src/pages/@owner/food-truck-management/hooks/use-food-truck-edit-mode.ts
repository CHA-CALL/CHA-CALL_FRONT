import { useState } from 'react';
import { useDeleteOwnerFoodTrucks } from '@pages/@owner/food-truck-management/hooks/use-food-truck-list';
import useToast from '@hooks/use-toast';

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
    // TODO: 카드 클릭 시 나의 푸드트럭 수정 페이지로 이동되도록
    console.info(foodTruckId, '번 푸드트럭 수정페이지로 이동');
  };

  const handleToggleFoodTruckStatus = (foodTruckId: number) => {
    // TODO: 나의 푸드트럭 표시 상태 변경 api 호출
    console.info(foodTruckId, '번 푸드트럭 표시 상태 변경');
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
