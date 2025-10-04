import { cn } from '@utils/cn';
import { type FoodTruckCardProps } from '@shared/components/food-truck-card/types/FoodTruckCard.types';
import { FOOD_TRUCK_CARD_VARIANTS } from '@shared/constant/food-truck-card-variants';
import ReservationProviderCard from '@components/food-truck-card/components/ReservationProviderCard';
import ReservationClientCard from '@components/food-truck-card/components/ReservationClientCard';
import FoodTruckProviderCard from '@components/food-truck-card/components/FoodTruckProviderCard';
import FoodTruckClientCard from '@components/food-truck-card/components/FoodTruckClientCard';

export default function FoodTruckCard(props: FoodTruckCardProps) {
  const {
    variant,
    data,
    className,
    handleClickButton
  } = props;

  const renderCard = () => {
    switch (variant) {
      case FOOD_TRUCK_CARD_VARIANTS.RESERVATION_PROVIDER: {
        return (
          <ReservationProviderCard
            data={data}
            handleCardButton={handleClickButton}
          />
        );
      }

      case FOOD_TRUCK_CARD_VARIANTS.RESERVATION_CLIENT: {
        return (
          <ReservationClientCard
            data={data}
            handleCardButton={handleClickButton}
          />
        );
      }

      case FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_PROVIDER:
        return (
          <FoodTruckProviderCard
            data={data}
            handleCard={props.handleClickCard}
            handleCardButton={handleClickButton}
          />
        );

      case FOOD_TRUCK_CARD_VARIANTS.FOODTRUCK_CLIENT:
        return (
          <FoodTruckClientCard
            data={data}
            isLiked={props.isLiked}
            tags={props.tags}
            handleCard={props.handleClickCard}
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
        className,
      )}
    >
      {renderCard()}
    </div>
  );
}