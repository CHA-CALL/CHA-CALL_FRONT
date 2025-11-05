import React from 'react';
import ErrorText from '@form/error-text/ErrorText';

interface MenuInputProps {
  title: string;
  error?: string;
  children: React.ReactNode;
  currentLength?: number;
  maxLength?: number;
}

export default function MenuInput({
  title,
  error,
  children,
  currentLength,
  maxLength,
}: MenuInputProps) {
  return (
    <div className='flex flex-col gap-[1rem]'>
      <div
        className={
          maxLength
            ? 'mb-[0.6rem] flex items-center justify-between'
            : undefined
        }
      >
        <span className='title-sb-14 text-grayscale-900'>{title}</span>
        {maxLength && (
          <div className='caption-m-12 flex items-center justify-end gap-[0.1rem]'>
            <p className='text-primary-700'>{currentLength}</p>
            <p className='text-grayscale-700'>/</p>
            <p className='text-grayscale-700'>{maxLength}</p>
          </div>
        )}
      </div>
      {children}
      {error && <ErrorText text={error} />}
    </div>
  );
}
