import { cn } from '@utils/cn';
import { type FoodTruckCardProps } from '@components/food-truck-card/FoodTruckCard.types';
import { FOOD_TRUCK_CARD_VARIANTS } from '@shared/constant/food-truck-card-variants';
import ReservationProviderCard from '@components/food-truck-card/components/ReservationProviderCard';
import ReservationClientCard from '@components/food-truck-card/components/ReservationClientCard';
import FoodTruckProviderCard from '@components/food-truck-card/components/FoodTruckProviderCard';
import FoodTruckClientCard from '@components/food-truck-card/components/FoodTruckClientCard';

export default function FoodTruckCard(props: FoodTruckCardProps) {
  const handleClickButton = () => {
    props.handleClickButton();
  };

  const handleClickCard = () => {
    if (props.variant === FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER
        || props.variant === FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT
    ) {
      props.handleClickCard();
    }
  };

  const renderCard = () => {
    switch (props.variant) {
      case FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER: {
        return (
          <ReservationProviderCard
            data={props.data}
            handleCardButton={handleClickButton}
          />
        );
      }

      case FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT: {
        return (
          <ReservationClientCard
            data={props.data}
            handleCardButton={handleClickButton}
          />
        );
      }

      case FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER:
        return (
          <FoodTruckProviderCard
            data={props.data}
            handleCard={handleClickCard}
            handleCardButton={handleClickButton}
          />
        );

      case FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT:
        return (
          <FoodTruckClientCard
            data={props.data}
            isLiked={props.isLiked}
            tags={props.tags}
            handleCard={handleClickCard}
            handleCardButton={handleClickButton}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'flex w-full bg-white',
        props.className,
      )}
    >
      {renderCard()}
    </div>
  );
}