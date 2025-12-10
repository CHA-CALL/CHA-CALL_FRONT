import { useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import type { EstimateFormData } from '@pages/@owner/estimate/utils/estimate.schema';

export const useEstimateTime = (methods: UseFormReturn<EstimateFormData>) => {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = methods;

  const formActiveTime = watch('activeTime');

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
  return {
    formActiveTime,
    activeTimeError: errors.activeTime?.message,

    handleActiveTimeError,
    handleActiveTimeSetValue,
  };
};
