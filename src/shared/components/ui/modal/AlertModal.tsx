import CommonModalLayout from '@components/ui/modal/CommonModalLayout';
import Button from '@components/ui/button/Button';

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
  const footer = (
    <Button
      variant='verify'
      buttonStyle='active'
      onClick={handleClose}
      className='w-full py-[1.1rem]'
    >
      {confirmLabel}
    </Button>
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
