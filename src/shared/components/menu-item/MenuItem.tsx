import { cn } from '@utils/cn';
import MenuToggleSwitch from '@components/menu-item/MenuToggleSwitch';

import { formatPrice } from '@shared/utils/price-formatter';
import type {
  FoodTruckMenuResponse,
  MyFoodTruckMenuResponse,
} from 'apis/data-contracts';

interface MenuItemProps {
  hasToggleSwitch?: boolean;
  menu: FoodTruckMenuResponse | MyFoodTruckMenuResponse;
  isToggled?: boolean;
  handleMenuClick?: () => void;
  handleToggle?: () => void;
  isLast?: boolean;
}

export default function MenuItem({
  hasToggleSwitch = false,
  menu,
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
        !isLast && 'border-b border-grayscale-100',
        handleMenuClick && 'cursor-pointer'
      )}
    >
      <img
        src={menu.imageUrl}
        alt={menu.name}
        className='flex h-[8rem] w-[8rem] items-center justify-center rounded-[1.6rem] object-cover'
      />
      <div className='ml-[1.4rem] flex flex-1 flex-col'>
        <span className='text-grayscale-900 title-sb-14'>{menu.name}</span>
        <span
          className={cn(
            'mb-[0.8rem] text-grayscale-500 caption-m-10',
            hasToggleSwitch && 'line-clamp-1'
          )}
        >
          {menu.description}
        </span>
        <div className='flex items-center gap-[0.2rem]'>
          <span className='text-grayscale-900 title-sb-16'>
            {formatPrice(menu.price)}
          </span>
          <span className='text-grayscale-700 caption-m-11'>원</span>
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
