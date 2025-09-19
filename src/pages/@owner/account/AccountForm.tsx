import Button from '@shared/components/button/Button';
import Information from '@shared/components/information/Information';
import Navigation from '@shared/components/navigation/Navigation';
import { useState, useEffect } from 'react';
import { type Bank } from '@pages/@owner/account/constants/bank';
import { useAccount } from '@pages/@owner/account/hooks/useAccount';
import SearchBar from '@shared/components/search-bar/SearchBar';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@shared/components/icon/Icon';
import SelectBankModal from '@pages/@owner/account/@modal/(.)select-bank-modal/SelectBankModal';
import { cn } from '@shared/utils/cn';
import ErrorText from '@shared/components/error-text/ErrorText';
import ConfirmModal from '@pages/@owner/account/@modal/(.)confirm-modal/ConfirmModal';
import { ROUTES } from '@router/constant/routes';

export default function Account() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [isSelectBankOpen, setIsSelectBankOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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

  const handleChange = (option: Bank) => {
    updateBank(option);
    setIsSelectBankOpen(false);
  };

  const handleClickBack = () => {
    navigate(-1);
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
      setIsConfirmOpen(true);
    }
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    //TODO: 계좌 등록 제출
    handleSubmit();
    navigate(ROUTES.ACCOUNT);
  };
  const handleCancel = () => {
    setIsConfirmOpen(false);
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
      <SelectBankModal
        isOpen={isSelectBankOpen}
        handleClose={handleCloseSelectBank}
        handleChange={handleChange}
        bank={formData.bank as Bank}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        handleClose={handleCloseConfirm}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
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
      <div className='flex min-h-[calc(100vh-5.2rem)] flex-col gap-[0.3rem] p-[2rem]'>
        <Information
          iconId='ic_error'
          text='거래가 진행 될 계좌이므로, 꼼꼼한 확인이 필요해요! '
        />
        <section className='flex flex-col gap-[2rem]'>
          <div className='flex flex-col gap-[1rem] pt-[1rem]'>
            <p className='title-sb-12 text-gray-900'>은행</p>
            <button
              onClick={handleClickSelectBank}
              className='border-grayscale-200 flex w-full items-center justify-between rounded-[1.6rem] border bg-white py-[1.5rem] pl-[2rem] pr-[1.6rem] text-left'
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
            <p className='title-sb-12 text-gray-900'>예금주</p>
            <SearchBar
              value={formData.name}
              placeholder='예금주를 입력해주세요.'
              onChange={e => updateName(e.target.value)}
            />
            {errors.name && <ErrorText text={errors.name} />}
          </div>
          <div className='flex flex-col gap-[1rem]'>
            <p className='title-sb-12 text-gray-900'>계좌번호</p>
            <SearchBar
              placeholder='계좌번호를 입력해주세요.'
              value={formatAccountNumber(formData.accountNumber)}
              onChange={e => updateAccountNumber(e.target.value)}
              maxLength={14}
            />
            {errors.accountNumber && <ErrorText text={errors.accountNumber} />}
          </div>
        </section>
      </div>
      <footer className='sticky bottom-[1.7rem] left-0 right-0 w-full bg-white px-[2rem]'>
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
