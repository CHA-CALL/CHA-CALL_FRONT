import { Icon } from '@shared/components/icon/Icon';

interface ProviderInfoHeaderProps {
  foodTruckName: string;
  handleTruckDetail: () => void;
}

export default function ProviderInfoHeader({
  foodTruckName,
  handleTruckDetail,
}: ProviderInfoHeaderProps) {
  return (
    <div className='flex flex-col gap-[2rem] pb-[0.4rem]'>
      <img
        src='https://placehold.co/256'
        alt='foodtruck-banner'
        className='object-fit h-[21.1rem] w-full'
      />
      <button
        type='button'
        className='flex items-center gap-[0.4rem] px-[2rem]'
        onClick={handleTruckDetail}
      >
        <h2 className='heading-sb-18 text-grayscale-900'>{foodTruckName}</h2>
        <Icon name={'ic_next'} />
      </button>
    </div>
  );
}
