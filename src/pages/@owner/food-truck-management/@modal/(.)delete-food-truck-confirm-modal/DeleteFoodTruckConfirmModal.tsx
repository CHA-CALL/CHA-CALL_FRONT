import Overlay from '@shared/components/layout/overlay/Overlay';
import Button from '@shared/components/ui/button/Button';

interface DeleteFoodTruckConfirmModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleClickConfirm: () => void;
}

export default function DeleteFoodTruckConfirmModal({
  isOpen,
  handleClose,
  handleClickConfirm,
}: DeleteFoodTruckConfirmModalProps) {
  return (
    <Overlay isOpen={isOpen} handleClose={handleClose}>
      <div className='flex min-w-[27.4rem] flex-col gap-[1.6rem] rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
        <div className='flex w-full flex-col justify-start gap-[0.2rem]'>
          <p className='title-sb-16 text-grayscale-900'>
            이 푸드트럭을 삭제할까요?
          </p>
          <p className='caption-m-12 text-grayscale-700'>
            삭제 후에는 되돌릴 수 없습니다.
          </p>
        </div>
        <div className='flex gap-[1rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleClose}
          >
            취소
          </Button>
          <Button
            variant='cta'
            buttonStyle='active'
            handleClickButton={handleClickConfirm}
          >
            삭제
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
