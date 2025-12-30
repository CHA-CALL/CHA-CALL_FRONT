import ConfirmModal from '@components/ui/modal-confirm/ConfirmModal';
import type { AccountFormData } from '@pages/@owner/account/schemas/account.schema';

interface ModalHandler {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
}

interface AccountPageModalsProps {
  formData: AccountFormData;
  exitModal: ModalHandler;
  saveModal: ModalHandler;
  deleteModal: ModalHandler;
}

export default function AccountModals({
  formData,
  exitModal,
  saveModal,
  deleteModal,
}: AccountPageModalsProps) {
  return (
    <>
      {/* 이탈 방지 모달*/}
      <ConfirmModal
        isOpen={exitModal.isOpen}
        handleClose={exitModal.handleClose}
        title={'정말 나가시겠어요?'}
        description={`작성 중인 내용은 저장되지 않으며,\n나가면 모두 삭제됩니다.`}
        leftLabel='나가기'
        rightLabel='취소'
        handleClickLeft={exitModal.handleConfirm}
        handleClickRight={exitModal.handleCancel}
      />
      {/* 저장 전 확인 모달 */}
      <ConfirmModal
        isOpen={saveModal.isOpen}
        handleClose={saveModal.handleClose}
        title='저장정보 확인'
        description={
          <>
            <div className='bg-grayscale-100 my-[1rem] h-[0.1rem] w-full' />
            <div className='flex flex-col gap-[1rem]'>
              <div className='flex items-center justify-between'>
                <p className='title-sb-12 text-grayscale-500'>은행</p>
                <p className='caption-m-12 text-grayscale-900'>
                  {formData.bankName}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='title-sb-12 text-grayscale-500'>예금주</p>
                <p className='caption-m-12 text-grayscale-900'>
                  {formData.accountHolderName}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <p className='title-sb-12 text-grayscale-500'>계좌번호</p>
                <p className='caption-m-12 text-grayscale-900'>
                  {formData.accountNumber}
                </p>
              </div>
            </div>
          </>
        }
        rightLabel='저장'
        handleClickRight={saveModal.handleConfirm}
        handleClickLeft={saveModal.handleCancel}
      />
      {/* 계좌 삭제 재확인 모달 */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        handleClose={deleteModal.handleClose}
        title='이 계좌를 삭제할까요?'
        description='삭제 후에는 되돌릴 수 없습니다.'
        rightLabel='삭제'
        handleClickRight={deleteModal.handleConfirm}
        handleClickLeft={deleteModal.handleCancel}
      />
    </>
  );
}
