import type { MemberReservationHistoryResponse } from 'apis/data-contracts';
import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import InfoRow from '@components/food-truck-card/components/InfoRow';
import { formatDateTimeInfos } from '@components/food-truck-card/utils/date-time-utils';

interface ReservationClientCardProps {
  data: MemberReservationHistoryResponse;
  handleCardButton: () => void;
}

export default function ReservationClientCard({
  data,
  handleCardButton,
}: ReservationClientCardProps) {
  const { period, time } = formatDateTimeInfos(data.dateTimeInfos);

  return (
    <>
      <CardImage
        imageUrl={data.photoUrl}
        altText={data.name}
        className='w-[8rem] h-[8rem] mr-[1.8rem]'
      />

      <div className='flex flex-col gap-[0.2rem]'>
        <span className='title-sb-16 text-grayscale-900'>{data.name}</span>
        <InfoRow iconId='ic_locate'>{data.address}</InfoRow>
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