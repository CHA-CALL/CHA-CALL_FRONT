import CommonModalLayout from '@components/ui/modal/CommonModalLayout';
import type { ReactNode } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  handleClose,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  handleConfirm,
  handleCancel,
}: ConfirmModalProps) {
  const footer = (
    <>
      <button
        type='button'
        className='title-sb-14 text-grayscale-700 border-grayscale-200 w-full rounded-[0.8rem] border bg-white py-[0.85rem] text-center'
        onClick={handleCancel}
      >
        {cancelLabel}
      </button>
      <button
        type='button'
        className='title-sb-14 bg-primary-700 w-full rounded-[0.8rem] py-[0.85rem] text-white'
        onClick={handleConfirm}
      >
        {confirmLabel}
      </button>
    </>
  );

  return (
    <CommonModalLayout
      isOpen={isOpen}
      handleClose={handleClose}
      title={title}
      description={description}
      footer={footer}
    />
  );
}
