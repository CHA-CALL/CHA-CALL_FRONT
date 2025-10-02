import type { MyFoodTruckResponse } from 'apis/data-contracts';
import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import InfoRow from '@components/food-truck-card/components/InfoRow';

interface FoodTruckClientCardProps {
  data: MyFoodTruckResponse;
  handleCard: () => void;
  handleCardButton: () => void;
}

export default function FoodTruckProviderCard({
  data,
  handleCard,
  handleCardButton,
}: FoodTruckClientCardProps) {
  return (
    <div
      role='button'
      onClick={handleCard}
      className='flex w-full cursor-pointer'
    >
      <CardImage
        imageUrl={data.imageUrl}
        altText={data.name}
        className='w-[7.4rem] h-[7.4rem] mr-[1.3rem] my-[0.4rem]'
      />

      <div className='flex flex-col'>
        <span className='title-sb-16 text-grayscale-900 text-left'>{data.name}</span>
        <span className='caption-m-11 text-grayscale-700 mb-[0.4rem] px-[0.2rem] text-left'>{data.description}</span>
        <InfoRow iconId='ic_time'>{data.activeTime}</InfoRow>
        <InfoRow iconId='ic_locate'>{data.serviceArea}</InfoRow>
      </div>

      <CardButton
        handleClick={handleCardButton}
        buttonIcon='ic_dot'
        className='mb-auto'
      />
    </div>
  );
}