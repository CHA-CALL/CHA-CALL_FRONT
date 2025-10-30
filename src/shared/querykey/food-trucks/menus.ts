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
} as const;
