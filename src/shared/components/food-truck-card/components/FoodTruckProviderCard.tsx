import type { MyFoodTruckResponse } from 'apis/data-contracts';
import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import InfoRow from '@components/food-truck-card/components/InfoRow';

interface FoodTruckProviderCardProps {
  data: MyFoodTruckResponse;
  handleCard: () => void;
  handleCardButton: () => void;
}

export default function FoodTruckProviderCard({
  data,
  handleCard,
  handleCardButton,
}: FoodTruckProviderCardProps) {
  const {
    imageUrl = '',
    name = '',
    description = '',
    activeTime = '',
    serviceArea = '',
  } = data;

  return (
    <div
      role='button'
      onClick={handleCard}
      className='flex w-full cursor-pointer'
    >
      <CardImage
        imageUrl={imageUrl}
        altText={name}
        className='w-[7.4rem] h-[7.4rem] mr-[1.3rem] my-[0.4rem]'
      />

      <div className='flex flex-col'>
        <span className='title-sb-16 text-grayscale-900 text-left'>{name}</span>
        <span className='caption-m-11 text-grayscale-700 mb-[0.4rem] px-[0.2rem] text-left'>{description}</span>
        <InfoRow iconId='ic_time'>{activeTime}</InfoRow>
        <InfoRow iconId='ic_locate'>{serviceArea}</InfoRow>
      </div>

      <CardButton
        handleClick={handleCardButton}
        buttonIcon='ic_dot'
        className='mb-auto'
      />
    </div>
  );
}