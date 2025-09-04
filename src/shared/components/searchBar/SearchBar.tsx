import React from 'react';
import { cva } from 'class-variance-authority';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'icon' | 'button';
  rightComponent?: React.ReactNode;
  handleRightClick?: () => void;
}

const containerVariants = cva(
  'flex items-center border border-grayscale-700 rounded-[1.6rem] w-[33.5rem] h-[5.4rem] flex-shrink-0',
  {
    variants: {
      type: {
        icon: 'justify-end pl-[2rem] pr-[1.6rem] py-[1.6rem]',
        button: 'justify-between px-[1rem] py-[1.7rem]',
      },
    },
    defaultVariants: {
      type: 'icon',
    },
  }
);

export default function SearchBar({
  type,
  rightComponent,
  handleRightClick,
  ...props
}: SearchBarProps) {
  return (
    <div className={containerVariants({ type })}>
      <input
        className='w-full h-full caret-primary-700 body-m-14 text-grayscale-900 placeholder:text-grayscale-300 placeholder:body-m-14'
        {...props}
      />
      <div className='flex items-center gap-[1rem]'>
        {props.maxLength && (
          <div className='flex items-center gap-[0.1rem] text-grayscale-500 caption-m-12'>
            <span className='text-primary-700'>
              {props.value?.toString().length}
            </span>
            <span>/</span>
            <span className='caption-m-12'>{props.maxLength}</span>
          </div>
        )}
        {rightComponent && (
          <button onClick={handleRightClick} className='w-[2.2rem] h-[2.2rem]'>
            {rightComponent}
          </button>
        )}
      </div>
    </div>
  );
}
