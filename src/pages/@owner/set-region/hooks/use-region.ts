import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import type { RegionResponse } from 'apis/data-contracts';
import { ROUTES } from '@router/constant/routes';
import { useNavigate } from 'react-router-dom';
import { getNavigateState } from '@pages/@owner/food-truck-form/utils/navigate-state';

export const useRegion = () => {
  const navigate = useNavigate();
  const {
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<FoodTruckFormData>();

  const formData = watch();

  const updateRegionCodes = (regions: RegionResponse[]) => {
    setValue('regionCodes', regions, { shouldValidate: true });
  };

  const handleSubmitRegion = (regions: RegionResponse[]) => {
    updateRegionCodes(regions);
    // setValue 후 최신 값을 가져오기 위해 getValues() 사용
    const updatedFormData = getValues();
    navigate(ROUTES.FOOD_TRUCK_FORM, {
      state: getNavigateState(updatedFormData),
    });
  };

  const handleResetRegionFoodTruck = () => {
    updateRegionCodes([]);
  };

  return {
    regionCodes: formData.regionCodes ?? [],

    regionCodesError: errors.regionCodes?.message,

    updateRegionCodes,
    handleSubmitRegion,
    handleResetRegionFoodTruck,
  };
};
