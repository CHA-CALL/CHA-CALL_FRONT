import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  estimateSchema,
  type EstimateFormData,
} from '@pages/@owner/estimate/utils/estimate.schema';
import type { NeedElectricityKey } from '@constant/need-electricity';
import { useEstimateTime } from '@pages/@owner/estimate/hooks/use-time';

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
      activeTime: {
        startActiveTime: '',
        endActiveTime: '',
      },
      menu: '',
      location: '',
      detailLocation: '',
    },
    mode: 'onChange',
  });

  const formData = watch();
  const {
    updateAvailableDateById,
    removeAvailableDateById,
    handleAddAvailableDate,
    updateStartActiveTime,
    updateEndActiveTime,
  } = useEstimateTime({ formData, setValue, setError });

  const updateLocation = (location: string) => {
    setValue('location', location, { shouldValidate: true });
  };

  const updateDetailLocation = (detailLocation: string) => {
    setValue('detailLocation', detailLocation, { shouldValidate: true });
  };

  const updateMenu = (menu: string) => {
    setValue('menu', menu, { shouldValidate: true });
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
      alert('견적 요청 제출');
    }
  };

  const formDatas = {
    location: formData.location,
    detailLocation: formData.detailLocation,
    availableDates: formData.availableDates,
    activeTime: formData.activeTime,
    menu: formData.menu,
    price: formData.price,
    needElectricity: formData.needElectricity,
    etc: formData.etc,
  };

  const combinedErrors = {
    location: errors.location?.message,
    detailLocation: errors.detailLocation?.message,
    availableDates: errors.availableDates?.message,
    activeTime: errors.activeTime?.message,
    menu: errors.menu?.message,
    price: errors.price?.message,
    needElectricity: errors.needElectricity?.message,
    etc: errors.etc?.message,
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    formData: formDatas,
    errors: combinedErrors,
    isValid,
    updateLocation,
    updateDetailLocation,
    updateAvailableDateById,
    removeAvailableDateById,
    updateStartActiveTime,
    updateEndActiveTime,
    updateMenu,
    updatePrice,
    updateNeedElectricity,
    updateEtc,
    handleAddAvailableDate,
  };
};
