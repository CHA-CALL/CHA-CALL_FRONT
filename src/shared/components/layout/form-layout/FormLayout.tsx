import React from 'react';
import { cn } from '@utils/cn';

interface FormLayoutProps {
  isRequired: boolean;
  title: string;
  subTitle?: string;
  description?: string;
  children: React.ReactNode;
  isLast?: boolean;
  rightComponent?: React.ReactNode;
}

export default function FormLayout({
  isRequired,
  title,
  subTitle,
  description,
  children,
  isLast = false,
  rightComponent,
}: FormLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-start gap-[1.2rem] py-[2.6rem]',
        !isLast && 'border-grayscale-100 border-b'
      )}
    >
      <div>
        <div className='flex items-center justify-between'>
          <div className='title-sb-14 flex items-center gap-[0.6rem]'>
            <span className='text-grayscale-900'>{title}</span>
            {subTitle && (
              <span className='caption-m-12 text-grayscale-500'>
                {subTitle}
              </span>
            )}

            {isRequired && <span className='text-primary-700'>*</span>}
          </div>
          {rightComponent && rightComponent}
        </div>
        {description && (
          <span className='caption-m-12 text-grayscale-500'>{description}</span>
        )}
      </div>
      {children}
    </div>
  );
}
