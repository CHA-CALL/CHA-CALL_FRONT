import React from 'react';

interface NavigationProps {
  leftIcon?: React.ReactNode;
  handleLeftClick?: () => void;
  rightIcon?: React.ReactNode;
  handleRightClick?: () => void;
  text?: string;
}

export default function Navigation({
  leftIcon,
  handleLeftClick,
  rightIcon,
  handleRightClick,
  text,
}: NavigationProps) {
  return (
    <nav className='sticky left-[0] right-[0] top-[0] z-30 grid h-[4.8rem] w-full grid-cols-3 items-center bg-white'>
      <div className='flex h-full items-center justify-start p-[1.3rem]'>
        {leftIcon && <button onClick={handleLeftClick}>{leftIcon}</button>}
      </div>
      <div className='flex h-full items-center justify-center'>
        {text && <span className='text-grayscale-900 title-sb-16'>{text}</span>}
      </div>
      <div className='flex h-full items-center justify-end py-[1rem] pr-[2rem]'>
        {rightIcon && (
          <div role='button' onClick={handleRightClick}>
            {rightIcon}
          </div>
        )}
      </div>
    </nav>
  );
}
