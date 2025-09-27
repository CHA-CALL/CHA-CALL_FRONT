import Tag from '@shared/components/tag/Tag';

interface ClientInfoHeaderProps {
  foodTruckName: string;
  clientName: string;
}

export default function ClientInfoHeader({
  foodTruckName,
  clientName,
}: ClientInfoHeaderProps) {
  return (
    <div className='flex gap-[2rem] p-[2rem]'>
      <div className='p-[0.4rem]'>
        <img
          src='https://placehold.co/50'
          alt='client-portrait'
          className='rounded-[1.6rem]'
        />
      </div>

      <div className='flex flex-col gap-[0.2rem] py-[0.4rem] pr-[0.4rem]'>
        <Tag title={foodTruckName} />
        <p className='title-sb-14 text-grayscale-700 flex items-center gap-[0.8rem]'>
          <span className='heading-sb-18 text-grayscale-900'>{clientName}</span>
          <span className='translate-y-[0.1rem]'>고객님</span>
        </p>
      </div>
    </div>
  );
}
