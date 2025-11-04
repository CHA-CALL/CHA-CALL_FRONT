import type { FoodTrucksFilterType } from '@pages/reservation/api';

export const FOOD_TRUCKS_QUERY_KEY = {
  ALL: ['food-trucks'],
  FILTER: (filter: FoodTrucksFilterType | undefined) => [
    ...FOOD_TRUCKS_QUERY_KEY.ALL,
    filter,
  ],
} as const;

export const FOOD_TRUCKS_MUTATION_KEY = {
  UPDATE_SAVE_STATUS: ['food-trucks', 'update-save'],
} as const;

export const FOOD_TRUCK_DETAIL = {
  DETAIL: (foodTruckId: number) => ['food-truck-detail', foodTruckId],
} as const;
