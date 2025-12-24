import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  useInfiniteQuery,
  useQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';
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

const foodTruckMenusScrollQuery = (foodTruckId: number) => ({
  queryKey: FOOD_TRUCKS_QUERY_KEY.MENUS.SCROLL(foodTruckId),
  queryFn: async ({
    pageParam,
  }: QueryFunctionContext<readonly unknown[], number | null>) => {
    const cursor = pageParam ?? null;
    const response = await getFoodTruckMenus(foodTruckId, false, cursor);
    return response ?? FALLBACK;
  },
  initialPageParam: null as number | null,
  getNextPageParam: (last: CursorPagingResponseFoodTruckMenuResponse) => {
    if (last.hasNext) return last.lastCursor;
    return undefined;
  },
  refetchOnWindowFocus: true,
  staleTime: 5000,
});

const foodTruckMenusPreviewQuery = (foodTruckId: number) => ({
  queryKey: FOOD_TRUCKS_QUERY_KEY.MENUS.PREVIEW(foodTruckId),
  queryFn: () => getFoodTruckMenus(foodTruckId, true),
  staleTime: 5000,
});

const searchFoodTruckMenusQuery = (foodTruckId: number, searchText: string) => ({
  queryKey: FOOD_TRUCKS_QUERY_KEY.MENUS.SEARCH(foodTruckId, searchText),
  queryFn: () => searchFoodTruckMenus(foodTruckId, searchText),
  enabled: !!searchText,
});

export const useFoodTruckMenus = (foodTruckId: number) => {
  const { ref: listBottomRef, inView } = useInView();

  const {
    data: menusData,
    isPending: isPendingMenus,
    isError: isErrorMenus,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(foodTruckMenusScrollQuery(foodTruckId));

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
  } = useQuery<CursorPagingResponseFoodTruckMenuResponse | undefined>(foodTruckMenusPreviewQuery(foodTruckId));

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
  } = useQuery<FoodTruckMenuResponse[] | undefined>(searchFoodTruckMenusQuery(foodTruckId, searchText));

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
