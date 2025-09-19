import React, { useEffect, useRef } from 'react';
import { cn } from '@shared/utils/cn';

interface OverlayProps {
  isOpen?: boolean;
  position?: 'center' | 'bottom' | 'top' | 'left' | 'right';
  handleClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Overlay({
  isOpen = false,
  position = 'center',
  handleClose,
  children,
  className,
  ...props
}: OverlayProps) {
  const prevOverflowRef = useRef<string>('');

  useEffect(() => {
    if (isOpen) {
      prevOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflowRef.current || '';
    }
    return () => {
      document.body.style.overflow = prevOverflowRef.current || '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'items-end justify-center';
      case 'top':
        return 'items-start justify-center';
      case 'left':
        return 'items-center justify-start';
      case 'right':
        return 'items-center justify-end';
      default:
        return 'items-center justify-center';
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={cn(
        'fixed left-1/2 top-[0] z-50 flex h-dvh w-full max-w-[60rem] -translate-x-1/2 bg-black/50',
        getPositionClasses(),
        'transition-opacity duration-300 ease-in-out',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
