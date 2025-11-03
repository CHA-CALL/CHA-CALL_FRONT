import { cn } from '@utils/cn';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rightComponent?: React.ReactNode;
  handleRightClick?: () => void;
  error?: boolean;
}

export default function Input({
  rightComponent,
  handleRightClick,
  error = false,
  className,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        'flex h-[5.4rem] w-full min-w-[33.5rem] flex-shrink-0 items-center justify-between rounded-[1.6rem] border border-grayscale-200 px-[1rem] py-[1.7rem] focus-within:border-grayscale-700',
        error && 'border-primary-500 focus-within:border-primary-500',
        className
      )}
    >
      <input
        className='mr-[1rem] h-full w-full text-grayscale-900 caret-primary-700 body-m-14 placeholder:text-grayscale-300 placeholder:body-m-14'
        maxLength={props.maxLength}
        {...props}
      />
      <div className='flex items-center gap-[1rem]'>
        {props.maxLength && (
          <div className='flex items-center gap-[0.1rem] text-grayscale-700 caption-m-12'>
            <span className='text-primary-700'>
              {props.value?.toString().length}
            </span>
            <span>/</span>
            <span className='caption-m-12'>{props.maxLength}</span>
          </div>
        )}
        {rightComponent && (
          <div
            className='flex items-center'
            onMouseDown={e => e.preventDefault()}
            onClick={handleRightClick}
          >
            {rightComponent}
          </div>
        )}
      </div>
    </div>
  );
}
