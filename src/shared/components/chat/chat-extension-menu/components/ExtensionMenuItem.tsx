import { cn } from '@shared/utils/cn';
import type { ReactNode } from 'react';

interface ExtensionMenuItemProps {
  title: string;
  icon: ReactNode;
  isDisabled: boolean;
  handleClick: () => void;
}
export default function ExtensionMenuItem({
  isDisabled,
  title,
  icon,
  handleClick,
}: ExtensionMenuItemProps) {
  return (
    <div className='flex w-[5.6rem] flex-col items-center gap-[0.5rem]'>
      <button
        className={cn(
          'bg-primary-25 h-[4.8rem] w-[4.8rem] items-center justify-center rounded-full',
          isDisabled ? 'text-grayscale-500' : 'text-primary-700'
        )}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {icon}
      </button>
      <p className='caption-m-11 text-nowrap text-center'>{title}</p>
    </div>
  );
}
