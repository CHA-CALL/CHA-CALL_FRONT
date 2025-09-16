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
  className?: string;
}

export default function Modal({
  isOpen = false,
  title,
  content,
  cancelChildren,
  confirmChildren,
  handleCancelClick,
  handleConfirmClick,
  handleModalClose,
  className,
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
        'fixed inset-0 flex items-center justify-center',
        'max-w-[60rem] w-screen h-screen',
        'bg-[var(--grayscale-black-50,rgba(0,0,0,0.5))] z-100 ',
        className
      )}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`
          flex flex-col min-w-[27.4rem]
          px-[2rem] pb-[2rem] pt-[2.4rem]
          rounded-[1.6rem] bg-white
        `}
      >
        <span className='title-sb-16 text-grayscale-900'>{title}</span>
        <span className='caption-m-12 text-grayscale-700'>{content}</span>
        <div className='mt-[1.6rem] flex gap-[1rem]'>
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
  );
}
