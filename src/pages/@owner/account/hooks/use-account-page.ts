import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAccount } from '@pages/@owner/account/hooks/use-account';
import {
  usePostNewAccount,
  useFetchAccountData,
  useUpdateAccount,
} from '@pages/@owner/account/hooks/use-account-query';
import { type Bank, BANK } from '@pages/@owner/account/constants/bank';
import { ROUTES } from '@router/constant/routes';
import useToast from '@shared/hooks/use-toast';

export const useAccountPage = () => {
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

  // 수정 모드 데이터 세팅
  useEffect(() => {
    if (!isEditMode || !existedData) return;
    const { accountHolderName, accountNumber, bankName } = existedData;
    if (
      accountHolderName &&
      accountNumber &&
      bankName &&
      isValidBank(bankName)
    ) {
      reset({ accountHolderName, accountNumber, bankName });
    } else {
      console.error('기존 데이터가 유효하지 않습니다.');
    }
  }, [isEditMode, existedData, reset]);

  const isLoading = isPending || isRegistering || isUpdating;

  return {
    isEditMode,
    isLoading,
    handleClickBack,
    form: {
      formData,
      errors,
      isFormValid,
      updateName,
      updateAccountNumber,
      formatAccountNumber,
      handleSubmit,
      onValid,
      handleClickReset,
    },
    bankModal: {
      isOpen: isSelectBankOpen,
      handleClose: handleCloseSelectBank,
      handleChange: handleUpdateBank,
      handleClick: handleClickSelectBank,
    },
    exitModal: {
      isOpen: isConfirmOpen,
      handleClose: handleCloseConfirm,
      handleConfirm: handleConfirm,
      handleCancel: handleCancel,
    },
    saveModal: {
      isOpen: isSaveOpen,
      handleClose: handleCloseSave,
      handleConfirm: handleConfirmSave,
      handleCancel: handleCancelSave,
    },
  };
};
