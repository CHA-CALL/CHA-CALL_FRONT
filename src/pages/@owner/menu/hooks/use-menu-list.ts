import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { SORT_TYPES, type SortType } from '@pages/@owner/menu/constant/menu-list-sort';
import { getFoodTruckMenus, patchMenuStatus } from '@pages/@owner/menu/api';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OWNER_GET_MENUS } from '@shared/querykey/owner/menu';
import type { MyFoodTruckMenuResponse } from 'apis/data-contracts';

const PAGE_SIZE = 20;

export const useMenuList = (foodTruckId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSorted, setIsSorted] = useState<SortType>(SORT_TYPES.LATEST);
  const [menus, setMenus] = useState<MyFoodTruckMenuResponse[]>([]);

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

  // const originalMenuList = data?.pages.flatMap((page) => page?.content || []) || [];

  useEffect(() => {
    if (data && data.pages) {
      const newMenus = data.pages.flatMap((page) => page?.content || []);
      setMenus(newMenus);
    }
  }, [data]);

  const { mutate: saveMenuChanges } = useMutation({
    mutationFn: (changedMenus: { menuId: number; status: 'ON' | 'OFF' }[]) => {
      const mutationPromises = changedMenus.map((menu) =>
        patchMenuStatus({
          foodTruckId,
          menuId: menu.menuId,
          data: { status: menu.status },
        })
      );
      return Promise.all(mutationPromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...OWNER_GET_MENUS.ALL, foodTruckId] });
    },
  });

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
    if (typeof menuId !== 'number') {
      return;
    }

    setMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.menuId === menuId) {
          const newStatus = menu.status === 'ON' ? 'OFF' : 'ON';
          return { ...menu, status: newStatus };
        }
        return menu;
      })
    )
  };

  const handleSave = () => {
    const originalMenus = data?.pages.flatMap((page) => page?.content || []) || [];
    const originalStatusMap = new Map(
      originalMenus.map((menu) => [menu.menuId, menu.status])
    );

    const changedMenus = menus.filter((menu) =>
      menu.menuId && originalStatusMap.get(menu.menuId) !== menu.status
    ).map((menu) => ({ menuId: menu.menuId!, status: menu.status! as "ON" | "OFF" }));

    if (changedMenus.length === 0) {
      alert('변경사항이 없습니다.');
      return;
    }

    saveMenuChanges(changedMenus);
  };

  return {
    isBottomSheetOpen,
    isSorted,

    menus,
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
    handleClickToggle,
    handleSave,
  };
};
