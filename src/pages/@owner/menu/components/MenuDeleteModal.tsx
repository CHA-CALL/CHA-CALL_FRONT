import Overlay from '@components/overlay/Overlay';
import Button from '@components/button/Button';

interface MenuDeleteModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleConfirmDelete: () => void;
}

export default function MenuDeleteModal({
  isModalOpen,
  handleCloseModal,
  handleConfirmDelete,
}: MenuDeleteModalProps) {
  return (
    <Overlay
      isOpen={isModalOpen}
      position='center'
      handleClose={handleCloseModal}
    >
      <div className='flex flex-col pt-[2.4rem] pb-[2rem] px-[2rem] rounded-[1.6rem] bg-white'>
        <span className='title-sb-16 text-grayscale-900'>
          이 메뉴를 삭제할까요?
        </span>
        <span className='caption-m-12 text-grayscale-700 mb-[1.6rem]'>
          삭제 후에는 되돌릴 수 없습니다.
        </span>
        <div className='flex gap-[1rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleCloseModal}
            className='w-[12.4rem]'
          >
            취소
          </Button>
          <Button
            variant='cta'
            buttonStyle='active'
            handleClickButton={handleConfirmDelete}
            className='w-[12.4rem]'
          >
            삭제
          </Button>
        </div>
      </div>
    </Overlay>
  );
}
