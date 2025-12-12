import { useCallback, useState } from 'react';
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
  const [hasTimeError, setHasTimeError] = useState(true);

  const handleActiveTimeError = useCallback(
    (message: string) => {
      setError('activeTime', { message });
      setHasTimeError(true);
    },
    [setError]
  );

  const handleActiveTimeSetValue = useCallback(
    (value: string) => {
      setValue('activeTime', value, {
        shouldValidate: true,
      });
      setHasTimeError(false);
    },
    [setValue]
  );
  return {
    formActiveTime,
    activeTimeError: errors.activeTime?.message,
    hasTimeError,

    handleActiveTimeError,
    handleActiveTimeSetValue,
  };
};
