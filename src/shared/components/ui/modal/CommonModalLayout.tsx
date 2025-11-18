import Modal from '@components/ui/modal/Modal';
import type { ReactNode } from 'react';

interface CommonModalLayoutProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description: string | ReactNode;
  footer: ReactNode;
}

export default function CommonModalLayout({
  isOpen,
  handleClose,
  title,
  description,
  footer,
}: CommonModalLayoutProps) {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Body>{description}</Modal.Body>
      </Modal.Header>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
}
