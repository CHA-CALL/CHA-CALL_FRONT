import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';

export const useMenuInfo = () => {
  const { setValue } = useFormContext<FoodTruckFormData>();

  const updateMenus = (menus: boolean) => {
    setValue('menus', menus, { shouldValidate: true });
  };

  return {
    updateMenus,
  };
};
