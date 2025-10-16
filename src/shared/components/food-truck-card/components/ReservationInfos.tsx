import { formatDateTimeInfos } from '@components/food-truck-card/utils/date-time-utils';

interface ReservationInfosProps {
  address: string;
  dateTimeInfos: string[];
}

export default function ReservationInfos({ address, dateTimeInfos }: ReservationInfosProps) {
  return (
    <div className='flex flex-col gap-[0.4rem]'>
      <div className='flex gap-[0.8rem] items-center'>
        <span className='body-s-11 text-grayscale-700'>장소</span>
        <span className='caption-m-12 text-grayscale-700'>{address}</span>
      </div>

      <div className='flex gap-[0.8rem]'>
        <span className='body-s-11 text-grayscale-700'>일시</span>
        <div className='flex flex-col'>
          {dateTimeInfos.map((dateTimeInfo) => {
            const [startDateShort, endDateShort, startTime, endTime] = formatDateTimeInfos(dateTimeInfo);
            return (
              <div className='flex items-center justify-start gap-[0.2rem]'>
                <span className='caption-m-11 text-grayscale-700'>{startDateShort} - {endDateShort}</span>
                <div className='h-[0.8rem] mx-[0.4rem] border-r border-grayscale-500' />
                <span className='caption-m-11 text-grayscale-700'>{startTime} - {endTime}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}