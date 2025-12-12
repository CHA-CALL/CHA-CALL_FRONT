import { type UseFormReturn } from 'react-hook-form';

import type { AvailableDate } from '@type/available-date';

import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';

export const useFoodTruckFormDate = (
  methods: UseFormReturn<FoodTruckFormData>
) => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = methods;

  const formAvailableDates = watch('availableDates');

  const handleActiveDateSetValue = (value: AvailableDate[]) => {
    setValue('availableDates', value, {
      shouldValidate: true,
    });
  };

  const handleActiveDateError = (message: string) => {
    setError('availableDates', {
      message,
    });
  };

  return {
    // Data
    formAvailableDates,

    // Errors
    availableDatesError: errors.availableDates?.message,

    // Actions
    handleActiveDateSetValue,
    handleActiveDateError,
  };
};
