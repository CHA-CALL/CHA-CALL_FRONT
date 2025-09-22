import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import Button from '@shared/components/button/Button';

interface DeleteMessageBottomSheetProps {
  isOpen: boolean;
  handleClose: () => void;
  handleDeleteMessage: () => void;
  handleCloseModal: () => void;
}

export default function DeleteMessageBottomSheet({
  isOpen,
  handleClose,
  handleDeleteMessage,
  handleCloseModal,
}: DeleteMessageBottomSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      handleCloseBottomSheet={handleClose}
      sheetContent={
        <div className='mt-[-2.8rem] flex flex-col'>
          <Button
            variant='cta'
            buttonStyle='sub'
            className='title-sb-14 text-grayscale-700 border-0 p-[2rem]'
            onClick={handleDeleteMessage}
          >
            삭제하기
          </Button>
          <Button
            variant='cta'
            buttonStyle='sub'
            className='title-sb-14 text-grayscale-700 p-[2rem]'
            onClick={handleCloseModal}
          >
            취소
          </Button>
        </div>
      }
      sheetHeight={0}
    />
  );
}
