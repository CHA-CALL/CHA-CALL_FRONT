import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  mockFoodTruck,
  mockMenus,
} from '@pages/food-truck-detail/mock-food-truck';

export default function useFoodTruckDetail() {
  const navigate = useNavigate();

  const {
    photoUrl,
    name,
    isSaved,
    description,
    foodTruckServiceAreas,
    activeTime,
    timeDiscussRequired,
    phoneNumber,
    averageRating,
    menuCategories,
    operatingInfo,
    availableQuantity,
    needElectricity,
    paymentMethod,
    availableDates,
    option,
  } = mockFoodTruck;
  const menus = mockMenus;

  // TODO: 핸들러는 서버 api 호출로 변경될 예정. 상태는 제거 예정
  const [isLiked, setIsLiked] = useState(isSaved);
  const handleClickSaveButton = () => setIsLiked(!isLiked);

  const handleClickBack = () => navigate(-1);
  const handleToChatPage = () => alert('채팅 페이지로');

  return {
    photoUrl,
    name,
    isSaved,
    description,
    foodTruckServiceAreas,
    activeTime,
    timeDiscussRequired,
    phoneNumber,
    averageRating,
    menuCategories,
    operatingInfo,
    availableQuantity,
    needElectricity,
    paymentMethod,
    availableDates,
    option,
    isLiked,
    menus,
    handleClickSaveButton,
    handleClickBack,
    handleToChatPage,
  };
}
