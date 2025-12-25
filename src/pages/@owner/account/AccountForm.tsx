import Information from '@components/information/Information';
import FormFieldLayout from '@components/layout/form/FormFieldLayout';
import ConfirmModal from '@components/ui/modal-confirm/ConfirmModal';
import ErrorText from '@form/error-text/ErrorText';
import { Icon } from '@icon/Icon';
import Loading from '@layout/loading/Loading';
import Navigation from '@layout/navigation/Navigation';
import SelectBankBottomSheet from '@pages/@owner/account/@bottom-sheet/SelectBankBottomSheet';
import { useAccountPage } from '@pages/@owner/account/hooks/use-account-page';
import Button from '@ui/button/Button';
import Input from '@ui/input/Input';
import { cn } from '@utils/cn';

export default function Account() {
  const {
    isEditMode,
    isLoading,
    form,
    handleClickBack,
    handleClickDelete,
    bankModal,
    exitModal,
    saveModal,
    deleteModal,
  } = useAccountPage();

  const {
    formData,
    errors,
    isFormValid,
    updateName,
    updateAccountNumber,
    formatAccountNumber,
    handleSubmit,
    onValid,
  } = form;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={e => void handleSubmit(onValid)(e)}>
      <SelectBankBottomSheet
        isOpen={bankModal.isOpen}
        handleClose={bankModal.handleClose}
        handleChange={bankModal.handleChange}
        bank={formData.bankName}
      />
      {/* 이탈 방지 모달 */}
      <ConfirmModal
        isOpen={exitModal.isOpen}
        handleClose={exitModal.handleClose}
        title={'정말 나가시겠어요?'}
        description={`작성 중인 내용은 저장되지 않으며,\n나가면 모두 삭제됩니다.`}
        confirmLabel='나가기'
        handleConfirm={exitModal.handleConfirm}
        handleCancel={exitModal.handleCancel}
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
        confirmLabel='저장'
        handleConfirm={saveModal.handleConfirm}
        handleCancel={saveModal.handleCancel}
      />
      {/* 계좌 삭제 재확인 모달 */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        handleClose={deleteModal.handleClose}
        title='이 계좌를 삭제할까요?'
        description='삭제 후에는 되돌릴 수 없습니다.'
        confirmLabel='삭제'
        handleConfirm={deleteModal.handleConfirm}
        handleCancel={deleteModal.handleCancel}
      />
      <Navigation
        centerContent={isEditMode ? '계좌 수정' : '계좌 등록'}
        handleLeftClick={handleClickBack}
        leftIcon={<Icon name='ic_back' />}
        rightIcon={
          <Button
            variant='default'
            buttonStyle='edit'
            className='px-[2rem]'
            children='삭제'
            handleClickButton={handleClickDelete}
          />
        }
      />
      <div className='flex flex-1 flex-col gap-[0.3rem] overflow-y-auto p-[2rem]'>
        <Information
          iconId='ic_error'
          text='거래가 진행 될 계좌이므로, 꼼꼼한 확인이 필요해요!'
        />
        <section className='flex flex-col gap-[2rem] pt-[2.6rem]'>
          <FormFieldLayout isRequired={true} title='은행'>
            <div className='flex flex-col gap-[1rem]'>
              <button
                type='button'
                onClick={bankModal.handleClick}
                className='border-grayscale-200 flex w-full items-center justify-between rounded-[1.6rem] border bg-white py-[1.5rem] pl-[2rem] pr-[1.6rem] text-left'
              >
                <p
                  className={cn(
                    'body-m-14',
                    formData.bankName
                      ? 'text-grayscale-700'
                      : 'text-grayscale-300'
                  )}
                >
                  {formData.bankName || '옵션을 선택해주세요.'}
                </p>
                <Icon name='ic_down' className='text-grayscale-500' />
              </button>
              {errors.bankName && <ErrorText text={errors.bankName} />}
            </div>
          </FormFieldLayout>

          <FormFieldLayout isRequired={true} title='예금주'>
            <div className='flex flex-col gap-[1rem]'>
              <Input
                value={formData.accountHolderName}
                placeholder='예금주를 입력해주세요.'
                onChange={e => updateName(e.target.value)}
                maxLength={15}
              />
              {errors.accountHolderName && (
                <ErrorText text={errors.accountHolderName} />
              )}
            </div>
          </FormFieldLayout>

          <FormFieldLayout isRequired={true} title='계좌번호'>
            <div className='flex flex-col gap-[1rem]'>
              <Input
                value={formatAccountNumber(formData.accountNumber)}
                placeholder='계좌번호를 입력해주세요.'
                onChange={e => updateAccountNumber(e.target.value)}
                maxLength={16}
              />
              {errors.accountNumber && (
                <ErrorText text={errors.accountNumber} />
              )}
            </div>
          </FormFieldLayout>
        </section>
      </div>
      <footer className='fixed-center bottom-[0] bg-white px-[2rem] py-[1.7rem]'>
        <Button
          type='submit'
          variant='cta'
          buttonStyle={isFormValid ? 'active' : 'disabled'}
          children='저장하기'
          disabled={!isFormValid}
        />
      </footer>
    </form>
  );
}
