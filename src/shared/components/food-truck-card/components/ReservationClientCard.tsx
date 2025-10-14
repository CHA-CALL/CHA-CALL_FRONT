import CardImage from '@components/food-truck-card/components/CardImage';
import CardButton from '@components/food-truck-card/components/CardButton';
import InfoRow from '@components/food-truck-card/components/InfoRow';
import { formatDateTimeInfos } from '@components/food-truck-card/utils/date-time-utils';
import type { ReservationClientProps } from '@components/food-truck-card/types/food-truck-card-types';

export default function ReservationClientCard({
  data,
  handleClickButton,
}: ReservationClientProps) {
  const { photoUrl = '', name = '', address = '', dateTimeInfos = [] } = data;

  const { period, time } = formatDateTimeInfos(dateTimeInfos);

  return (
    <div className='flex w-full items-start gap-[1.8rem] p-[2rem]'>
      <CardImage
        imageUrl={photoUrl}
        altText={name}
        className='h-[8rem] w-[8rem]'
      />

      <div className='flex flex-col gap-[0.2rem]'>
        <span className='title-sb-16 text-grayscale-900 mb-[0.2rem]'>
          {name}
        </span>
        <InfoRow iconId='ic_locate'>{address}</InfoRow>
        <InfoRow iconId='ic_calendar'>{period}</InfoRow>
        <InfoRow iconId='ic_time'>{time}</InfoRow>
      </div>

      <CardButton handleClick={handleClickButton} buttonIcon='ic_next' />
    </div>
  );
}
