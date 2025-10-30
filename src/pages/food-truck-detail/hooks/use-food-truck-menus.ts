import { useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type {
  CursorPagingResponseFoodTruckMenuResponse,
  FoodTruckMenuResponse,
} from 'apis/data-contracts';

import { getFoodTruckMenus } from '@pages/food-truck-detail/api';
import { GET_FOOD_TRUCKS_MENUS_QUERY_KEY } from '@shared/querykey/food-trucks/menus';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const FALLBACK: CursorPagingResponseFoodTruckMenuResponse = {
  content: [],
  lastCursor: undefined,
  hasNext: false,
};

export const useFoodTruckMenus = () => {
  const { foodTruckId } = useParams();
  const { ref: listBottomRef, inView } = useInView();

  const {
    data: menusData,
    isPending: isPendingMenus,
    isError: isErrorMenus,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<CursorPagingResponseFoodTruckMenuResponse>({
    queryKey: GET_FOOD_TRUCKS_MENUS_QUERY_KEY.SCROLL(Number(foodTruckId)),
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      const cursor =
        pageParam === null || typeof pageParam === 'number' ? pageParam : null;

      const response = await getFoodTruckMenus(
        Number(foodTruckId),
        false,
        cursor
      );
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

export const useFoodTruckMenusPreview = () => {
  const { foodTruckId } = useParams();
  const {
    data: menusPreviewData,
    isPending: isPendingMenusPreview,
    isError: isErrorMenusPreview,
  } = useQuery<CursorPagingResponseFoodTruckMenuResponse | undefined>({
    queryKey: [GET_FOOD_TRUCKS_MENUS_QUERY_KEY.PREVIEW(Number(foodTruckId))],
    queryFn: () => getFoodTruckMenus(Number(foodTruckId), true),
    staleTime: 5000,
  });

  const menusPreview = menusPreviewData?.content;

  return {
    menusPreview,
    isPendingMenusPreview,
    isErrorMenusPreview,
  };
};
