export const GET_FOOD_TRUCKS_MENUS_QUERY_KEY = {
  ALL: ['food-trucks-menus'],
  PREVIEW: (foodTruckId: number) => [
    ...GET_FOOD_TRUCKS_MENUS_QUERY_KEY.ALL,
    'preview',
    foodTruckId,
  ],
  SCROLL: (foodTruckId: number) => [
    ...GET_FOOD_TRUCKS_MENUS_QUERY_KEY.ALL,
    'scroll',
    foodTruckId,
  ],
  SEARCH: (foodTruckId: number, searchText: string) => [
    ...GET_FOOD_TRUCKS_MENUS_QUERY_KEY.ALL,
    'search',
    foodTruckId,
    searchText,
  ],
} as const;
