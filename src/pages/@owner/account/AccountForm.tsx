import Button from '@shared/components/button/Button';
import Information from '@shared/components/information/Information';
import Navigation from '@shared/components/navigation/Navigation';
import { useState, useEffect } from 'react';
import { BANK, type Bank } from '@pages/@owner/account/constants/bank';
import { useAccount } from '@pages/@owner/account/hooks/use-account';
import Input from '@shared/components/input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@shared/components/icon/Icon';
import SelectBankBottomSheet from '@pages/@owner/account/@modal/(.)select-bank-bottom-sheet/SelectBankBottomSheet';
import { cn } from '@shared/utils/cn';
import ErrorText from '@shared/components/error-text/ErrorText';
import ConfirmExitModal from '@pages/@owner/account/@modal/(.)confirm-exit-modal/ConfirmExitModal';
import { ROUTES } from '@router/constant/routes';
import SaveAccountModal from '@pages/@owner/account/@modal/(.)save-account-modal/SaveAccountModal';
import {
  usePostNewAccount,
  useFetchAccountData,
  useUpdateAccount,
} from '@pages/@owner/account/hooks/use-account-query';
import Loading from '@shared/components/loading/Loading';
import useToast from '@shared/hooks/use-toast';

export default function Account() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const toast = useToast();
  const { data: existedData, isPending } = useFetchAccountData();
  const { mutate: registerAccount, isPending: isRegistering } =
    usePostNewAccount({
      onSuccess: () => {
        setIsSaveOpen(false);
        toast.success('저장이 완료되었습니다.');
        navigate(ROUTES.ACCOUNT);
      },
      onError: () => {
        toast.error('저장에 실패했습니다.');
      },
    });

  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount({
    onSuccess: () => {
      setIsSaveOpen(false);
      toast.success('저장이 완료되었습니다.');
      navigate(ROUTES.ACCOUNT);
    },
    onError: () => {
      toast.error('저장에 실패했습니다.');
    },
  });

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
  } = useAccount();

  const handleUpdateBank = (option: Bank) => {
    updateBank(option);
    setIsSelectBankOpen(false);
  };

  const handleClickBack = () => {
    // 폼에 수정사항이 있는지 확인
    const hasChanges =
      existedData?.accountHolderName !== formData.accountHolderName ||
      existedData?.bankName !== formData.bankName ||
      existedData?.accountNumber !== formData.accountNumber;

    if (hasChanges) {
      setIsConfirmOpen(true);
    } else {
      navigate(ROUTES.ACCOUNT);
    }
  };

  const handleClickSelectBank = () => {
    setIsSelectBankOpen(true);
  };

  const handleCloseSelectBank = () => {
    setIsSelectBankOpen(false);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    navigate(ROUTES.ACCOUNT);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const handleCloseSave = () => {
    setIsSaveOpen(false);
  };

  const onValid = () => {
    setIsSaveOpen(true);
  };

  const handleConfirmSave = () => {
    if (isEditMode) {
      updateAccount({
        data: formData,
        accountId: Number(id),
      });
    } else {
      registerAccount({ data: formData });
    }
  };

  const handleCancelSave = () => {
    setIsSaveOpen(false);
  };

  const handleClickReset = () => {
    reset();
  };

  const isValidBank = (name: string): name is Bank => {
    for (const b of BANK) {
      if (b === name) return true;
    }
    return false;
  };

  // 수정 모드일 때 계좌 정보 가져오기
  useEffect(() => {
    if (isEditMode && existedData) {
      if (
        existedData.accountHolderName &&
        existedData.accountNumber &&
        existedData.bankName &&
        isValidBank(existedData.bankName)
      ) {
        updateBank(existedData.bankName ?? '은행을 선택해주세요');
        updateName(existedData.accountHolderName ?? '');
        updateAccountNumber(existedData.accountNumber ?? '');
      } else {
        console.error('기존 데이터가 유효하지 않습니다.');
      }
    }
  }, [isEditMode, existedData]);

  if (isPending || isRegistering || isUpdating) {
    return <Loading />;
  }

  return (
    <form onSubmit={e => void handleSubmit(onValid)(e)}>
      <SelectBankBottomSheet
        isOpen={isSelectBankOpen}
        handleClose={handleCloseSelectBank}
        handleChange={handleUpdateBank}
        bank={formData.bankName}
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
      <div className='flex flex-1 flex-col gap-[0.3rem] overflow-y-auto p-[2rem]'>
        <Information
          iconId='ic_error'
          text='거래가 진행 될 계좌이므로, 꼼꼼한 확인이 필요해요! '
        />
        <section className='flex flex-col gap-[2rem]'>
          <div className='flex flex-col gap-[1rem] pt-[1rem]'>
            <p className='text-grayscale-900 title-sb-12'>은행</p>
            <button
              type='button'
              onClick={handleClickSelectBank}
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
