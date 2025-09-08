import React, { useRef } from 'react';

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

  useBottomSheetDrag({
    sheetRef,
    handleCloseBottomSheet,
    sheetHeight,
  });
  return (
    <div
      className={cn(
        'absolute w-full h-full bg-black/50 transition-opacity duration-300 ease-in-out',
        'transition-opacity duration-300 ease-in-out',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleCloseBottomSheet}
    >
      <div
        ref={sheetRef}
        className={cn(
          'fixed bottom-[0rem] w-full max-w-[60rem] flex flex-col justify-center px-[3.2rem] bg-white rounded-t-[3.2rem]',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className='my-[1rem] mx-auto rounded-[10rem] h-[0.35rem] w-[4.1rem] bg-grayscale-300' />
        <div className='mt-[2.8rem] mb-[3.4rem]'>{sheetContent}</div>
      </div>
    </div>
  );
}
