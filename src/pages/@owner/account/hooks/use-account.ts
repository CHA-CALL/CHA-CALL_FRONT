import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BANK, type Bank } from '@pages/@owner/account/constants/bank';
import { ERROR_MESSAGE } from '@pages/@owner/account/constants/account-schema';
import { formatAccountNumber } from '@pages/@owner/account/utils/format-account-number';

const accountSchema = z.object({
  bankName: z.enum([...BANK], {
    message: ERROR_MESSAGE.bank,
  }),
  accountHolderName: z
    .string()
    .min(1, ERROR_MESSAGE.name)
    .max(15, ERROR_MESSAGE.nameMax),
  accountNumber: z
    .string()
    .min(1, ERROR_MESSAGE.accountNumber)
    .max(16, ERROR_MESSAGE.accountNumberMax),
});

export type AccountFormData = z.infer<typeof accountSchema>;

export const useAccount = () => {
  const {
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
    watch,
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountHolderName: '',
      accountNumber: '',
    },
    mode: 'onChange',
  });

  const formData = watch();

  const updateName = (name: string) => {
    setValue('accountHolderName', name, { shouldValidate: true });
  };

  const updateBank = (bank: Bank) => {
    setValue('bankName', bank, { shouldValidate: true });
  };

  const updateAccountNumber = (accountNumber: string) => {
    const numbersOnly = accountNumber.replace(/\D/g, '');
    setValue('accountNumber', numbersOnly, { shouldValidate: true });
  };

  const compatibleFormData = {
    accountHolderName: formData.accountHolderName,
    bankName: formData.bankName,
    accountNumber: formData.accountNumber,
  };

  const compatibleErrors = {
    accountHolderName: errors.accountHolderName?.message,
    bankName: errors.bankName?.message,
    accountNumber: errors.accountNumber?.message,
  };

  return {
    formData: compatibleFormData,
    errors: compatibleErrors,
    reset,
    updateName,
    updateBank,
    updateAccountNumber,
    formatAccountNumber,
    handleSubmit,
    isFormValid: isValid,
    trigger,
  };
};
