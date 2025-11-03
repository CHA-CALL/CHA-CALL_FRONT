import { cn } from '@utils/cn';
import MenuToggleSwitch from '@components/menu-item/MenuToggleSwitch';
import { formatPrice } from '@utils/price-formatter';

interface MenuItemProps {
  hasToggleSwitch?: boolean;
  menuImage: string;
  menuName: string;
  menuDescription: string;
  menuPrice: number;
  isToggled?: boolean;
  handleMenuClick?: () => void;
  handleToggle?: () => void;
  isLast?: boolean;
}

export default function MenuItem({
  hasToggleSwitch = false,
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
      role={handleMenuClick ? 'button' : undefined}
      onClick={handleMenuClick}
      className={cn(
        'flex items-center justify-between bg-white py-[2rem] pr-[1rem]',
        !isLast && 'border-grayscale-100 border-b',
        handleMenuClick && 'cursor-pointer'
      )}
    >
      <img
        src={menuImage}
        alt={menuName}
        className='flex h-[8rem] w-[8rem] items-center justify-center rounded-[1.6rem] object-cover'
      />
      <div className='ml-[1.4rem] flex flex-1 flex-col'>
        <span className='title-sb-14 text-grayscale-900'>{menuName}</span>
        <span
          className={cn(
            'caption-m-10 text-grayscale-500 mb-[0.8rem]',
            hasToggleSwitch && 'line-clamp-1'
          )}
        >
          {menuDescription}
        </span>
        <div className='flex items-center gap-[0.2rem]'>
          <span className='title-sb-16 text-grayscale-900'>
            {formatPrice(menuPrice)}
          </span>
          <span className='caption-m-11 text-grayscale-700'>원</span>
        </div>
      </div>
      {hasToggleSwitch && handleToggle && (
        <MenuToggleSwitch
          isToggled={isToggled ?? false}
          handleToggle={handleToggle}
        />
      )}
    </div>
  );
}
