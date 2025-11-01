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
import type { AvailableDate } from '@pages/@owner/food-truck-form/types/available-date';
import { FOOD_CATEGORIES } from '@shared/constant/food-categories';

const foodTruckSchema = z.object({
  name: z
    .string()
    .min(FOOD_TRUCK_MAX_LENGTH.name.min, FOOD_TRUCK_ERROR_MESSAGE.name.required)
    .max(FOOD_TRUCK_MAX_LENGTH.name.max),
  nameDuplicate: z.boolean(),
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
  // regionCodes: z
  //   .array(z.string())
  //   .min(
  //     FOOD_TRUCK_MAX_LENGTH.regionCodes.min,
  //     FOOD_TRUCK_ERROR_MESSAGE.regionCodes.required
  //   )
  //   .max(
  //     FOOD_TRUCK_MAX_LENGTH.regionCodes.max,
  //     FOOD_TRUCK_ERROR_MESSAGE.regionCodes.max
  //   ),
  availableQuantity: z.nativeEnum(AVAILABLE_QUANTITY),
  needElectricity: z.nativeEnum(NEED_ELECTRICITY),
  paymentMethod: z.nativeEnum(PAYMENT_METHOD),
  menuCategories: z.array(z.nativeEnum(FOOD_CATEGORIES)),
  // photoUrls: z.array(z.instanceof(File)).refine(files => files.length > 0, {
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

export const useFoodTruckForm = (initialData?: FoodTruckFormData) => {
  const methods = useForm<FoodTruckFormData>({
    resolver: zodResolver(foodTruckSchema),
    defaultValues: initialData ?? {
      name: '',
      nameDuplicate: false,
      description: '',
      phoneNumber: '',
      // regionCodes: [],
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
    setError,
  } = methods;

  const formData = watch();

  const onSubmit = async (formData: FoodTruckFormData) => {
    if (!formData.nameDuplicate) {
      setError('name', {
        message: FOOD_TRUCK_ERROR_MESSAGE.nameDuplicate.required,
      });
      return;
    }
    if (isValid && formData) {
      //TODO: 계좌 등록 제출
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
  };
};
