import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/foodTruckCategory';
import {
  OwnerReservationHistoryResponse,
  MemberReservationHistoryResponse,
  MyFoodTruckResponse,
  SavedFoodTruckResponse 
} from 'apis/data-contracts';

interface BaseFoodTruckCardProps {
  handleClickButton: () => void;
  className?: string;
}

type ReservationProviderProps = BaseFoodTruckCardProps & {
  variant: 'reservationProvider';
  data: OwnerReservationHistoryResponse;
};

type ReservationClientProps = BaseFoodTruckCardProps & {
  variant: 'reservationClient';
  data: MemberReservationHistoryResponse;
};

type FoodTruckProviderProps = BaseFoodTruckCardProps & {
  variant: 'foodtruckProvider';
  data: MyFoodTruckResponse;
  handleClickCard: () => void;
};

type FoodTruckClientProps = BaseFoodTruckCardProps & {
  variant: 'foodtruckClient';
  isLiked: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  tags: (typeof FOOD_TRUCK_CATEGORIES)[number][];
  handleClickCard: () => void;
};

export type FoodTruckCardProps =
  | ReservationProviderProps
  | ReservationClientProps
  | FoodTruckProviderProps
  | FoodTruckClientProps;
