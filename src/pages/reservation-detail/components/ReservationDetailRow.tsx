import type { ReservationPartialInfo } from '@pages/reservation-detail/hooks/use-reservation-detail';
import { formatDateTimeInfos } from '@shared/components/food-truck-card/utils/date-time-utils';

interface ReservationDetailRowProps {
  title: string;
  infoList: ReservationPartialInfo[];
}

export default function ReservationDetailRow({
  title,
  infoList,
}: ReservationDetailRowProps) {
  const renderSchedule = (date: string, index: number) => {
    const formattedSchedule = formatDateTimeInfos(date);
    return (
      <div
        key={`${date}-${index}`}
        className='flex flex-row items-center justify-end gap-[0.7rem] text-grayscale-700 body-m-13'
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
    <div className='flex flex-col gap-[1.6rem] p-[0.5rem] title-sb-12'>
      <h2 className='text-grayscale-900 title-sb-14'>{title}</h2>
      {infoList.map(({ label, data }) => (
        <div key={label} className='flex justify-between'>
          <span className='whitespace-nowrap text-grayscale-500'>{label}</span>
          <span className='w-[40ch] whitespace-pre-line text-balance text-end text-grayscale-700'>
            {Array.isArray(data)
              ? data.map((date, index) => renderSchedule(date, index))
              : data}
          </span>
        </div>
      ))}
    </div>
  );
}
