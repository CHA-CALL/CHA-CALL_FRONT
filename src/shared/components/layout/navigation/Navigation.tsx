import { cn } from '@shared/utils/cn';
import React from 'react';
import Tag from '@ui/tag/Tag';

interface NavigationProps {
  leftIcon?: React.ReactNode;
  handleLeftClick?: () => void;
  rightIcon?: React.ReactNode;
  handleRightClick?: () => void;
  text?: string;
  tag?: string;
  className?: string;
}

export default function Navigation({
  leftIcon,
  handleLeftClick,
  rightIcon,
  handleRightClick,
  text,
  tag,
  className = 'bg-white',
}: NavigationProps) {
  return (
    <nav
      className={cn(
        `top-[0] z-30 flex h-[4.8rem] items-center fixed-center`,
        className
      )}
    >
      <div className='flex flex-[1] items-center justify-start px-[1.3rem]'>
        {leftIcon && (
          <button type='button' onClick={handleLeftClick}>
            {leftIcon}
          </button>
        )}
      </div>
      <div className='flex flex-[3] items-center justify-center gap-[1rem]'>
        {text && <span className='text-grayscale-900 title-sb-16'>{text}</span>}
        {tag && <Tag title={tag} />}
      </div>
      <div className='flex flex-[1] items-center justify-end px-[1.3rem]'>
        {rightIcon && (
          <div role='button' onClick={handleRightClick}>
            {rightIcon}
          </div>
        )}
      </div>
    </nav>
  );
}
