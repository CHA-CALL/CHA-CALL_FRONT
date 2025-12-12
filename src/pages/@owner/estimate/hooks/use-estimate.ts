import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  estimateSchema,
  type EstimateFormData,
} from '@pages/@owner/estimate/utils/estimate.schema';
import {
  useEstimateDate,
  useEstimateTime,
} from '@pages/@owner/estimate/hooks/index';

// TODO: 훅 네이밍에 맞춰서 파일명 수정하기

export const useEstimateForm = () => {
  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<EstimateFormData>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      price: undefined,
      needElectricity: undefined,
      etc: '',
      availableDates: [],
      activeTime: '',
      food: '',
      location: '',
      detailLocation: '',
    },
    mode: 'onChange',
  });

  const formData = watch();

  const {
    startActiveTime,
    endActiveTime,
    updateStartActiveTime,
    updateEndActiveTime,
  } = useEstimateTime({ formData, setValue, setError });

  const {
    updateAvailableDateById,
    removeAvailableDateById,
    handleAddAvailableDate,
  } = useEstimateDate({ formData, setValue, setError });

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

  const updateNeedElectricity = (isUseElectricity: boolean) => {
    setValue('needElectricity', isUseElectricity, {
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
    handleSubmit: handleSubmit(onSubmit),
    formData: formDatas,
    activeTime: {
      startActiveTime,
      endActiveTime,
    },
    errors: combinedErrors,
    isValid,
    updateLocation,
    updateDetailLocation,
    updateStartActiveTime,
    updateEndActiveTime,
    updateAvailableDateById,
    removeAvailableDateById,
    updateFood,
    updatePrice,
    updateNeedElectricity,
    updateEtc,
    handleAddAvailableDate,
  };
};
