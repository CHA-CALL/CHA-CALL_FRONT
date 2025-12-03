import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';

export const getNavigateState = (formData: FoodTruckFormData) => {
  return {
    from: 'food-truck-form',
    formData: formData,
  };
};
