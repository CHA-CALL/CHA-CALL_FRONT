import type { FoodTrucksFilterType } from '@pages/reservation/api';

export const FOOD_TRUCKS_QUERY_KEY = {
  ALL: ['food-trucks'],
  FILTER: (filter: FoodTrucksFilterType | undefined) => [
    FOOD_TRUCKS_QUERY_KEY.ALL,
    filter,
  ],
} as const;
