import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import Button from '@shared/components/button/Button';
import React, { useRef } from 'react';

interface ProfileImageBottomSheetProps {
  isBottomSheetOpen: boolean;
  handleCloseBottomSheet: () => void;
  handleFileChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: () => void;
}

export default function ProfileImageBottomSheet({
  isBottomSheetOpen,
  handleCloseBottomSheet,
  handleFileChange,
  handleDeleteImage,
}: ProfileImageBottomSheetProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <BottomSheet
      isOpen={isBottomSheetOpen}
      handleCloseBottomSheet={handleCloseBottomSheet}
      sheetContent={
        <>
          <button
            type='button'
            className='border-grayscale-100 text-grayscale-700 title-sb-14 flex w-full justify-center border-b py-[2rem]'
            onClick={handleEditImage}
          >
            <span>수정하기</span>
          </button>
          <input
            className='hidden'
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            type='button'
            className='text-grayscale-700 title-sb-14 flex w-full justify-center py-[2rem]'
            onClick={handleDeleteImage}
          >
            <span>삭제하기</span>
          </button>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleCloseBottomSheet}
          >
            취소
          </Button>
        </>
      }
      sheetHeight={230}
    />
  );
}
