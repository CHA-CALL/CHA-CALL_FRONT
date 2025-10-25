import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '@pages/@owner/food-truck-form/constants/food-truck';

import { AVAILABLE_QUANTITY } from '@shared/constant/available-quantity';
import { NEED_ELECTRICITY } from '@shared/constant/need-electricity';
import { PAYMENT_METHOD } from '@shared/constant/payment-method';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import { useTime } from '@pages/@owner/food-truck-form/hooks/use-time';
import { useCategories } from '@pages/@owner/food-truck-form/hooks/use-categories';
import { useMenuInfo } from '@pages/@owner/food-truck-form/hooks/use-menu-info';
import { useRegion } from '@pages/@owner/food-truck-form/hooks/use-region';
import type { AvailableDate } from '../types/available-date';
import { FOOD_CATEGORIES } from '@shared/constant/food-categories';
const foodTruckSchema = z.object({
  name: z
    .string()
    .min(FOOD_TRUCK_MAX_LENGTH.name.min, FOOD_TRUCK_ERROR_MESSAGE.name.required)
    .max(FOOD_TRUCK_MAX_LENGTH.name.max),
  description: z
    .string()
    .min(
      FOOD_TRUCK_MAX_LENGTH.description.min,
      FOOD_TRUCK_ERROR_MESSAGE.description.required
    )
    .max(FOOD_TRUCK_MAX_LENGTH.description.max),
  timeDiscussRequired: z.boolean(),
  activeTime: z.string(),
  phoneNumber: z
    .string()
    .min(
      FOOD_TRUCK_MAX_LENGTH.phoneNumber.min,
      FOOD_TRUCK_ERROR_MESSAGE.phoneNumber.required
    ),
  regionCodes: z
    .array(z.string())
    .min(
      FOOD_TRUCK_MAX_LENGTH.regionCodes.min,
      FOOD_TRUCK_ERROR_MESSAGE.regionCodes.required
    )
    .max(
      FOOD_TRUCK_MAX_LENGTH.regionCodes.max,
      FOOD_TRUCK_ERROR_MESSAGE.regionCodes.max
    ),
  availableQuantity: z.enum(AVAILABLE_QUANTITY),
  needElectricity: z.enum(NEED_ELECTRICITY),
  paymentMethod: z.enum(PAYMENT_METHOD),
  menuCategories: z.array(z.enum(FOOD_CATEGORIES)),
  photoUrls: z.array(z.instanceof(File)),
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
  menus: z.boolean(),
});

export type FoodTruckFormData = z.infer<typeof foodTruckSchema>;

export const useFoodTruckForm = (
  initialData: FoodTruckFormData | undefined
) => {
  const methods = useForm<FoodTruckFormData>({
    resolver: zodResolver(foodTruckSchema),
    defaultValues: initialData ?? {
      name: '',
      description: '',
      phoneNumber: '',
      regionCodes: [],
      availableQuantity: undefined,
      needElectricity: undefined,
      paymentMethod: undefined,
      menuCategories: [],
      photoUrls: [],
      operatingInfo: undefined,
      option: undefined,
      availableDates: [],
      activeTime: '',
      timeDiscussRequired: false,
      menus: false,
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    trigger,
    formState: { isValid },
    watch,
  } = methods;

  const formData = watch();

  const onSubmit = async (formData: FoodTruckFormData) => {
    //TODO: 계좌 등록 제출
    if (isValid && formData) {
      alert('푸드트럭 등록 제출');
    }
  };

  return {
    // Form methods
    methods,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    trigger,
    isFormValid: isValid,

    // Form data
    formData,

    // Sub-hooks
    useBasicInfo,
    useTime,
    useCategories,
    useMenuInfo,
    useRegion,
  };
};

export const createFoodTruckFormMethods = (initialData?: FoodTruckFormData) => {
  return useForm<FoodTruckFormData>({
    resolver: zodResolver(foodTruckSchema),
    defaultValues: initialData ?? {
      name: '',
      description: '',
      phoneNumber: '',
      regionCodes: [],
      availableQuantity: undefined,
      needElectricity: undefined,
      paymentMethod: undefined,
      menuCategories: [],
      photoUrls: [],
      operatingInfo: undefined,
      option: undefined,
      availableDates: [],
      activeTime: undefined,
      timeDiscussRequired: false,
      menus: false,
    },
    mode: 'onChange',
  });
};
