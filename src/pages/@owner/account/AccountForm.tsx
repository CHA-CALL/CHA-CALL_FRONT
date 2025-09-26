import Button from '@shared/components/button/Button';
import Information from '@shared/components/information/Information';
import Navigation from '@shared/components/navigation/Navigation';
import { useState, useEffect } from 'react';
import { type Bank } from '@pages/@owner/account/constants/bank';
import { useAccount } from '@pages/@owner/account/hooks/useAccount';
import Input from '@shared/components/input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@shared/components/icon/Icon';
import SelectBankBottomSheet from '@pages/@owner/account/@modal/(.)select-bank-bottom-sheet/SelectBankBottomSheet';
import { cn } from '@shared/utils/cn';
import ErrorText from '@shared/components/error-text/ErrorText';
import ConfirmExitModal from '@pages/@owner/account/@modal/(.)confirm-exit-modal/ConfirmExitModal';
import { ROUTES } from '@router/constant/routes';
import SaveAccountModal from '@pages/@owner/account/@modal/(.)save-account-modal/SaveAccountModal';

export default function Account() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [isSelectBankOpen, setIsSelectBankOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);

  const {
    formData,
    errors,
    reset,
    updateName,
    updateBank,
    updateAccountNumber,
    formatAccountNumber,
    handleSubmit,
    isFormValid,
    trigger,
  } = useAccount();

  const handleUpdateBank = (option: Bank) => {
    updateBank(option);
    setIsSelectBankOpen(false);
  };

  const handleClickBack = () => {
    // 폼에 수정사항이 있는지 확인
    const hasChanges = formData.name || formData.bank || formData.accountNumber;

    if (hasChanges) {
      setIsConfirmOpen(true);
    } else {
      navigate(-1);
    }
  };

  const handleClickSelectBank = () => {
    setIsSelectBankOpen(true);
  };

  const handleCloseSelectBank = () => {
    setIsSelectBankOpen(false);
  };

  const handleSubmitButton = () => {
    trigger();
    if (isFormValid) {
      setIsSaveOpen(true);
    }
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    navigate(-1);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const handleCloseSave = () => {
    setIsSaveOpen(false);
  };

  const handleConfirmSave = () => {
    setIsSaveOpen(false);
    //TODO: 계좌 등록 제출
    handleSubmit();
    navigate(ROUTES.ACCOUNT);
  };

  const handleCancelSave = () => {
    setIsSaveOpen(false);
  };

  const handleClickReset = () => {
    reset();
  };

  // TODO: 수정 모드일 때 API로 계좌 정보를 가져와서 폼에 초기값으로 설정
  const fetchAccountData = async (accountId: string) => {
    // TODO: 받아온 데이터로 폼 초기값 설정
    if (accountId) {
      return;
    }
    // updateBank(accountData.bank);
    // updateName(accountData.name);
    // updateAccountNumber(accountData.accountNumber);
  };

  // 수정 모드일 때 계좌 정보 가져오기
  useEffect(() => {
    if (isEditMode && id) {
      fetchAccountData(id);
    }
  }, [isEditMode, id]);

  return (
    <>
      <SelectBankBottomSheet
        isOpen={isSelectBankOpen}
        handleClose={handleCloseSelectBank}
        handleChange={handleUpdateBank}
        bank={formData.bank as Bank}
      />
      <ConfirmExitModal
        isOpen={isConfirmOpen}
        handleClose={handleCloseConfirm}
        handleClickConfirm={handleConfirm}
        handleClickCancel={handleCancel}
      />
      <SaveAccountModal
        isOpen={isSaveOpen}
        handleClose={handleCloseSave}
        handleConfirm={handleConfirmSave}
        handleCancel={handleCancelSave}
        formData={formData}
      />

      <Navigation
        text={isEditMode ? '계좌 수정' : '계좌 등록'}
        handleLeftClick={handleClickBack}
        leftIcon={<Icon name='ic_back' />}
        rightIcon={
          <Button
            variant='default'
            buttonStyle='edit'
            children='초기화'
            handleClickButton={handleClickReset}
          />
        }
      />
      <div className='flex flex-1 flex-col gap-[0.3rem] overflow-y-auto p-[2rem] pt-[6.8rem]'>
        <Information
          iconId='ic_error'
          text='거래가 진행 될 계좌이므로, 꼼꼼한 확인이 필요해요! '
        />
        <section className='flex flex-col gap-[2rem]'>
          <div className='flex flex-col gap-[1rem] pt-[1rem]'>
            <p className='text-gray-900 title-sb-12'>은행</p>
            <button
              onClick={handleClickSelectBank}
              className='flex w-full items-center justify-between rounded-[1.6rem] border border-grayscale-200 bg-white py-[1.5rem] pl-[2rem] pr-[1.6rem] text-left'
            >
              <p
                className={cn(
                  'body-m-14',
                  formData.bank ? 'text-grayscale-700' : 'text-grayscale-300'
                )}
              >
                {formData.bank || '옵션을 선택해주세요.'}
              </p>
              <Icon name='ic_down' className='text-gray-500' />
            </button>
            {errors.bank && <ErrorText text={errors.bank} />}
          </div>
          <div className='flex flex-col gap-[1rem]'>
            <p className='text-gray-900 title-sb-12'>예금주</p>
            <Input
              value={formData.name}
              placeholder='예금주를 입력해주세요.'
              onChange={e => updateName(e.target.value)}
              maxLength={15}
            />
            {errors.name && <ErrorText text={errors.name} />}
          </div>
          <div className='flex flex-col gap-[1rem]'>
            <p className='text-gray-900 title-sb-12'>계좌번호</p>
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
          variant='cta'
          buttonStyle={isFormValid ? 'active' : 'disabled'}
          children='저장하기'
          disabled={!isFormValid}
          handleClickButton={handleSubmitButton}
        />
      </footer>
    </>
  );
}
