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
  const {
    photoUrl = '',
    name = '',
    address = '',
    dateTimeInfos = { startDateTime: '', endDateTime: '' },
  } = data;

  const dateTimeArray = Array.isArray(dateTimeInfos)
    ? dateTimeInfos
    : [dateTimeInfos.startDateTime, dateTimeInfos.endDateTime];
  const { period, time } = formatDateTimeInfos(dateTimeArray);

  return (
    <>
      <CardImage
        imageUrl={photoUrl}
        altText={name}
        className='w-[8rem] h-[8rem] mr-[1.8rem]'
      />

      <div className='flex flex-col gap-[0.2rem]'>
        <span className='title-sb-16 text-grayscale-900'>{name}</span>
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