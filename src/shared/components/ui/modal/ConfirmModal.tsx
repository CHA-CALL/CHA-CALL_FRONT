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
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  handleClose,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const footer = (
    <>
      <Button variant='cta' buttonStyle='sub' onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button variant='cta' buttonStyle='active' onClick={onConfirm}>
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
