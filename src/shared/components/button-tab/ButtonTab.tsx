import React from 'react';
import { cn } from '@utils/cn';

interface ButtonTabProps {
  children: React.ReactNode;
  isActive?: boolean;
  handleClickTab?: () => void;
}

export default function ButtonTab({
  children,
  isActive = false,
  handleClickTab,
}: ButtonTabProps) {
  return (
    <div>
      <button
        type='button'
        onClick={handleClickTab}
        className={cn(
          'relative mx-[0.5rem] px-[0.4rem] py-[1.2rem] duration-200',
          isActive ? 'cursor-default text-primary-700' : 'text-grayscale-900'
        )}
      >
        {children}
      </button>
      {isActive && (
        <div className='h-[0.2rem] rounded-[0.2rem] bg-primary-700' />
      )}
    </div>
  );
}
