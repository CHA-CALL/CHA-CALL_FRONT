import { cn } from '@shared/utils/cn';
import React from 'react';

interface NavigationProps {
  centerContent?: string | React.ReactNode;
  leftIcon?: React.ReactNode;
  handleLeftClick?: () => void;
  rightIcon?: React.ReactNode;
  handleRightClick?: () => void;
  className?: string;
}

export default function Navigation({
  centerContent,
  leftIcon,
  handleLeftClick,
  rightIcon,
  handleRightClick,
  className = 'bg-white',
}: NavigationProps) {
  return (
    <nav
      className={cn(
        `top-[0] z-30 flex h-[4.8rem] items-center fixed-center`,
        className
      )}
    >
      <div className='flex flex-[1] justify-start px-[1.3rem]'>
        {leftIcon && (
          <button
            type='button'
            className='flex justify-center'
            onClick={handleLeftClick}
          >
            {leftIcon}
          </button>
        )}
      </div>
      <div className='flex flex-[3] justify-center gap-[1rem]'>
        {typeof centerContent === 'string' ? (
          <span className='text-grayscale-900 title-sb-16'>
            {centerContent}
          </span>
        ) : (
          <>{centerContent}</>
        )}
      </div>
      <div className='flex flex-[1] justify-end px-[1.3rem]'>
        {rightIcon && (
          <div
            role='button'
            className='flex justify-center'
            onClick={handleRightClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
    </nav>
  );
}
