import { ERROR_MESSAGE } from '@pages/@owner/account/constants/error';
import { z } from 'zod';
import { BANK } from '@pages/@owner/account/constants/bank';

export const accountSchema = z.object({
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
