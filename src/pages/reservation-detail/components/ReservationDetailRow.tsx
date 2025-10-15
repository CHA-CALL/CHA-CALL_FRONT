import type { ReservationPartialInfo } from '@pages/reservation-detail/hooks/use-reservation-detail';

interface ReservationDetailRowProps {
  title: string;
  infoList: ReservationPartialInfo[];
}

export default function ReservationDetailRow({
  title,
  infoList,
}: ReservationDetailRowProps) {
  return (
    <div className='flex flex-col gap-[1.6rem] p-[0.5rem] title-sb-12'>
      <h2 className='text-grayscale-900 title-sb-14'>{title}</h2>
      {infoList.map(({ label, data }) => (
        <div key={label} className='flex justify-between'>
          <span className='whitespace-nowrap text-grayscale-500'>{label}</span>
          <span className='w-[40ch] whitespace-pre-line text-balance text-end text-grayscale-700'>
            {/* TODO: reservation history api 관련 pr 머지 후 formatDateTimeInfos 함수 사용해서 포맷하기 */}
            {Array.isArray(data) ? data.join('\n') : data}
          </span>
        </div>
      ))}
    </div>
  );
}
