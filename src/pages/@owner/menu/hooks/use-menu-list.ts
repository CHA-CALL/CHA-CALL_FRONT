import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { SORT_TYPES, type SortType } from '@pages/@owner/menu/constant/menu-list-sort';
import { getFoodTruckMenus, patchMenuStatus } from '@pages/@owner/menu/api';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OWNER_GET_MENUS } from '@shared/querykey/owner/menu';
import type {
  MyFoodTruckMenuResponse,
  CursorPagingResponseMyFoodTruckMenuResponse,
} from 'apis/data-contracts';

const PAGE_SIZE = 20;

interface InfiniteQueryData {
  pages: (CursorPagingResponseMyFoodTruckMenuResponse | undefined)[];
  pageParams: (number | undefined)[];
}

export const useMenuList = (foodTruckId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutate: toggleMenuStatus } = useMutation({
    mutationFn: ({ menuId, status }: { menuId: number; status: "ON" | "OFF" }) =>
      patchMenuStatus({
        foodTruckId,
        menuId,
        data: { status },
      }),
    onSuccess: (_, variables) => {
      const { menuId, status } = variables;
      const queryKey = [...OWNER_GET_MENUS.ALL, foodTruckId, isSorted];

      queryClient.setQueryData<InfiniteQueryData>(queryKey, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            if (!page) return page;

            return {
              ...page,
              content: page.content?.map((menu: MyFoodTruckMenuResponse) =>
                menu.menuId === menuId ? { ...menu, status } : menu
              ),
            };
          }),
        };
      });
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

  const handleClickToggle = (menuId?: number, currentStatus?: string) => () => {
    if (typeof menuId === 'number' && currentStatus) {
      const newStatus = currentStatus === 'ON' ? 'OFF' : 'ON';
      toggleMenuStatus({
        menuId,
        status: newStatus,
      });
    }
  };

  const handleSave = () => {
    // TODO: 메뉴 노출 여부 저장
  };

  return {
    isBottomSheetOpen,
    isSorted,

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
    handleClickToggle,
    handleSave,
  };
};
