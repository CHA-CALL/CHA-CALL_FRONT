import type { OwnerReservationHistoryResponse } from 'apis/data-contracts';
import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import InfoRow from '@components/food-truck-card/components/InfoRow';
import Tag from '@components/tag/Tag';
import { formatDateTimeInfos } from '@components/food-truck-card/utils/date-time-utils';

interface ReservationProviderCardProps {
  data: OwnerReservationHistoryResponse;
  handleCardButton: () => void;
}

export default function ReservationProviderCard({
  data,
  handleCardButton,
}: ReservationProviderCardProps) {
  const {
    profileImage = '',
    name = '',
    foodTruckName = '',
    address = '',
    dateTimeInfos = [],
  } = data;

  const { period, time } = formatDateTimeInfos(dateTimeInfos);

  return (
    <>
      <CardImage
        imageUrl={profileImage}
        altText={name}
        className='w-[5rem] h-[5rem] mr-[1.8rem] my-[0.4rem]'
      />

      <div className='flex flex-col gap-[0.2rem]'>
        <div className='flex items-center gap-[0.8rem] mb-[0.2rem]'>
          <span className='title-sb-16 text-grayscale-900'>{name}</span>
          <Tag title={foodTruckName || ''} />
        </div>
        <InfoRow iconId='ic_locate'>{address}</InfoRow>
        <InfoRow iconId='ic_calendar'>{period}</InfoRow>
        <InfoRow iconId='ic_time'>{time}</InfoRow>
      </div>

      <CardButton
        handleClick={handleCardButton}
        buttonIcon='ic_next'
      />
    </>
  );
}