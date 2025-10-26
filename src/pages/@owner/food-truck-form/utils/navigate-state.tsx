import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';

export const getNavigateState = (formData: FoodTruckFormData) => {
  return {
    from: 'food-truck-form',
    formData: formData,
  };
};
