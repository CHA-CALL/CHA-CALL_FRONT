import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  estimateSchema,
  type EstimateFormData,
} from '@pages/@owner/estimate/schemas/estimate.schema';
import { useMutationEstimate } from '@pages/@owner/estimate/hooks';
import type { ReservationEstimateData } from '../api';

export const useEstimateForm = (
  chatRoomId?: string,
  foodTruckId?: string,
  reservationUserId?: string
) => {
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

  const { createEstimate } = useMutationEstimate();

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

  const handleCreateEstimate = async (formData: EstimateFormData) => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    if (formData) {
      const formattedDates = formData.availableDates
        .filter(date => date.startDate)
        .map(date => {
          if (date.endDate) {
            return `${date.startDate} ~ ${date.endDate}`;
          }
          return `${date.startDate} ~ ${date.startDate}`;
        });

      const estimateData: ReservationEstimateData = {
        foodTruckId: Number(foodTruckId),
        chatRoomId: Number(chatRoomId),
        reservationUserId: Number(reservationUserId),
        address: formData.location,
        detailAddress: formData.detailLocation,
        reservationDates: formattedDates,
        operationHour: formData.activeTime,
        menu: formData.food,
        deposit: formData.price,
        isUseElectricity: formData.needElectricity,
        etcRequest: formData.etc,
      };
      createEstimate(estimateData);
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
    handleCreate: handleSubmit(handleCreateEstimate),
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
