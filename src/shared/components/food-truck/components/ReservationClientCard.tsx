import CardImage from '@shared/components/food-truck/components/CardImage';
import CardButton from '@shared/components/food-truck/components/CardButton';
import ReservationInfos from '@shared/components/food-truck/components/ReservationInfos';
import type { ReservationClientProps } from '@shared/components/food-truck/types/food-truck-card-types';

export default function ReservationClientCard({
  data,
  handleClickButton,
}: ReservationClientProps) {
  const { photoUrl = '', name = '', address = '', dateTimeInfos = [] } = data;

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
        <ReservationInfos address={address} dateTimeInfos={dateTimeInfos} />
      </div>

      <CardButton handleClick={handleClickButton} buttonIcon='ic_next' />
    </div>
  );
}
