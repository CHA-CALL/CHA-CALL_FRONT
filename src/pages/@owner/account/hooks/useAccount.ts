import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BANK, type Bank } from '@pages/@owner/account/constants/bank';
import { ERROR_MESSAGE } from '@pages/@owner/account/constants/account-schema';
import { formatAccountNumber } from '@pages/@owner/account/utils/format-account-number';

const accountSchema = z.object({
  bank: z
    .string()
    .min(1, ERROR_MESSAGE.bank)
    .refine(bank => Object.values(BANK).includes(bank as Bank), {
      message: ERROR_MESSAGE.bank,
    }),
  name: z.string().min(1, ERROR_MESSAGE.name).max(15, ERROR_MESSAGE.nameMax),
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
      name: '',
      accountNumber: '',
      bank: '',
    },
    mode: 'onChange',
  });

  const formData = watch();

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
  };

  const updateBank = (bank: Bank) => {
    setValue('bank', bank, { shouldValidate: true });
  };

  const updateAccountNumber = (accountNumber: string) => {
    const numbersOnly = accountNumber.replace(/\D/g, '');
    console.log(numbersOnly);
    setValue('accountNumber', numbersOnly, { shouldValidate: true });
  };

  const onSubmit = async (formData: AccountFormData) => {
    //TODO: 계좌 등록 제출
    if (isValid && formData) {
      alert('계좌 등록 제출');
    }
  };

  const compatibleFormData = {
    name: formData.name,
    bank: formData.bank,
    accountNumber: formData.accountNumber,
  };

  const compatibleErrors = {
    name: errors.name?.message,
    bank: errors.bank?.message,
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
    handleSubmit: handleSubmit(onSubmit),
    isFormValid: isValid,
    trigger,
  };
};
