import React from 'react';
import { cn } from '@utils/cn';

interface ButtonTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  handleClickTab?: () => void;
}

export default function ButtonTab({
  children,
  isActive = false,
  handleClickTab,
  className,
  ...props
}: ButtonTabProps) {
  return (
    <div>
      <button
        type='button'
        onClick={handleClickTab}
        className={cn(
          'relative mx-[0.5rem] px-[0.4rem] py-[1.2rem] duration-200',
          isActive ? 'text-primary-700 cursor-default' : 'text-grayscale-900',
          className
        )}
        {...props}
      >
        {children}
      </button>
      {isActive && (
        <div className='bg-primary-700 h-[0.2rem] rounded-[0.2rem]' />
      )}
    </div>
  );
}
