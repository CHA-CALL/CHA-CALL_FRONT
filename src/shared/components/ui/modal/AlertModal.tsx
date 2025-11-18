import Button from '@components/ui/button/Button';
import Modal from '@components/ui/modal/Modal';

interface AlertModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
}

export default function AlertModal({
  isOpen,
  handleClose,
  title,
  description,
  confirmLabel = '확인',
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Body>{description}</Modal.Body>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={handleClose} // 유일한 액션은 '닫기'
          className='w-full'
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
