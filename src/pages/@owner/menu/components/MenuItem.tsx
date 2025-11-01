import { useState } from 'react';
import { cn } from '@utils/cn';
import ToggleSwitch from '@pages/@owner/menu/components/ToggleSwitch';

interface MenuItemProps {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  handleToggle: () => void;
  isLast?: boolean;
}

export default function MenuItem({
  imageUrl,
  name,
  description,
  price,
  handleToggle,
  isLast = false,
}: MenuItemProps) {
  const [isToggled, setIsToggled] = useState(true);

  const handleClickToggle = () => {
    if (!isToggled) {
      handleToggle();
    }
    setIsToggled(!isToggled);
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between py-[2rem] pr-[1rem]',
        !isLast && 'border-grayscale-100 border-b'
      )}
    >
      <img
        src={imageUrl}
        alt={name}
        className='flex h-[8rem] w-[8rem] items-center justify-center rounded-[1.6rem] object-cover'
      />
      <div className='ml-[1.4rem] flex flex-1 flex-col'>
        <span className='title-sb-14 text-grayscale-900'>{name}</span>
        <span className='caption-m-10 text-grayscale-500 mb-[0.8rem] line-clamp-1'>
          {description}
        </span>
        <div className='flex items-center gap-[0.2rem]'>
          <span className='title-sb-16 text-grayscale-900'>
            {price.toLocaleString()}
          </span>
          <span className='caption-m-11 text-grayscale-700'>원</span>
        </div>
      </div>
      <ToggleSwitch isToggled={isToggled} handleToggle={handleClickToggle} />
    </div>
  );
}
