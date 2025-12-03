import React from 'react';
import { cn } from '@utils/cn';

interface FormFieldLayoutProps {
  isRequired: boolean;
  title: string;
  subTitle?: string;
  description?: string;
  children: React.ReactNode;
  borderBottom?: boolean;
  rightComponent?: React.ReactNode;
  className?: string;
}

export default function FormFieldLayout({
  isRequired,
  title,
  subTitle,
  description,
  children,
  borderBottom = false,
  rightComponent,
  className,
}: FormFieldLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-start gap-[1.2rem]',
        borderBottom && 'border-b border-grayscale-100',
        className
      )}
    >
      <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[0.6rem] title-sb-14'>
            <span className='text-grayscale-900'>{title}</span>
            {subTitle && (
              <span className='text-grayscale-500 caption-m-12'>
                {subTitle}
              </span>
            )}

            {isRequired && <span className='text-primary-700'>*</span>}
          </div>
          {rightComponent && rightComponent}
        </div>
        {description && (
          <span className='text-grayscale-500 caption-m-12'>{description}</span>
        )}
      </div>
      {children}
    </div>
  );
}
