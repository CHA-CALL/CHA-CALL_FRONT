import Overlay from '@shared/components/overlay/Overlay';
import Button from '@shared/components/button/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleClickConfirm: () => void;
  handleClickCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  handleClose,
  handleClickConfirm,
  handleClickCancel,
}: ConfirmModalProps) {
  return (
    <Overlay isOpen={isOpen} handleClose={handleClose}>
      <div className='flex w-[27.4rem] flex-col items-center justify-center gap-[1.6rem] rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
        <div className='flex w-full flex-col justify-start gap-[0.2rem]'>
          <p className='title-sb-16 text-grayscale-900'>
            저장하지 않고 나가시겠습니까?
          </p>
          <p className='caption-m-12 text-grayscale-700'>
            작성 중인 내용은 저장되지 않으며,
            <br />
            나가면 모두 삭제됩니다.
          </p>
        </div>
        <div className='flex justify-between gap-[1rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            className='w-[11.2rem]'
            handleClickButton={handleClickConfirm}
          >
            나가기
          </Button>
          <Button
            variant='cta'
            buttonStyle='active'
            className='w-[11.2rem]'
            handleClickButton={handleClickCancel}
          >
            취소
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
