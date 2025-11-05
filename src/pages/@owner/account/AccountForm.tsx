import Button from '@ui/button/Button';
import Information from '@components/information/Information';
import Navigation from '@layout/navigation/Navigation';
import Input from '@ui/input/Input';
import { Icon } from '@icon/Icon';
import SelectBankBottomSheet from '@pages/@owner/account/@modal/(.)select-bank-bottom-sheet/SelectBankBottomSheet';
import { cn } from '@utils/cn';
import ErrorText from '@form/error-text/ErrorText';
import ConfirmExitModal from '@pages/@owner/account/@modal/(.)confirm-exit-modal/ConfirmExitModal';
import SaveAccountModal from '@pages/@owner/account/@modal/(.)save-account-modal/SaveAccountModal';
import Loading from '@layout/loading/Loading';
import { useAccountPage } from '@pages/@owner/account/hooks/use-account-page';
import ConfirmDeleteModal from '@pages/@owner/account/@modal/(.)confirm-delete-modal/ConfirmDeleteModal';

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
      <ConfirmExitModal
        isOpen={exitModal.isOpen}
        handleClose={exitModal.handleClose}
        handleClickConfirm={exitModal.handleConfirm}
        handleClickCancel={exitModal.handleCancel}
      />
      <SaveAccountModal
        isOpen={saveModal.isOpen}
        handleClose={saveModal.handleClose}
        handleConfirm={saveModal.handleConfirm}
        handleCancel={saveModal.handleCancel}
        formData={formData}
      />
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        handleClose={deleteModal.handleClose}
        handleClickConfirm={deleteModal.handleConfirm}
        handleClickCancel={deleteModal.handleCancel}
      />
      <Navigation
        text={isEditMode ? '계좌 수정' : '계좌 등록'}
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
        <section className='flex flex-col gap-[2rem]'>
          <div className='flex flex-col gap-[1rem] pt-[1rem]'>
            <p className='text-grayscale-900 title-sb-12'>은행</p>
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
          <div className='flex flex-col gap-[1rem]'>
            <p className='text-grayscale-900 title-sb-12'>예금주</p>
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
          <div className='flex flex-col gap-[1rem]'>
            <p className='text-grayscale-900 title-sb-12'>계좌번호</p>
            <Input
              placeholder='계좌번호를 입력해주세요.'
              value={formatAccountNumber(formData.accountNumber)}
              onChange={e => updateAccountNumber(e.target.value)}
              maxLength={16}
            />
            {errors.accountNumber && <ErrorText text={errors.accountNumber} />}
          </div>
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
