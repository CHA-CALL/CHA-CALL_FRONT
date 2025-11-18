import Button from '@components/ui/button/Button';
import Modal from '@components/ui/modal/Modal';
import type { ReactNode } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  handleClose: () => void; // Overlay 클릭 시
  title: string;
  description: string | ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void; // 필수
  onCancel: () => void; // 필수
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
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Body>{description}</Modal.Body>
      </Modal.Header>
      <Modal.Footer>
        <Button variant='cta' buttonStyle='sub' handleClickButton={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={onConfirm}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
