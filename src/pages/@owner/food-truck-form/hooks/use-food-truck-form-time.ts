import { useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';

export const useFoodTruckFormTime = (
  methods: UseFormReturn<FoodTruckFormData>
) => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = methods;

  const formActiveTime = watch('activeTime');
  const formTimeDiscussRequired = watch('timeDiscussRequired');

  const handleActiveTimeError = useCallback(
    (message: string) => {
      setError('activeTime', { message });
    },
    [setError]
  );

  const handleActiveTimeSetValue = useCallback(
    (value: string) => {
      setValue('activeTime', value, {
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const handleTimeDiscussRequiredSetValue = useCallback(
    (value: boolean) => {
      setValue('timeDiscussRequired', value, {
        shouldValidate: true,
      });
    },
    [setValue]
  );

  return {
    formActiveTime,
    formTimeDiscussRequired,
    activeTimeError: errors.activeTime?.message,

    handleActiveTimeError,
    handleActiveTimeSetValue,
    handleTimeDiscussRequiredSetValue,
  };
};
