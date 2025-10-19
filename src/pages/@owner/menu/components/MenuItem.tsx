import { cn } from '@utils/cn';
import MenuToggleSwitch from '@pages/@owner/menu/components/MenuToggleSwitch';

interface MenuItemProps {
  menuImage: string;
  menuName: string;
  menuDescription: string;
  menuPrice: string;
  isToggled: boolean;
  handleMenuClick: () => void;
  handleToggle: () => void;
  isLast?: boolean;
}

export default function MenuItem({
  menuImage,
  menuName,
  menuDescription,
  menuPrice,
  isToggled,
  handleMenuClick,
  handleToggle,
  isLast = false,
}: MenuItemProps) {
  return (
    <div
      role='button'
      onClick={handleMenuClick}
      className={cn(
        'flex items-center justify-between py-[2rem] pr-[1rem] cursor-pointer',
        !isLast && 'border-grayscale-100 border-b'
      )}
    >
      <img
        src={menuImage}
        alt={menuName}
        className='flex h-[8rem] w-[8rem] items-center justify-center rounded-[1.6rem] object-cover'
      />
      <div className='ml-[1.4rem] flex flex-1 flex-col'>
        <span className='title-sb-14 text-grayscale-900'>{menuName}</span>
        <span className='caption-m-10 text-grayscale-500 mb-[0.8rem] line-clamp-1'>
          {menuDescription}
        </span>
        <div className='flex items-center gap-[0.2rem]'>
          <span className='title-sb-16 text-grayscale-900'>
            {menuPrice
              ? Number(menuPrice.replace(/\D/g, '')).toLocaleString()
              : '0'
            }
          </span>
          <span className='caption-m-11 text-grayscale-700'>원</span>
        </div>
      </div>
      <MenuToggleSwitch isToggled={isToggled} handleToggle={handleToggle} />
    </div>
  );
}
