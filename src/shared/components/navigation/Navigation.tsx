import React from 'react';

interface NavigationProps {
  leftIcon?: React.ReactNode;
  handleLeftClick?: () => void;
  rightIcon?: React.ReactNode;
  handleRightClick?: () => void;
  text?: string;
  backgroundColor?: string;
}

export default function Navigation({
  leftIcon,
  handleLeftClick,
  rightIcon,
  handleRightClick,
  text,
  backgroundColor = 'bg-white',
}: NavigationProps) {
  return (
    <nav
      className={`top-[0] z-30 flex h-[4.8rem] items-center ${backgroundColor} fixed-center`}
    >
      <div className='flex flex-[1] items-center justify-start px-[1.3rem]'>
        {leftIcon && <button onClick={handleLeftClick}>{leftIcon}</button>}
      </div>
      <div className='flex flex-[3] items-center justify-center'>
        {text && <span className='text-grayscale-900 title-sb-16'>{text}</span>}
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
