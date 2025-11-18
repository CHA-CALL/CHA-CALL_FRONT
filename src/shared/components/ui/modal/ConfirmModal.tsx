import CommonModalLayout from '@components/ui/modal/CommonModalLayout';
import Button from '@components/ui/button/Button';
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
      <Button variant='cta' buttonStyle='sub' onClick={handleCancel}>
        {cancelLabel}
      </Button>
      <Button variant='cta' buttonStyle='active' onClick={handleConfirm}>
        {confirmLabel}
      </Button>
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
