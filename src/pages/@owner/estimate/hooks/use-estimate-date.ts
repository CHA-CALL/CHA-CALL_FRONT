import { type UseFormReturn } from 'react-hook-form';

import type { AvailableDate } from '@type/available-date';
import type { EstimateFormData } from '@pages/@owner/estimate/schema/estimate.schema';

export const useEstimateDate = (methods: UseFormReturn<EstimateFormData>) => {
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
