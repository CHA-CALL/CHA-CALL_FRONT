import z from 'zod';
import type { RegionResponse } from 'apis/data-contracts';

import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '@pages/@owner/food-truck-form/constants/food-truck';

import type { AvailableDate } from '@type/available-date';
import { validateFoodTruckFormTime } from '@pages/@owner/food-truck-form/utils/validate-food-truck-form-time';
import { NEED_ELECTRICITY } from '@constant/need-electricity';
import { PAYMENT_METHOD } from '@constant/payment-method';
import { AVAILABLE_QUANTITY } from '@constant/available-quantity';
import { FOOD_CATEGORIES } from '@constant/food-categories';

export const foodTruckSchema = z.object({
  name: z
    .string()
    .min(FOOD_TRUCK_MAX_LENGTH.name.min, FOOD_TRUCK_ERROR_MESSAGE.name.required)
    .max(FOOD_TRUCK_MAX_LENGTH.name.max, FOOD_TRUCK_ERROR_MESSAGE.name.max),
  isNameChecked: z.boolean(),
  isNameDuplicated: z.boolean().refine(v => v === false),
  description: z
    .string()
    .min(
      FOOD_TRUCK_MAX_LENGTH.description.min,
      FOOD_TRUCK_ERROR_MESSAGE.description.required
    )
    .max(
      FOOD_TRUCK_MAX_LENGTH.description.max,
      FOOD_TRUCK_ERROR_MESSAGE.description.max
    ),
  timeDiscussRequired: z.boolean(),
  activeTime: z.string().superRefine(validateFoodTruckFormTime),
  phoneNumber: z
    .string()
    .min(
      FOOD_TRUCK_MAX_LENGTH.phoneNumber.min,
      FOOD_TRUCK_ERROR_MESSAGE.phoneNumber.required
    ),
  regionCodes: z.array(z.custom<RegionResponse>()),
  availableQuantity: z.nativeEnum(AVAILABLE_QUANTITY),
  needElectricity: z.nativeEnum(NEED_ELECTRICITY),
  paymentMethod: z.nativeEnum(PAYMENT_METHOD),
  menuCategories: z.array(z.nativeEnum(FOOD_CATEGORIES)),
  photoUrls: z.array(z.string()).min(1, {
    message: FOOD_TRUCK_ERROR_MESSAGE.photoUrls.required,
  }),
  operatingInfo: z
    .string()
    .max(
      FOOD_TRUCK_MAX_LENGTH.operationalInformation.max,
      FOOD_TRUCK_ERROR_MESSAGE.operationalInformation.max
    )
    .optional(),
  option: z
    .string()
    .max(FOOD_TRUCK_MAX_LENGTH.etc.max, FOOD_TRUCK_ERROR_MESSAGE.etc.max)
    .optional(),
  availableDates: z
    .array(z.custom<AvailableDate>())
    .min(
      FOOD_TRUCK_MAX_LENGTH.availableDates.min,
      FOOD_TRUCK_ERROR_MESSAGE.availableDates.min
    )
    .max(
      FOOD_TRUCK_MAX_LENGTH.availableDates.max,
      FOOD_TRUCK_ERROR_MESSAGE.availableDates.max
    ),
  menus: z.boolean().refine(menus => menus, {
    message: FOOD_TRUCK_ERROR_MESSAGE.menus.required,
  }),
});

export type FoodTruckFormData = z.infer<typeof foodTruckSchema>;
