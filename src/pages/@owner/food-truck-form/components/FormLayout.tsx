import React from 'react';
import { cn } from '@shared/utils/cn';

interface FormLayoutProps {
  isRequired: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  isLast?: boolean;
}
export default function FormLayout({
  isRequired,
  title,
  description,
  children,
  isLast = false,
}: FormLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-start gap-[1.2rem] py-[2.6rem]',
        !isLast && 'border-grayscale-100 border-b'
      )}
    >
      <div className='title-sb-14 flex items-center gap-[0.6rem]'>
        <span className='text-grayscale-900'>{title}</span>
        {description && (
          <span className='caption-m-12 text-grayscale-500'>{description}</span>
        )}
        {isRequired && <span className='text-primary-700'>*</span>}
      </div>
      {children}
    </div>
  );
}
