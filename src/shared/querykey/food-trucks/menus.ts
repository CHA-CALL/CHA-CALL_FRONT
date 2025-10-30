export const GET_FOOD_TRUCKS_MENUS_QUERY_KEY = {
  ALL: ['food-trucks-menus'],
  DETAIL: (foodTruckId: number) => [
    ...GET_FOOD_TRUCKS_MENUS_QUERY_KEY.ALL,
    'detail',
    foodTruckId,
  ],
} as const;
