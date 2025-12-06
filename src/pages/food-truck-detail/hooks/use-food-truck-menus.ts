import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type {
  CursorPagingResponseFoodTruckMenuResponse,
  FoodTruckMenuResponse,
} from 'apis/data-contracts';

import {
  getFoodTruckMenus,
  searchFoodTruckMenus,
} from '@pages/food-truck-detail/api';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';

const FALLBACK: CursorPagingResponseFoodTruckMenuResponse = {
  content: [],
  lastCursor: undefined,
  hasNext: false,
};

export const useFoodTruckMenus = (foodTruckId: number) => {
  const { ref: listBottomRef, inView } = useInView();

  const {
    data: menusData,
    isPending: isPendingMenus,
    isError: isErrorMenus,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<CursorPagingResponseFoodTruckMenuResponse>({
    queryKey: FOOD_TRUCKS_QUERY_KEY.menus.SCROLL(foodTruckId),
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const cursor =
        pageParam === null || typeof pageParam === 'number' ? pageParam : null;

      const response = await getFoodTruckMenus(foodTruckId, false, cursor);
      return response ?? FALLBACK;
    },
    getNextPageParam: last => {
      if (last.hasNext) return last.lastCursor;
    },
    refetchOnWindowFocus: true,
    staleTime: 5000,
  });
  const foodTruckMenusData: FoodTruckMenuResponse[] =
    menusData?.pages.flatMap(p => p.content ?? []) ?? [];
  const hasNextFoodTruckMenus = menusData?.pages.at(-1)?.hasNext ?? false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (inView && hasNextFoodTruckMenus && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextFoodTruckMenus, isFetchingNextPage, fetchNextPage]);

  return {
    foodTruckMenusData,
    isPendingMenus,
    isErrorMenus,
    listBottomRef,
  };
};

export const useFoodTruckMenusPreview = (foodTruckId: number) => {
  const {
    data: menusPreviewData,
    isPending: isPendingMenusPreview,
    isError: isErrorMenusPreview,
  } = useQuery<CursorPagingResponseFoodTruckMenuResponse | undefined>({
    queryKey: FOOD_TRUCKS_QUERY_KEY.menus.PREVIEW(foodTruckId),
    queryFn: () => getFoodTruckMenus(foodTruckId, true),
    staleTime: 5000,
  });

  const menusPreview = menusPreviewData?.content;

  return {
    menusPreview,
    isPendingMenusPreview,
    isErrorMenusPreview,
  };
};

export const useSearchFoodTruckMenus = (foodTruckId: number) => {
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleDeleteInputText = () => {
    setInputText('');
    setSearchText('');
  };
  const handleSearchMenu = useCallback(() => {
    setSearchText(inputText.trim());
  }, [inputText]);

  const {
    data: searchedMenus,
    isPending: isPendingMenusSearch,
    isError: isErrorMenusSearch,
  } = useQuery<FoodTruckMenuResponse[] | undefined>({
    queryKey: FOOD_TRUCKS_QUERY_KEY.menus.SEARCH(foodTruckId, searchText),
    queryFn: () => searchFoodTruckMenus(foodTruckId, searchText),
    enabled: !!searchText,
  });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearchMenu();
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [inputText, handleSearchMenu]);

  return {
    searchedMenus,
    isPendingMenusSearch,
    isErrorMenusSearch,
    inputText,
    searchText,
    handleChangeInputText,
    handleDeleteInputText,
    handleSearchMenu,
  };
};
