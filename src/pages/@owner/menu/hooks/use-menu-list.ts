import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { SORT_TYPES, type SortType } from '@pages/@owner/menu/constant/menu-list-sort';
import type { MyFoodTruckMenuResponse } from 'apis/data-contracts';
import { mockMenuData } from '@pages/@owner/menu/constant/mockUp';

export const useMenuList = () => {
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSorted, setIsSorted] = useState<SortType>(SORT_TYPES.LATEST);
  const [sortedMenuList, setSortedMenuList] = useState<MyFoodTruckMenuResponse[]>([]);

  useEffect(() => {
    // TODO: API 연동
    const mockFoodTrucks: MyFoodTruckMenuResponse[] = mockMenuData;

    const sorted = [...mockFoodTrucks].sort((a, b) => {
      const idA = a.menuId || 0;
      const idB = b.menuId || 0;
      return isSorted === SORT_TYPES.LATEST ? idB - idA : idA - idB;
    });
    setSortedMenuList(sorted);
  }, [isSorted]);

  // 네비게이션 핸들러
  const handleClickBack = () => {
    navigate(-1);
  };

  const handleRegister = () => {
    navigate(ROUTES.MENU_REGISTER);
  };

  // 바텀 시트 핸들러
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleSortByLatest = () => {
    setIsSorted(SORT_TYPES.LATEST);
    handleCloseBottomSheet();
  };

  const handleSortByOldest = () => {
    setIsSorted(SORT_TYPES.OLDEST);
    handleCloseBottomSheet();
  };

  // 메뉴 핸들러
  const handleMenuClick = (menuId?: string) => () => {
    if (menuId) {
      navigate(ROUTES.MENU_EDIT(menuId));
    }
  };

  const handleClickToggle = (menuId?: number) => () => {
    // TODO: API 호출로 메뉴 상태 변경
    setSortedMenuList(prevList =>
      prevList.map(menu =>
        menu.menuId === menuId
          ? { ...menu, status: menu.status === 'ON' ? 'OFF' : 'ON' }
          : menu
      )
    );
  };

  const handleSave = () => {
    // TODO: 메뉴 노출 여부 저장
  };

  return {
    isBottomSheetOpen,
    isSorted,
    sortedMenuList,

    handleClickBack,
    handleRegister,

    handleOpenBottomSheet,
    handleCloseBottomSheet,
    handleSortByLatest,
    handleSortByOldest,

    handleMenuClick,
    handleClickToggle,
    handleSave,
  };
};
