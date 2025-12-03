export const FOOD_TRUCK_IMAGE_QUERY_KEY = {
  ALL: ['food-truck-image'],
  IMAGES: () => [...FOOD_TRUCK_IMAGE_QUERY_KEY.ALL, 'food-truck-images'],
} as const;
