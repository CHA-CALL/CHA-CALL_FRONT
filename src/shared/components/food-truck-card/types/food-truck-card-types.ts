import type {
  OwnerReservationHistoryResponse,
  MemberReservationHistoryResponse,
  MyFoodTruckResponse,
  FoodTruckResponse,
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
  handleClickCard: () => void;
};

export type FoodTruckClientProps = BaseFoodTruckCardProps & {
  variant: 'foodtruckClient';
  data: FoodTruckResponse;
  handleClickCard: () => void;
};
