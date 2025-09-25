import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/foodTruckCategory';

interface BaseFoodTruckCardProps {
  image: string;
  foodTruckName: string;
  handleClickButton: () => void;
  isLast?: boolean;
}

type ReservationProviderProps = BaseFoodTruckCardProps & {
  variant: 'reservationProvider';
  clientName: string;
  location: string;
  period: string;
  time: string;
};

type ReservationClientProps = BaseFoodTruckCardProps & {
  variant: 'reservationClient';
  location: string;
  period: string;
  time: string;
};

type FoodTruckProviderProps = BaseFoodTruckCardProps & {
  variant: 'foodtruckProvider';
  description: string;
  time: string;
  locations: string;
};

type FoodTruckClientProps = BaseFoodTruckCardProps & {
  variant: 'foodtruckClient';
  rating: number;
  reviewCount: number;
  description: string;
  tags: (typeof FOOD_TRUCK_CATEGORIES)[keyof typeof FOOD_TRUCK_CATEGORIES][];
};

export type FoodTruckCardProps =
  | ReservationProviderProps
  | ReservationClientProps
  | FoodTruckProviderProps
  | FoodTruckClientProps;
