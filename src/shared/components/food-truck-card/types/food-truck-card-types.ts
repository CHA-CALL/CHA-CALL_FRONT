import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/food-truck-category';
import type {
  OwnerReservationHistoryResponse,
  MemberReservationHistoryResponse,
  MyFoodTruckResponse,
  SavedFoodTruckResponse,
} from 'apis/data-contracts';

interface BaseFoodTruckCardProps {
  handleClickButton: () => void;
  className?: string;
}

export type ReservationProviderProps = BaseFoodTruckCardProps & {
  variant: 'reservationProvider';
  data: OwnerReservationHistoryResponse;
};

export type ReservationClientProps = BaseFoodTruckCardProps & {
  variant: 'reservationClient';
  data: MemberReservationHistoryResponse;
};

export type FoodTruckProviderProps = BaseFoodTruckCardProps & {
  variant: 'foodtruckProvider';
  data: MyFoodTruckResponse;
  isRemovable: boolean;
  isRemove: boolean;
  isOn: boolean;
  handleCardRemove: () => void;
};

export type FoodTruckClientProps = BaseFoodTruckCardProps & {
  variant: 'foodtruckClient';
  data: SavedFoodTruckResponse;
  isLiked: boolean;
  tags: (typeof FOOD_TRUCK_CATEGORIES)[number][];
  handleClickCard: () => void;
};
