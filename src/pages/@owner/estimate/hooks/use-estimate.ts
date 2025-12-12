import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  estimateSchema,
  type EstimateFormData,
} from '@pages/@owner/estimate/schemas/estimate.schema';
import type { NeedElectricityKey } from '@constant/need-electricity';

export const useEstimateForm = () => {
  const methods = useForm<EstimateFormData>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      price: undefined,
      needElectricity: undefined,
      etc: '',
      availableDates: [],
      activeTime: undefined,
      food: '',
      location: '',
      detailLocation: '',
    },
    mode: 'onChange',
  });
  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
    watch,
  } = methods;

  const formData = watch();

  const updateLocation = (location: string) => {
    setValue('location', location, { shouldValidate: true });
  };

  const updateDetailLocation = (detailLocation: string) => {
    setValue('detailLocation', detailLocation, { shouldValidate: true });
  };

  const updateFood = (food: string) => {
    setValue('food', food, { shouldValidate: true });
  };

  const updatePrice = (price: string) => {
    const numbersOnly = Number(price.replace(/[^\d]/g, ''));
    setValue('price', numbersOnly, { shouldValidate: true });
  };

  const updateNeedElectricity = (needElectricity: NeedElectricityKey) => {
    setValue('needElectricity', needElectricity, {
      shouldValidate: true,
    });
  };

  const updateEtc = (etc: string) => {
    setValue('etc', etc, { shouldValidate: true });
  };

  const onSubmit = async (formData: EstimateFormData) => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    if (formData) {
      console.info(formData);
      alert('견적 요청 제출');
    }
  };

  const formDatas = {
    location: formData.location,
    detailLocation: formData.detailLocation,
    availableDates: formData.availableDates,
    activeTime: formData.activeTime,
    food: formData.food,
    price: formData.price,
    needElectricity: formData.needElectricity,
    etc: formData.etc,
  };

  const combinedErrors = {
    location: errors.location?.message,
    detailLocation: errors.detailLocation?.message,
    availableDates: errors.availableDates?.message,
    activeTime: errors.activeTime?.message,
    food: errors.food?.message,
    price: errors.price?.message,
    needElectricity: errors.needElectricity?.message,
    etc: errors.etc?.message,
  };

  return {
    methods,
    handleSubmit: handleSubmit(onSubmit),
    formData: formDatas,
    errors: combinedErrors,
    isValid,
    updateLocation,
    updateDetailLocation,
    updateFood,
    updatePrice,
    updateNeedElectricity,
    updateEtc,
  };
};
