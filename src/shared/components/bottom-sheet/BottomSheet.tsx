import { cn } from '@shared/utils/cn';
import React from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  handleCloseBottomSheet: () => void;
  sheetContent: React.ReactNode;
}

const BottomSheet = ({
  isOpen,
  handleCloseBottomSheet,
  sheetContent,
}: BottomSheetProps) => {
  return (
    <div
      className={cn(
        'absolute w-full h-dvh bg-black/50 transition-opacity duration-300 ease-in-out',
        'transition-opacity duration-300 ease-in-out',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleCloseBottomSheet}
    >
      <div
        className={cn(
          'absolute bottom-[0rem] w-full flex flex-col justify-center px-[3.2rem] bg-white rounded-t-[3.2rem]',
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
};

export default BottomSheet;
