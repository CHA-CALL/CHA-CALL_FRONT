import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { SORT_TYPES, type SortType } from '@pages/@owner/menu/constant/menu-list-sort';
import { editMenuStatus } from '@pages/@owner/menu/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMenus } from '@pages/@owner/menu/hooks/use-menus';
import { MENUS_QUERY_KEY } from '@shared/querykey/owner/menus';
import type { MyFoodTruckMenuResponse } from 'apis/data-contracts';
import useToast from '@shared/hooks/use-toast';

export const useMenuList = (foodTruckId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSorted, setIsSorted] = useState<SortType>(SORT_TYPES.LATEST);
  const [menus, setMenus] = useState<MyFoodTruckMenuResponse[]>([]);

  const query = useMenus(foodTruckId, isSorted);

  useEffect(() => {
    if (query.data) {
      setMenus(query.data.pages.flatMap((page) => page?.content || []));
    }
  }, [query.data]);

  const { mutate: saveMenuChanges } = useMutation({
    mutationFn: (changedMenus: { menuId: number; status: 'ON' | 'OFF' }[]) => {
      const mutationPromises = changedMenus.map((menu) =>
        editMenuStatus({
          foodTruckId,
          menuId: menu.menuId,
          data: { status: menu.status },
        })
      );
      return Promise.all(mutationPromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MENUS_QUERY_KEY.LIST(foodTruckId),
      });
    },
  });

  // 네비게이션 핸들러
  const handleClickBack = () => {
    navigate(-1);
  };

  const handleRegister = (foodTruckId?: string) => {
    navigate(ROUTES.MENU_REGISTER(foodTruckId || ''));
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

    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.menuId === menuId
          ? { ...menu, status: menu.status === 'ON' ? 'OFF' : 'ON' }
          : menu
      )
    );
  };

  // 표시 상태 저장 핸들러
  const handleSave = () => {
    const originalMenus = query.data?.pages.flatMap((page) => page?.content || []) || [];
    const originalStatusMap = new Map(originalMenus.map((m) => [m.menuId, m.status]));

    const changedMenusPayload = menus
      .filter((menu) => {
        const originalStatus = originalStatusMap.get(menu.menuId);
        return menu.menuId && originalStatus && originalStatus !== menu.status;
      })
      .map((menu) => ({ menuId: menu.menuId!, status: menu.status! as 'ON' | 'OFF' }));

    if (changedMenusPayload.length === 0) {
      toast.error('변경사항이 없습니다.');
      return;
    }
    saveMenuChanges(changedMenusPayload);
  };

  return {
    menus,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,

    isBottomSheetOpen,
    isSorted,

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
