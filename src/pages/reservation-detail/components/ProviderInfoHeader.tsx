import { Icon } from '@shared/components/icon/Icon';

interface ProviderInfoHeaderProps {
  foodTruckName: string;
}

export default function ProviderInfoHeader({
  foodTruckName,
}: ProviderInfoHeaderProps) {
  const handleTruckDetail = () => {};
  return (
    <div className='flex flex-col gap-[2rem] pb-[0.4rem]'>
      <img
        src='https://placehold.co/256'
        alt='foodtruck-banner'
        className='h-[21.1rem] w-full object-cover'
      />
      <div className='flex items-center gap-[0.4rem] px-[2rem]'>
        <h2 className='heading-sb-18 text-grayscale-900'>{foodTruckName}</h2>
        <button
          type='button'
          className='flex items-center justify-center'
          onClick={handleTruckDetail}
        >
          <Icon name={'ic_next'} />
        </button>
      </div>
    </div>
  );
}
