import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type {
  CreateReservationRequest,
  UpdateReservationRequest,
} from 'apis/data-contracts';
import { zodResolver } from '@hookform/resolvers/zod';

import { formatEstimateDatesToAvailableDates } from '@utils/date';
import {
  estimateSchema,
  type EstimateFormData,
} from '@pages/@owner/estimate/schemas/estimate.schema';
import { useQueryEstimate } from '@pages/@owner/estimate/hooks/use-query-estimate';
import { useMutationEstimate } from '@pages/@owner/estimate/hooks/use-mutation-estimate';
import {
  formatCreateEstimate,
  formatUpdateEstimate,
} from '@pages/@owner/estimate/utils';

export const useEstimateForm = (
  chatRoomId?: string,
  foodTruckId?: string,
  reservationId?: string | null,
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
    reset,
    trigger,
    formState: { errors, isValid },
    watch,
  } = methods;

  const formData = watch();

  // chatRoomId가 undefined 일 경우 Estimate.tsx에서 예외 처리됨.
  const chatRoomIdNumber = chatRoomId ? Number(chatRoomId) : 0;
  const reservationIdNumber = reservationId ? Number(reservationId) : null;

  const { estimateData } = useQueryEstimate(reservationIdNumber);

  const { createEstimate, updateEstimate } = useMutationEstimate(
    chatRoomIdNumber,
    reservationIdNumber
  );

  // 기존 estimateData가 있다면(= 예약 견적서 수정) formData 갱신
  useEffect(() => {
    if (!estimateData) return;
    reset(
      {
        location: estimateData.address ?? '',
        detailLocation: estimateData.detailAddress ?? '',
        availableDates: formatEstimateDatesToAvailableDates(
          estimateData.reservationDates ?? []
        ),
        activeTime: estimateData.operationHour ?? undefined,
        food: estimateData.menu ?? '',
        price: estimateData.deposit ?? undefined,
        needElectricity: estimateData.isUseElectricity ?? undefined,
        etc: estimateData.etcRequest ?? '',
      },
      {
        keepDirty: false,
        keepTouched: false,
      }
    );
  }, [estimateData, reset]);

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
      const estimateRequestData: CreateReservationRequest =
        formatCreateEstimate(
          Number(foodTruckId),
          Number(chatRoomId),
          Number(reservationUserId),
          formData
        );

      createEstimate(estimateRequestData);
    }
  };

  const handleUpdateEstimate = async (formData: EstimateFormData) => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    if (formData) {
      const estimateRequestData: UpdateReservationRequest =
        formatUpdateEstimate(formData);

      updateEstimate({
        reservationId: reservationIdNumber,
        data: estimateRequestData,
      });
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
    handleUpdate: handleSubmit(handleUpdateEstimate),
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
