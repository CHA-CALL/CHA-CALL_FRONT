import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from './use-food-truck-form';

export const useRegion = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FoodTruckFormData>();

  const formData = watch();

  const updateRegionCodes = (regionCodes: string[]) => {
    setValue('regionCodes', regionCodes, { shouldValidate: true });
  };

  return {
    // Data
    regionCodes: formData.regionCodes,

    // Errors
    regionCodesError: errors.regionCodes?.message,

    // Actions
    updateRegionCodes,
  };
};
