import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';

import { useMenusQuery } from '@pages/@owner/menu/hooks/use-menus-query';
import { useUpdateMenuStatusMutation } from '@pages/@owner/menu/hooks/use-menu-mutations';
import { useMenuSort } from '@pages/@owner/menu/hooks/use-menu-sort';
import { useBottomSheet } from '@pages/@owner/menu/hooks/use-bottom-sheet';

import type { MyFoodTruckMenuResponse } from 'apis/data-contracts';
import useToast from '@shared/hooks/use-toast';
import { getNavigateState } from '@pages/@owner/food-truck-form/utils/navigate-state';

export const useMenuList = (foodTruckId: number) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const foodTruckFormData = location.state?.formData;

  const { isSorted, handleSortByLatest, handleSortByOldest } = useMenuSort();
  const { isBottomSheetOpen, handleOpenBottomSheet, handleCloseBottomSheet } =
    useBottomSheet();

  const handleSortByLatestWithClose = () => {
    handleSortByLatest();
    handleCloseBottomSheet();
  };

  const handleSortByOldestWithClose = () => {
    handleSortByOldest();
    handleCloseBottomSheet();
  };

  const { mutate: saveMenuChanges } = useUpdateMenuStatusMutation(foodTruckId);

  const [menus, setMenus] = useState<MyFoodTruckMenuResponse[]>([]);

  const query = useMenusQuery(foodTruckId, isSorted);

  useEffect(() => {
    if (query.data) {
      setMenus(query.data.pages.flatMap(page => page?.content || []));
    }
  }, [query.data]);

  // 네비게이션 핸들러
  const handleClickBack = () => {
    navigate(ROUTES.FOOD_TRUCK_FORM(String(foodTruckId)), {
      state: getNavigateState(foodTruckFormData),
    });
  };

  const handleRegister = (foodTruckId: string) => {
    navigate(ROUTES.MENU_REGISTER(foodTruckId), {
      state: getNavigateState(foodTruckFormData),
    });
  };

  // 메뉴 핸들러
  const handleMenuClick = (foodTruckId?: string, menuId?: string) => () => {
    if (!foodTruckId || !menuId) {
      return;
    }

    const selectedMenu = menus.find(menu => menu.menuId === Number(menuId));
    navigate(ROUTES.MENU_EDIT(foodTruckId, menuId), {
      state: { menuData: selectedMenu },
    });
  };

  const handleClickToggle = (menuId?: number) => () => {
    if (typeof menuId !== 'number') {
      return;
    }

    setMenus(prevMenus =>
      prevMenus.map(menu =>
        menu.menuId === menuId
          ? { ...menu, status: menu.status === 'ON' ? 'OFF' : 'ON' }
          : menu
      )
    );
  };

  const isValidMenuStatus = (
    status: string | undefined
  ): status is 'ON' | 'OFF' => {
    return status === 'ON' || status === 'OFF';
  };

  // 표시 상태 저장 핸들러
  const handleSave = () => {
    const originalMenus =
      query.data?.pages.flatMap(page => page?.content || []) || [];
    const originalStatusMap = new Map(
      originalMenus.map(m => [m.menuId, m.status])
    );

    const changedMenusPayload = menus
      .filter(
        (
          menu
        ): menu is MyFoodTruckMenuResponse & {
          menuId: number;
          status: 'ON' | 'OFF';
        } => {
          const originalStatus = originalStatusMap.get(menu.menuId);
          return (
            typeof menu.menuId === 'number' &&
            originalStatus !== undefined &&
            originalStatus !== menu.status &&
            isValidMenuStatus(menu.status)
          );
        }
      )
      .map(menu => ({
        menuId: menu.menuId,
        status: menu.status,
      }));

    if (changedMenusPayload.length === 0) {
      toast.error('변경사항이 없습니다.');
      return;
    }

    saveMenuChanges(changedMenusPayload);
  };

  return {
    // 메뉴 데이터
    menus,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isPending: query.isPending,
    isFetchingNextPage: query.isFetchingNextPage,

    // 정렬 상태
    isSorted,
    handleSortByLatest: handleSortByLatestWithClose,
    handleSortByOldest: handleSortByOldestWithClose,

    // 바텀시트 상태
    isBottomSheetOpen,
    handleOpenBottomSheet,
    handleCloseBottomSheet,

    // 네비게이션
    handleClickBack,
    handleRegister,

    // 메뉴 핸들러
    handleMenuClick,
    handleClickToggle,
    handleSave,
  };
};
