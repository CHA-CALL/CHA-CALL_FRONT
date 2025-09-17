import { cn } from '@shared/utils/cn';
import React from 'react';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightComponent?: React.ReactNode;
  handleRightClick?: () => void;
  error?: boolean;
}

export default function SearchBar({
  rightComponent,
  handleRightClick,
  error = false,
  className,
  ...props
}: SearchBarProps) {
  return (
    <div
      className={cn(
        'border-grayscale-200 focus-within:border-grayscale-700 flex h-[5.4rem] w-full min-w-[33.5rem] flex-shrink-0 items-center justify-between rounded-[1.6rem] border px-[1rem] py-[1.7rem]',
        error && 'border-primary-500 focus-within:border-primary-500',
        className
      )}
    >
      <input
        className='text-grayscale-900 caret-primary-700 body-m-14 placeholder:text-grayscale-300 placeholder:body-m-14 mr-[1rem] h-full w-full'
        maxLength={props.maxLength}
        {...props}
      />
      <div className='flex items-center gap-[1rem]'>
        {props.maxLength && (
          <div className='text-grayscale-700 caption-m-12 flex items-center gap-[0.1rem]'>
            <span className='text-primary-700'>
              {props.value?.toString().length}
            </span>
            <span>/</span>
            <span className='caption-m-12'>{props.maxLength}</span>
          </div>
        )}
        {rightComponent && (
          <div onClick={handleRightClick}>{rightComponent}</div>
        )}
      </div>
    </div>
  );
}
