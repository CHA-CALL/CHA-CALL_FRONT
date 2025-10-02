import React from 'react';
import { cn } from '@shared/utils/cn';

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
    <div className='w-full'>
      <button
        type='button'
        onClick={handleClickTab}
        className={cn(
          'relative mt-[1.8rem] w-full py-[1.2rem] duration-200 title-sb-14',
          isActive ? 'cursor-default text-primary-700' : 'text-grayscale-900',
          className
        )}
        {...props}
      >
        {children}
      </button>
      {isActive && (
        <div className='h-[0.2rem] rounded-[0.2rem] bg-primary-700' />
      )}
    </div>
  );
}
