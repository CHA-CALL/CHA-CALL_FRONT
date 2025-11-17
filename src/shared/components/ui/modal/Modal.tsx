import Overlay from '@components/layout/overlay/Overlay';
import Button from '@components/ui/button/Button';
import type { ReactNode } from 'react';

interface ModalProps {
  title: string;
  description: string | ReactNode;
  leftLabbel?: string;
  rightLabel?: string;
  singleLabel?: string;
  isOpen: boolean;
  handleClose: () => void;
  handleClickConfirm: () => void;
  handleClickCancel: () => void;
}

export default function Modal({
  title,
  description,
  isOpen,
  handleClose,
  handleClickConfirm,
  handleClickCancel,
}: ModalProps) {
  return (
    <Overlay isOpen={isOpen} handleClose={handleClose}>
      <div className='flex min-w-[27.4rem] flex-col gap-[1.6rem] rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
        <div className='flex w-full flex-col justify-start gap-[0.2rem]'>
          <p className='title-sb-16 text-grayscale-900'>{title}</p>
          {typeof description === 'string' ? (
            <p className='caption-m-12 text-grayscale-700'>{description}</p>
          ) : (
            description
          )}
        </div>
        <div className='flex gap-[1rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleClickCancel}
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
