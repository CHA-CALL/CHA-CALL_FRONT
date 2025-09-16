import React, { useEffect, useRef } from 'react';

import useBottomSheetDrag from '@shared/hooks/use-bottom-sheet-drag';
import { cn } from '@shared/utils/cn';

interface BottomSheetProps {
  isOpen: boolean;
  handleCloseBottomSheet: () => void;
  sheetContent: React.ReactNode;
  sheetHeight: number;
}

export default function BottomSheet({
  isOpen,
  handleCloseBottomSheet,
  sheetContent,
  sheetHeight,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
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

  useBottomSheetDrag({
    sheetRef,
    handleCloseBottomSheet,
    sheetHeight,
  });
  return (
   
      <div
        ref={sheetRef}
        className={cn(
          'fixed bottom-[0rem] left-1/2 flex w-full max-w-[60rem] -translate-x-1/2 flex-col justify-center rounded-t-[3.2rem] bg-white px-[3.2rem]',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className='mx-auto my-[1rem] h-[0.35rem] w-[4.1rem] rounded-[10rem] bg-grayscale-300' />
        <div className='mb-[3.4rem] mt-[2.8rem]'>{sheetContent}</div>
      </div>
   
  );
}
