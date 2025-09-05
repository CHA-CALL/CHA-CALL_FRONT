import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonTabProps {
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

export default function ButtonTab({
  children,
  isActive = false,
  onClick,
}: ButtonTabProps) {
  return (
    <div>
      <button
        type='button'
        onClick={onClick}
        className={cn(
          'relative mx-[0.5rem] px-[0.4rem] py-[1.2rem] duration-200',
          isActive
            ? 'text-primary-700 cursor-default'
            : 'text-grayscale-900'
        )}
      >
        {children}
      </button>
      {isActive && (
          <div className='h-[0.2rem] bg-primary-700 rounded-[0.2rem]' />
        )}
    </div>
  )
}
