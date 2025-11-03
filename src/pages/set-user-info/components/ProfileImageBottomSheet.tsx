import { DEFAULT_PROFILE_IMAGE } from '@pages/mypage/hooks/use-user-data';
import BottomSheet from '@components/bottom-sheet/BottomSheet';
import Button from '@components/button/Button';
import { MAX_MB, NOT_ALLOWED_FILE_TYPE } from '@constant/image';
import useToast from '@hooks/use-toast';
import { isAcceptableFile, isFileSizeValid } from '@utils/image';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface ProfileImageBottomSheetProps {
  isBottomSheetOpen: boolean;
  handleCloseBottomSheet: () => void;
}

export default function ProfileImageBottomSheet({
  isBottomSheetOpen,
  handleCloseBottomSheet,
}: ProfileImageBottomSheetProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();
  const { setValue } = useFormContext();

  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isAcceptableFile(file)) {
      toast.error(NOT_ALLOWED_FILE_TYPE);
      return;
    }

    if (!isFileSizeValid(file)) {
      toast.error(`파일 용량은 ${MAX_MB}MB 이하여야 합니다.`);
      return;
    }

    // TODO : 추후 presignedURL api로 대체
    const imageUrl = URL.createObjectURL(file);

    setValue('profileImageUrl', imageUrl);
    handleCloseBottomSheet();
  };

  const handleDeleteImage = () => {
    setValue('profileImageUrl', DEFAULT_PROFILE_IMAGE);
    handleCloseBottomSheet();
  };
  return (
    <BottomSheet
      isOpen={isBottomSheetOpen}
      handleCloseBottomSheet={handleCloseBottomSheet}
      sheetHeight={230}
    >
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
    </BottomSheet>
  );
}
