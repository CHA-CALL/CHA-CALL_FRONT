import { z } from 'zod';

import type { AvailableDate } from '@type/available-date';
import {
  ESTIMATE_ERROR_MESSAGE,
  ESTIMATE_MAX_LENGTH,
} from '@pages/@owner/estimate/constants/estimate';

export const estimateSchema = z.object({
  location: z
    .string()
    .min(ESTIMATE_MAX_LENGTH.location.min, ESTIMATE_ERROR_MESSAGE.location.min)
    .max(ESTIMATE_MAX_LENGTH.location.max, ESTIMATE_ERROR_MESSAGE.location.max),
  detailLocation: z
    .string()
    .min(
      ESTIMATE_MAX_LENGTH.detailLocation.min,
      ESTIMATE_ERROR_MESSAGE.detailLocation.min
    ),
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
  activeTime: z.string(),
  food: z
    .string()
    .min(ESTIMATE_MAX_LENGTH.food.min, ESTIMATE_ERROR_MESSAGE.food.required)
    .max(ESTIMATE_MAX_LENGTH.food.max, ESTIMATE_ERROR_MESSAGE.food.max),
  price: z
    .number()
    .refine(val => val > 0, ESTIMATE_ERROR_MESSAGE.price.required),
  needElectricity: z.boolean(),
  etc: z
    .string()
    .max(ESTIMATE_MAX_LENGTH.etc.max, ESTIMATE_ERROR_MESSAGE.etc.max),
});

export type EstimateFormData = z.infer<typeof estimateSchema>;
