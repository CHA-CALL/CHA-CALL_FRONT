import BottomSheet from '@shared/components/bottom-sheet/BottomSheet';
import Button from '@shared/components/button/Button';

interface DeleteFoodTruckBottomSheetProps {
  isOpen: boolean;
  handleClose: () => void;
  handleDeleteFoodTruck: () => void;
}
export default function DeleteFoodTruckBottomSheet({
  isOpen,
  handleClose,
  handleDeleteFoodTruck,
}: DeleteFoodTruckBottomSheetProps) {
  const handleCloseModal = () => {
    handleClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      handleCloseBottomSheet={handleClose}
      sheetHeight={500}
    >
      <div>
        <Button
          variant='default'
          buttonStyle='large'
          onClick={handleDeleteFoodTruck}
          className='border-0 p-[2rem] text-grayscale-700 title-sb-14'
        >
          삭제하기
        </Button>
        <Button
          variant='default'
          buttonStyle='large'
          onClick={handleCloseModal}
          className='rounded-[1.6rem] p-[2rem] text-grayscale-700 title-sb-14'
        >
          취소
        </Button>
      </div>
    </BottomSheet>
  );
}
