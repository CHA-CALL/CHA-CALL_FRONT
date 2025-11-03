import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAccount } from '@pages/@owner/account/hooks/use-account';
import {
  usePostNewAccount,
  useFetchAccountData,
  useUpdateAccount,
  useDeleteAccount,
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
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const [isSelectBankOpen, setIsSelectBankOpen] = useState(false);
  const [isConfirmExitOpen, setIsConfirmExitOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
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

  // 은행 선택 옵션 핸들러
  const handleUpdateBank = (option: Bank) => {
    updateBank(option);
    setIsSelectBankOpen(false);
  };

  const handleClickBack = () => {
    const isDirty = Boolean(
      formData.accountHolderName || formData.accountNumber || formData.bankName
    );
    const hasChanges = isEditMode
      ? existedData &&
        (existedData.accountHolderName !== formData.accountHolderName ||
          existedData.bankName !== formData.bankName ||
          existedData.accountNumber !== formData.accountNumber)
      : isDirty;

    if (hasChanges) {
      setIsConfirmExitOpen(true);
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

  // 수정 중 뒤로가기 모달 핸들러
  const handleCloseConfirmExit = () => {
    setIsConfirmExitOpen(false);
  };

  const handleConfirmExit = () => {
    setIsConfirmExitOpen(false);
    navigate(ROUTES.ACCOUNT);
  };

  const handleCancelExit = () => {
    setIsConfirmExitOpen(false);
  };

  // 저장하기 모달 핸들러
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

  // 삭제 모달 핸들러
  const handleClickDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteAccount({ accountId: Number(id) });
    setIsConfirmDeleteOpen(false);
    navigate(ROUTES.ACCOUNT);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
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

  const isLoading = isPending || isRegistering || isUpdating || isDeleting;

  return {
    isEditMode,
    isLoading,
    handleClickBack,
    handleClickDelete,
    form: {
      formData,
      errors,
      isFormValid,
      updateName,
      updateAccountNumber,
      formatAccountNumber,
      handleSubmit,
      onValid,
    },
    bankModal: {
      isOpen: isSelectBankOpen,
      handleClose: handleCloseSelectBank,
      handleChange: handleUpdateBank,
      handleClick: handleClickSelectBank,
    },
    exitModal: {
      isOpen: isConfirmExitOpen,
      handleClose: handleCloseConfirmExit,
      handleConfirm: handleConfirmExit,
      handleCancel: handleCancelExit,
    },
    deleteModal: {
      isOpen: isConfirmDeleteOpen,
      handleClose: handleCloseConfirmDelete,
      handleConfirm: handleConfirmDelete,
      handleCancel: handleCancelDelete,
    },
    saveModal: {
      isOpen: isSaveOpen,
      handleClose: handleCloseSave,
      handleConfirm: handleConfirmSave,
      handleCancel: handleCancelSave,
    },
  };
};
