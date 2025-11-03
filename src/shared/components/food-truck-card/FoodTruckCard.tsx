import { cn } from '@utils/cn';
import {
  type FoodTruckClientProps,
  type FoodTruckProviderProps,
  type ReservationClientProps,
  type ReservationProviderProps,
} from '@components/food-truck-card/types/food-truck-card-types';
import { FOOD_TRUCK_CARD_VARIANTS } from '@constant/food-truck-card-variants';
import ReservationProviderCard from '@components/food-truck-card/components/ReservationProviderCard';
import ReservationClientCard from '@components/food-truck-card/components/ReservationClientCard';
import FoodTruckProviderCard from '@components/food-truck-card/components/FoodTruckProviderCard';
import FoodTruckClientCard from '@components/food-truck-card/components/FoodTruckClientCard';

export type FoodTruckCardProps =
  | ReservationProviderProps
  | ReservationClientProps
  | FoodTruckProviderProps
  | FoodTruckClientProps;

export default function FoodTruckCard(props: FoodTruckCardProps) {
  const { variant, data, className, handleClickButton } = props;

  const handleClickCard =
    'handleClickCard' in props ? props.handleClickCard : () => {};

  const isRemovable = 'isRemovable' in props ? props.isRemovable : false;
  const isRemove = 'isRemove' in props ? props.isRemove : false;
  const handleCardRemove =
    'handleCardRemove' in props ? props.handleCardRemove : () => {};
  const isOn = 'isOn' in props ? props.isOn : false;

  const cardComponents = {
    [FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER]: (
      <ReservationProviderCard
        variant='reservationProvider'
        data={data}
        handleClickButton={handleClickButton}
      />
    ),
    [FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT]: (
      <ReservationClientCard
        variant='reservationClient'
        data={data}
        handleClickButton={handleClickButton}
      />
    ),
    [FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER]: (
      <FoodTruckProviderCard
        variant='foodtruckProvider'
        data={data}
        isRemovable={isRemovable}
        isRemove={isRemove}
        isOn={isOn}
        handleCardRemove={handleCardRemove}
        handleClickButton={handleClickButton}
      />
    ),
    [FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT]: (
      <FoodTruckClientCard
        variant='foodtruckClient'
        data={data}
        handleClickCard={handleClickCard}
        handleClickButton={handleClickButton}
      />
    ),
  };

  return (
    <div className={cn('flex w-full bg-white', className)}>
      {cardComponents[variant]}
    </div>
  );
}
