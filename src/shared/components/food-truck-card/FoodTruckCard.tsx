import { cn } from '@utils/cn';
import {
  type FoodTruckClientProps,
  type FoodTruckProviderProps,
  type ReservationClientProps,
  type ReservationProviderProps,
} from '@shared/components/food-truck-card/types/food-truck-card-types';
import { FOOD_TRUCK_CARD_VARIANTS } from '@shared/constant/food-truck-card-variants';
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
  const tags = 'tags' in props ? props.tags : [];

  const cardComponents = {
    [FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER]: (
      <ReservationProviderCard
        data={data}
        handleCardButton={handleClickButton}
      />
    ),
    [FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT]: (
      <ReservationClientCard data={data} handleCardButton={handleClickButton} />
    ),
    [FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER]: (
      <FoodTruckProviderCard
        data={data}
        handleCard={handleClickCard}
        handleCardButton={handleClickButton}
      />
    ),
    [FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT]: (
      <FoodTruckClientCard
        data={data}
        tags={tags}
        handleCard={handleClickCard}
        handleCardButton={handleClickButton}
      />
    ),
  };

  return (
    <div className={cn('flex w-full bg-white', className)}>
      {cardComponents[variant]}
    </div>
  );
}
