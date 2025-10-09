import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { SORT_TYPES, type SortType } from '@pages/@owner/menu/constant/menu-list-sort';
// import type { MyFoodTruckMenuResponse } from 'apis/data-contracts';
import { getFoodTruckMenus } from '@pages/@owner/menu/api';

import { useInfiniteQuery } from '@tanstack/react-query';
import { OWNER_GET_MENUS } from '@shared/querykey/owner/menu';

const PAGE_SIZE = 20;

export const useMenuList = (foodTruckId: number) => {
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSorted, setIsSorted] = useState<SortType>(SORT_TYPES.LATEST);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [...OWNER_GET_MENUS.ALL, foodTruckId, isSorted],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      const sortValue = isSorted === SORT_TYPES.LATEST ? '최신순' : '오래된순';
      return getFoodTruckMenus({
        foodTruckId,
        sort: sortValue,
        'cursorPagingRequest.cursor': pageParam,
        'cursorPagingRequest.size': PAGE_SIZE,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!foodTruckId,
  });

  const menuList = data?.pages.flatMap(page => page?.content || []) || [];

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

  // const handleClickToggle = (menuId?: number) => () => {
  //   // TODO: API 호출로 메뉴 상태 변경
  //   setSortedMenuList(prevList =>
  //     prevList.map(menu =>
  //       menu.menuId === menuId
  //         ? { ...menu, status: menu.status === 'ON' ? 'OFF' : 'ON' }
  //         : menu
  //     )
  //   );
  // };

  const handleSave = () => {
    // TODO: 메뉴 노출 여부 저장
  };

  return {
    isBottomSheetOpen,
    isSorted,
    // sortedMenuList,

    menuList,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,

    handleClickBack,
    handleRegister,

    handleOpenBottomSheet,
    handleCloseBottomSheet,
    handleSortByLatest,
    handleSortByOldest,

    handleMenuClick,
    // handleClickToggle,
    handleSave,
  };
};
