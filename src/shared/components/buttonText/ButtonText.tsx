import React from 'react';
import { cn } from '@utils/cn';

interface ButtonTextProps {
  children: React.ReactNode;
  handleClick?: () => void;
}

export default function ButtonText({
  children,
  handleClick
}: ButtonTextProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'pb-[0.1rem] text-grayscale-500 border-b-[0.1rem] border-grayscale-500',
        'hover:text-grayscale-900 hover:border-grayscale-900 duration-200'
      )}
    >
      + {children}
    </button>
  )
}
