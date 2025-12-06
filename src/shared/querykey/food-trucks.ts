import type { FoodTrucksFilterType } from '@pages/reservation/api';

export const FOOD_TRUCKS_QUERY_KEY = {
  ALL: ['foodTrucks'] as const,

  LIST: (filter?: FoodTrucksFilterType) =>
    ['foodTrucks', 'list', filter ?? {}] as const,

  DETAIL: (foodTruckId: number) =>
    ['foodTrucks', 'detail', foodTruckId] as const,

  IMAGE: (foodTruckId: number) =>
    [...FOOD_TRUCKS_QUERY_KEY.DETAIL(foodTruckId), 'image'] as const,

  SAVED: () => ['foodTrucks', 'saved'] as const,

  menus: {
    ROOT: (foodTruckId: number) =>
      [...FOOD_TRUCKS_QUERY_KEY.DETAIL(foodTruckId), 'menus'] as const,

    SORTED_LIST: (foodTruckId: number, sort: string = 'default') =>
      [...FOOD_TRUCKS_QUERY_KEY.menus.ROOT(foodTruckId), 'list', sort] as const,

    ITEM: (foodTruckId: number, menuId: number) =>
      [
        ...FOOD_TRUCKS_QUERY_KEY.menus.ROOT(foodTruckId),
        'item',
        menuId,
      ] as const,

    SCROLL: (foodTruckId: number) =>
      [...FOOD_TRUCKS_QUERY_KEY.menus.ROOT(foodTruckId), 'scroll'] as const,

    PREVIEW: (foodTruckId: number) =>
      [...FOOD_TRUCKS_QUERY_KEY.menus.ROOT(foodTruckId), 'preview'] as const,

    SEARCH: (foodTruckId: number, searchText: string) =>
      [
        ...FOOD_TRUCKS_QUERY_KEY.menus.ROOT(foodTruckId),
        'search',
        searchText,
      ] as const,
  },
} as const;
