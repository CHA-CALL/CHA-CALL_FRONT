import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';
import type { RegionResponse } from 'apis/data-contracts';
import { ROUTES } from '@router/constant/routes';
import { useNavigate } from 'react-router-dom';

import useToast from '@hooks/use-toast';

export const useRegion = (
  formData: FoodTruckFormData,
  foodTruckId?: string
) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmitRegion = (regions: RegionResponse[]) => {
    if (!foodTruckId) {
      toast.error('잘못된 접근입니다.');
      navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
      return;
    }
    navigate(ROUTES.FOOD_TRUCK_FORM(foodTruckId), {
      state: {
        from: 'set-region',
        formData: {
          ...formData,
          regionCodes: regions,
        },
      },
    });
  };

  const handleResetRegionFoodTruck = () => {
    if (!foodTruckId) {
      toast.error('잘못된 접근입니다.');
      navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
      return;
    }
    navigate(ROUTES.FOOD_TRUCK_FORM(foodTruckId), {
      state: {
        from: 'set-region',
        formData: {
          ...formData,
          regionCodes: [],
        },
      },
    });
  };

  return {
    regionCodes: formData?.regionCodes ?? [],

    handleSubmitRegion,
    handleResetRegionFoodTruck,
  };
};
