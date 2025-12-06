import type { FoodTrucksFilterType } from '@pages/reservation/api';

export const FOOD_TRUCKS_QUERY_KEY = {
  ALL: ['food-trucks'],
  LISTS: () => [...FOOD_TRUCKS_QUERY_KEY.ALL, 'lists'],
  LIST: (filter: FoodTrucksFilterType | undefined) => [
    ...FOOD_TRUCKS_QUERY_KEY.LISTS(),
    filter,
  ],
  DETAILS: () => [...FOOD_TRUCKS_QUERY_KEY.ALL, 'details'],
  DETAIL: (foodTruckId: number) => [
    ...FOOD_TRUCKS_QUERY_KEY.ALL,
    'detail',
    foodTruckId,
  ],
  IMAGE: (foodTruckId: number) => [
    ...FOOD_TRUCKS_QUERY_KEY.DETAIL(foodTruckId),
    'image',
  ],

  MENUS: (foodTruckId: number) => [
    ...FOOD_TRUCKS_QUERY_KEY.DETAIL(foodTruckId),
    'menus',
  ],

  MENU_LIST: (foodTruckId: number) => [
    ...FOOD_TRUCKS_QUERY_KEY.ALL,
    foodTruckId,
  ],

  MENU_SORTED_LIST: (foodTruckId: number, sort: string) => [
    ...FOOD_TRUCKS_QUERY_KEY.MENU_LIST(foodTruckId),
    { sort },
  ],
  MENU: (foodTruckId: number, menuId: number) => [
    ...FOOD_TRUCKS_QUERY_KEY.MENU_LIST(foodTruckId),
    menuId,
  ],
} as const;
