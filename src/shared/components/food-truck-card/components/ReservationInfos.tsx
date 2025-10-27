import { formatDateTimeInfos } from '@components/food-truck-card/utils/date-time-utils';

interface ReservationInfosProps {
  address: string;
  dateTimeInfos: string[];
}

export default function ReservationInfos({
  address,
  dateTimeInfos,
}: ReservationInfosProps) {
  const renderSchedule = (date: string, index: number) => {
    const formattedSchedule = formatDateTimeInfos(date);
    return (
      <div
        key={`${date}-${index}`}
        className='flex flex-row items-center justify-start gap-[0.7rem] text-grayscale-700 caption-m-11'
      >
        <div className='flex flex-row items-center gap-[0.2rem]'>
          <span>{formattedSchedule[0]}</span>
          <span>-</span>
          <span>{formattedSchedule[1]}</span>
        </div>
        <div className='h-[1.05rem] w-[0.1rem] bg-grayscale-500' />
        <div className='flex flex-row items-center gap-[0.2rem]'>
          <span>{formattedSchedule[2]}</span>
          <span>-</span>
          <span>{formattedSchedule[3]}</span>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-[0.4rem]'>
      <div className='flex items-center gap-[0.8rem]'>
        <span className='body-s-11 text-grayscale-700'>장소</span>
        <span className='text-grayscale-700 caption-m-12'>{address}</span>
      </div>

      <div className='flex gap-[0.8rem]'>
        <span className='body-s-11 text-grayscale-700'>일시</span>
        <div className='flex flex-col'>
          {dateTimeInfos.map((dateTimeInfo, index) =>
            renderSchedule(dateTimeInfo, index)
          )}
        </div>
      </div>
    </div>
  );
}
