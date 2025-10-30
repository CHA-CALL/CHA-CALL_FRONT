import CardImage from '@shared/components/food-truck/components/CardImage';
import CardButton from '@shared/components/food-truck/components/CardButton';
import ReservationInfos from '@shared/components/food-truck/components/ReservationInfos';
import Tag from '@shared/components/ui/tag/Tag';
import type { ReservationProviderProps } from '@shared/components/food-truck/types/food-truck-card-types';

export default function ReservationProviderCard({
  data,
  handleClickButton,
}: ReservationProviderProps) {
  const {
    profileImage = '',
    name = '',
    foodTruckName = '',
    address = '',
    dateTimeInfos = [],
  } = data;

  return (
    <div className='flex w-full items-start gap-[1.8rem] p-[2rem]'>
      <CardImage
        imageUrl={profileImage}
        altText={name}
        className='h-[5rem] w-[5rem]'
      />

      <div className='flex flex-col'>
        <div className='mb-[0.6rem] flex items-center gap-[1rem]'>
          <span className='title-sb-16 text-grayscale-900'>{name}</span>
          <Tag title={foodTruckName || ''} />
        </div>
        <ReservationInfos address={address} dateTimeInfos={dateTimeInfos} />
      </div>

      <CardButton
        handleClick={handleClickButton}
        buttonIcon='ic_next'
        className='h-full'
      />
    </div>
  );
}
