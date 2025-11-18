import CommonModalLayout from '@components/ui/modal/CommonModalLayout';

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
    <button
      type='button'
      className='title-sb-14 bg-primary-700 w-full rounded-[0.8rem] py-[0.85rem] text-white'
      onClick={handleClose}
    >
      {confirmLabel}
    </button>
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
