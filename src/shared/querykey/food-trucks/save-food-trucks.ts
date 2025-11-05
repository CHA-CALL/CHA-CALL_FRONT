export const SAVE_FOOD_TRUCKS_QUERY_KEY = {
  ALL: ['save-food-trucks'],
  DETAIL: (foodTruckId: number) => [
    SAVE_FOOD_TRUCKS_QUERY_KEY.ALL,
    foodTruckId,
  ],
} as const;
