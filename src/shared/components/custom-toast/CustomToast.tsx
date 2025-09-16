import React from "react";
import { type ToastContentProps } from "react-toastify";

interface CustomToastProps extends ToastContentProps {
  text?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function CustomToast({
  text,
  icon,
  children,
}: CustomToastProps) {
  return (
    <div className="bg-grayscale-900 flex h-[4rem] w-[33.5rem] items-center gap-[1rem] rounded-[1.6rem] px-[1.6rem] py-[0.9rem] text-white">
      {icon && icon}
      {text && <p className="caption-m-12">{text}</p>}
      {children && children}
    </div>
  );
}
