import Modal from '@components/ui/modal/Modal';
import type { ReactNode } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description: string | ReactNode;
  leftLabel?: string;
  rightLabel?: string;
  handleClickRight: () => void;
  handleClickLeft: () => void;
}

export default function ConfirmModal({
  isOpen,
  handleClose,
  title,
  description,
  rightLabel = '확인',
  leftLabel = '취소',
  handleClickRight,
  handleClickLeft,
}: ConfirmModalProps) {
  const footer = (
    <>
      <button
        type='button'
        className='title-sb-14 text-grayscale-700 border-grayscale-200 w-full rounded-[0.8rem] border bg-white py-[0.85rem] text-center'
        onClick={handleClickLeft}
      >
        {leftLabel}
      </button>
      <button
        type='button'
        className='title-sb-14 bg-primary-700 w-full rounded-[0.8rem] py-[0.85rem] text-white'
        onClick={handleClickRight}
      >
        {rightLabel}
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title={title}
      description={description}
      footer={footer}
    />
  );
}
