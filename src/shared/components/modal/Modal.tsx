import React, { type MouseEvent } from 'react';
import { cn } from '@utils/cn';
import Button from '@components/button/Button';

interface ModalProps {
  isOpen?: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
  cancelChildren: React.ReactNode;
  confirmChildren: React.ReactNode;
  handleCancelClick: () => void;
  handleConfirmClick: () => void;
  handleModalClose: () => void;
}

export default function Modal({
  isOpen = false,
  title,
  content,
  cancelChildren,
  confirmChildren,
  handleCancelClick,
  handleConfirmClick,
  handleModalClose
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleCancel = () => {
    handleCancelClick();
    handleModalClose();
  };

  const handleConfirm = () => {
    handleConfirmClick();
    handleModalClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={cn(
        'fixed flex items-center justify-center',
        'w-[100%] h-[100%]',
        'bg-[var(--grayscale-black-50,rgba(0,0,0,0.5))]'
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'flex flex-col',
          'px-[2rem] pt-[2.4rem] pb-[2rem]',
          'bg-white rounded-[1.6rem]',
        )}
      >
        <span className='title-sb-16 text-grayscale-900'>
          {title}
        </span>
        <span className='mt-[0.7rem] caption-m-12 text-grayscale-700'>
          {content}
        </span>
        <div className='flex gap-[1rem] mt-[1.6rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleCancel}
          >
            {cancelChildren}
          </Button>
          <Button
            variant='cta'
            buttonStyle='active'
            handleClickButton={handleConfirm}
          >
            {confirmChildren}
          </Button>
        </div>
      </div>
    </div>
  )
}
