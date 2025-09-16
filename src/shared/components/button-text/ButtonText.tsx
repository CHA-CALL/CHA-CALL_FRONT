import React from 'react';

import { cn } from '@utils/cn';

interface ButtonTextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  handleClick?: () => void;
}

export default function ButtonText({ children, handleClick, className, ...props }: ButtonTextProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'p-[0.4rem] text-grayscale-500 underline underline-offset-2',
        'duration-200 hover:border-grayscale-900 hover:text-grayscale-900',
        className
      )}
      {...props}
    >+ {children}
    </button>
  );
}
