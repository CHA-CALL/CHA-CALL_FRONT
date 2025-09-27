import type { ReservationPartialInfo } from '@pages/reservation-detail/hooks/use-reservation-detail';

interface InfoCardProps {
  title: string;
  infoList: ReservationPartialInfo[];
}

export default function InfoCard({ title, infoList }: InfoCardProps) {
  return (
    <div className='title-sb-12 flex flex-col gap-[1.6rem] p-[0.5rem]'>
      <h2 className='title-sb-14 text-grayscale-900'>{title}</h2>
      {infoList.map(({ label, data }) => (
        <div key={label} className='flex justify-between'>
          <span className='text-grayscale-500 whitespace-nowrap'>{label}</span>
          <span className='text-grayscale-700 w-[40ch] whitespace-pre-line text-balance text-end'>
            {data}
          </span>
        </div>
      ))}
    </div>
  );
}
