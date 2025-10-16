import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '@pages/@owner/food-truck-form/constants/food-truck';
import { useState } from 'react';
import { FOOD_CATEGORIES } from '@shared/constant/food';
import { AVAILABLE_QUANTITY } from '@shared/constant/available-quantity';
import { NEED_ELECTRICITY } from '@shared/constant/need-electricity';
import { PAYMENT_METHOD } from '@shared/constant/payment-method';
import type { SelectedDate } from '@shared/types/calendar-types';

const foodTruckSchema = z.object({
  name: z
    .string()
    .min(FOOD_TRUCK_MAX_LENGTH.name.min, FOOD_TRUCK_ERROR_MESSAGE.name.required)
    .max(FOOD_TRUCK_MAX_LENGTH.name.max, FOOD_TRUCK_ERROR_MESSAGE.name.max),
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
  phoneNumber: z
    .string()
    .min(
      FOOD_TRUCK_MAX_LENGTH.phoneNumber.min,
      FOOD_TRUCK_ERROR_MESSAGE.phoneNumber.required
    )
    .regex(
      new RegExp('^010-\\d{4}-\\d{4}$'),
      FOOD_TRUCK_ERROR_MESSAGE.phoneNumber.invalid
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
  menus: z.array(z.enum(FOOD_CATEGORIES)),
  images: z.array(z.instanceof(File)),
  operationalInformation: z
    .string()
    .max(
      FOOD_TRUCK_MAX_LENGTH.operationalInformation,
      FOOD_TRUCK_ERROR_MESSAGE.operationalInformation.max
    )
    .optional(),
  etc: z
    .string()
    .max(FOOD_TRUCK_MAX_LENGTH.etc, FOOD_TRUCK_ERROR_MESSAGE.etc.max)
    .optional(),
  date: z
    .object({
      startDate: z.date().nullable().optional(),
      endDate: z.date().nullable().optional(),
    })
    .optional(),
});

export type FoodTruckFormData = z.infer<typeof foodTruckSchema>;

export const useFoodTruckForm = (
  initialData: FoodTruckFormData | undefined
) => {
  const {
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors, isValid },
    watch,
  } = useForm<FoodTruckFormData>({
    resolver: zodResolver(foodTruckSchema),
    defaultValues: initialData ?? {
      name: '',
      description: '',
      phoneNumber: '',
      regionCodes: [],
      availableQuantity: undefined,
      needElectricity: undefined,
      paymentMethod: undefined,
      menus: [],
      images: [],
      operationalInformation: undefined,
      etc: undefined,
      date: {
        startDate: undefined,
        endDate: undefined,
      },
    },
    mode: 'onChange',
  });

  const formData = watch();

  const [checkNameDuplicate, setCheckNameDuplicate] = useState(false);

  const handleCheckNameDuplicate = () => {
    setCheckNameDuplicate(prev => !prev);
  };

  const updateName = (name: string) => {
    setValue('name', name, { shouldValidate: true });
    if (name.length > 0) {
      setCheckNameDuplicate(true);
    } else {
      setCheckNameDuplicate(false);
    }
  };

  const updateDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
  };
  const updatePhoneNumber = (phoneNumber: string) => {
    const numbersOnly = phoneNumber.replace(/\D/g, '');
    if (numbersOnly.length === 0) {
      setValue('phoneNumber', '', { shouldValidate: true });
      return;
    }

    if (numbersOnly.length > 11) {
      return;
    }

    let formatted = numbersOnly;

    if (numbersOnly.length > 3) {
      formatted = numbersOnly.slice(0, 3) + '-' + numbersOnly.slice(3);
    }

    if (numbersOnly.length > 7) {
      formatted =
        numbersOnly.slice(0, 3) +
        '-' +
        numbersOnly.slice(3, 7) +
        '-' +
        numbersOnly.slice(7);
    }

    setValue('phoneNumber', formatted, { shouldValidate: true });
  };
  const updateRegionCodes = (regionCodes: string[]) => {
    setValue('regionCodes', regionCodes, { shouldValidate: true });
  };
  const updateAvailableQuantity = (
    availableQuantity: (typeof AVAILABLE_QUANTITY)[keyof typeof AVAILABLE_QUANTITY]
  ) => {
    setValue('availableQuantity', availableQuantity, {
      shouldValidate: true,
    });
  };
  const updateNeedElectricity = (
    needElectricity: (typeof NEED_ELECTRICITY)[keyof typeof NEED_ELECTRICITY]
  ) => {
    setValue('needElectricity', needElectricity, {
      shouldValidate: true,
    });
  };
  const updatePaymentMethod = (
    paymentMethod: (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD]
  ) => {
    setValue('paymentMethod', paymentMethod, {
      shouldValidate: true,
    });
  };
  const updateMenus = (
    menus: (typeof FOOD_CATEGORIES)[keyof typeof FOOD_CATEGORIES]
  ) => {
    if (formData.menus?.includes(menus)) {
      setValue(
        'menus',
        formData.menus?.filter(menu => menu !== menus),
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue('menus', [...(formData.menus ?? []), menus], {
        shouldValidate: true,
      });
    }
  };

  const updateOperationalInformation = (operationalInformation: string) => {
    setValue('operationalInformation', operationalInformation, {
      shouldValidate: true,
    });
  };
  const updateEtc = (etc: string) => {
    setValue('etc', etc, { shouldValidate: true });
  };

  const updateDate = (date: SelectedDate | undefined) => {
    setValue(
      'date',
      {
        startDate: date?.startDate,
        endDate: date?.endDate,
      },
      { shouldValidate: true }
    );
  };

  const onSubmit = async (formData: FoodTruckFormData) => {
    //TODO: 계좌 등록 제출
    if (isValid && formData) {
      alert('푸드트럭 등록 제출');
    }
  };

  const compatibleFormData = {
    name: formData.name,
    description: formData.description,
    phoneNumber: formData.phoneNumber,
    regionCodes: formData.regionCodes,
    availableQuantity: formData.availableQuantity,
    needElectricity: formData.needElectricity,
    paymentMethod: formData.paymentMethod,
    menus: formData.menus,
    images: formData.images,
    operationalInformation: formData.operationalInformation,
    etc: formData.etc,
    date: formData.date,
  };

  const compatibleErrors = {
    name: errors.name?.message,
    description: errors.description?.message,
    phoneNumber: errors.phoneNumber?.message,
    regionCodes: errors.regionCodes?.message,
    availableQuantity: errors.availableQuantity?.message,
    needElectricity: errors.needElectricity?.message,
    paymentMethod: errors.paymentMethod?.message,
    menus: errors.menus?.message,
    images: errors.images?.message,
    operationalInformation: errors.operationalInformation?.message,
    etc: errors.etc?.message,
    date: errors.date?.message,
  };

  return {
    formData: compatibleFormData,
    errors: compatibleErrors,
    reset,
    updateName,
    updateDescription,
    updatePhoneNumber,
    updateRegionCodes,
    updateAvailableQuantity,
    updateNeedElectricity,
    updatePaymentMethod,
    updateMenus,
    updateOperationalInformation,
    updateEtc,
    updateDate,
    handleSubmit: handleSubmit(onSubmit),
    isFormValid: isValid,
    trigger,
    handleCheckNameDuplicate,
    checkNameDuplicate,
  };
};
