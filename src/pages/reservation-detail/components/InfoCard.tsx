import type { ReservationResponse } from 'apis/data-contracts';

interface InfoCardProps {
  title: string;
  infoList: ReservationResponse;
}

export default function InfoCard({ title, infoList }: InfoCardProps) {
  return (
    <div className='flex flex-col gap-[1.6rem]'>
      <h2 className='title-sb-14 text-grayscale-900'>{title}</h2>
      {Object.entries(infoList).map(([label, data]) => (
        <div className='title-sb-12 flex flex-col gap-[1.6rem]'>
          {Array.isArray(data) ? (
            <p className='flex justify-between'>
              <span className='text-grayscale-500 whitespace-nowrap'>
                {label}
              </span>
              <div className='flex flex-col'>
                {data.map(item => (
                  <span className='text-grayscale-700 text-end'>{item}</span>
                ))}
              </div>
            </p>
          ) : (
            <p className='flex justify-between'>
              <span className='text-grayscale-500 whitespace-nowrap'>
                {label}
              </span>
              <span className='text-grayscale-700 text-end'>
                {typeof data === 'boolean' ? (data ? '가능' : '불가능') : data}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
