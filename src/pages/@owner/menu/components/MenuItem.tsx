import { useState } from 'react';
import { cn } from '@utils/cn';
import ToggleSwitch from '@pages/@owner/menu/components/ToggleSwitch';

interface MenuItemProps {
  menuImage: string;
  menuName: string;
  menuDescription: string;
  menuPrice: number;
  handleToggle: () => void;
  isLast?: boolean;
}

export default function MenuItem({
  menuImage,
  menuName,
  menuDescription,
  menuPrice,
  handleToggle,
  isLast = false,
}: MenuItemProps) {
  const [isToggled, setIsToggled] = useState(true);

  const handleClickToggle = () => {
    setIsToggled(!isToggled);
    handleToggle();
  };

  return (
    <div className={cn(
      'flex items-center justify-between py-[2rem]',
      !isLast && 'border-grayscale-100 border-b',
    )}>
      <img
        src={menuImage}
        alt={menuName}
        className='flex items-center justify-center h-[8rem] w-[8rem] rounded-[1.6rem] object-cover'
      />
      <div className='flex flex-col flex-1 ml-[1.4rem]'>
        <span className='title-sb-14 text-grayscale-900'>
          {menuName}
        </span>
        <span className='caption-m-10 text-grayscale-500 mb-[0.8rem] line-clamp-1'>
          {menuDescription}
        </span>
        <div className='flex items-center gap-[0.2rem]'>
          <span className='title-sb-16 text-grayscale-900'>
            {menuPrice.toLocaleString()}
          </span>
          <span className='caption-m-11 text-grayscale-700'>
            원
          </span>
        </div>
      </div>
      <ToggleSwitch isToggled={isToggled} handleToggle={handleClickToggle} />
    </div>
  );
}