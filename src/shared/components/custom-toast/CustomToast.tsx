import React from 'react';
import { type ToastContentProps } from 'react-toastify';

interface CustomToastProps extends ToastContentProps {
  text?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function CustomToast({ text, icon, children }: CustomToastProps) {
  return (
    <div className="flex items-center gap-[1rem] px-[1.6rem] w-[33.5rem] h-[4rem] py-[0.9rem] bg-grayscale-900 text-white rounded-[1.6rem]">
      {icon && icon}
      {text && <p className="caption-m-12">{text}</p>}
      {children && children}
    </div>
  );
}