import React from 'react';

import { cn } from '@utils/cn';

interface ButtonTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  handleClick?: () => void;
}

export default function ButtonText({
  children,
  handleClick,
  className,
  ...props
}: ButtonTextProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'text-grayscale-500 p-[0.4rem] underline underline-offset-2',
        'hover:border-grayscale-900 hover:text-grayscale-900 duration-200',
        className
      )}
      {...props}
    >
      + {children}
    </button>
  );
}
