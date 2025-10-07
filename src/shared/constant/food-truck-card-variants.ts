export const FOOD_TRUCK_CARD_VARIANTS = {
  RESERVATION_PROVIDER: 'reservationProvider',
  RESERVATION_CLIENT: 'reservationClient',
  FOODTRUCK_PROVIDER: 'foodtruckProvider',
  FOODTRUCK_CLIENT: 'foodtruckClient',
} as const;

export type FoodTruckCardVariant = typeof FOOD_TRUCK_CARD_VARIANTS[keyof typeof FOOD_TRUCK_CARD_VARIANTS];