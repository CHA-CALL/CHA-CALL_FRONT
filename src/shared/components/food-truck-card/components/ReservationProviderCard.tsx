import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import InfoRow from '@components/food-truck-card/components/InfoRow';
import Tag from '@components/tag/Tag';
import { formatDateTimeInfos } from '@components/food-truck-card/utils/date-time-utils';
import type { ReservationProviderProps } from '@components/food-truck-card/types/food-truck-card-types';

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

  const { period, time } = formatDateTimeInfos(dateTimeInfos);

  return (
    <div className='flex w-full items-start gap-[1.8rem] p-[2rem]'>
      <CardImage
        imageUrl={profileImage}
        altText={name}
        className='h-[5rem] w-[5rem]'
      />

      <div className='flex flex-col gap-[0.2rem]'>
        <div className='mb-[0.2rem] flex items-center gap-[0.8rem]'>
          <span className='title-sb-16 text-grayscale-900'>{name}</span>
          <Tag title={foodTruckName || ''} />
        </div>
        <InfoRow iconId='ic_locate'>{address}</InfoRow>
        <InfoRow iconId='ic_calendar'>{period}</InfoRow>
        <InfoRow iconId='ic_time'>{time}</InfoRow>
      </div>

      <CardButton
        handleClick={handleClickButton}
        buttonIcon='ic_next'
        className='h-full'
      />
    </div>
  );
}
