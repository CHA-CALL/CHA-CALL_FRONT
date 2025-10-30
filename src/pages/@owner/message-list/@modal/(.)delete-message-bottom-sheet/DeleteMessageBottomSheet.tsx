import BottomSheet from '@ui/bottom-sheet/BottomSheet';
import Button from '@ui/button/Button';

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
      sheetHeight={0}
    >
      <div className='flex flex-col'>
        <Button
          variant='cta'
          buttonStyle='sub'
          className='text-grayscale-700 title-sb-14 border-0 p-[2rem]'
          onClick={handleDeleteMessage}
        >
          삭제하기
        </Button>
        <Button
          variant='cta'
          buttonStyle='sub'
          className='text-grayscale-700 title-sb-14 p-[2rem]'
          onClick={handleCloseModal}
        >
          취소
        </Button>
      </div>
    </BottomSheet>
  );
}
