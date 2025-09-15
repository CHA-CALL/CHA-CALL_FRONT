import { cn } from '@utils/cn';
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
  ...props
}: SearchBarProps) {
  return (
    <div
      className={cn(
        'flex justify-between items-center px-[1rem] py-[1.6rem] border border-grayscale-200 rounded-[1.6rem] min-w-[33.5rem] w-full h-[5.4rem] flex-shrink-0 hover:border-grayscale-700',
        error && 'border-primary-500'
      )}
    >
      <input
        className='w-full h-full caret-primary-700 body-m-14 text-grayscale-900 placeholder:text-grayscale-300 placeholder:body-m-14 mr-[1rem]'
        maxLength={props.maxLength}
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
          <div onClick={handleRightClick}>{rightComponent}</div>
        )}
      </div>
    </div>
  );
}
