import { z } from 'zod';

import type { AvailableDate } from '@type/available-date';
import {
  ESTIMATE_ERROR_MESSAGE,
  ESTIMATE_MAX_LENGTH,
} from '@pages/@owner/estimate/constants/estimate';
import {
  NEED_ELECTRICITY,
  type NeedElectricityKey,
} from '@constant/need-electricity';

export const estimateSchema = z.object({
  location: z
    .string()
    .min(ESTIMATE_MAX_LENGTH.location.min, ESTIMATE_ERROR_MESSAGE.location.min)
    .max(ESTIMATE_MAX_LENGTH.location.max, ESTIMATE_ERROR_MESSAGE.location.max),
  detailLocation: z.string().optional(),
  availableDates: z
    .array(z.custom<AvailableDate>())
    .min(
      ESTIMATE_MAX_LENGTH.availableDates.min,
      ESTIMATE_ERROR_MESSAGE.availableDates.min
    )
    .max(
      ESTIMATE_MAX_LENGTH.availableDates.max,
      ESTIMATE_ERROR_MESSAGE.availableDates.max
    ),
  activeTime: z.object({
    startActiveTime: z.string(),
    endActiveTime: z.string(),
  }),
  menu: z
    .string()
    .min(ESTIMATE_MAX_LENGTH.menu.min, ESTIMATE_ERROR_MESSAGE.menu.required)
    .max(ESTIMATE_MAX_LENGTH.menu.max, ESTIMATE_ERROR_MESSAGE.menu.max),
  price: z
    .number()
    .refine(val => val > 0, ESTIMATE_ERROR_MESSAGE.price.required),
  needElectricity: z.enum(
    Object.keys(NEED_ELECTRICITY) as [
      NeedElectricityKey,
      ...NeedElectricityKey[],
    ]
  ),
  etc: z
    .string()
    .max(ESTIMATE_MAX_LENGTH.etc.max, ESTIMATE_ERROR_MESSAGE.etc.max),
});

export type EstimateFormData = z.infer<typeof estimateSchema>;
