import { useFormContext } from 'react-hook-form';

import { AVAILABLE_QUANTITY } from '@shared/constant/available-quantity';
import { NEED_ELECTRICITY } from '@shared/constant/need-electricity';
import { PAYMENT_METHOD } from '@shared/constant/payment-method';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import { FOOD_CATEGORIES } from '@shared/constant/food-categories';
export const useCategories = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FoodTruckFormData>();

  const formData = watch();

  const updateAvailableQuantity = (
    availableQuantity: (typeof AVAILABLE_QUANTITY)[keyof typeof AVAILABLE_QUANTITY]
  ) => {
    setValue('availableQuantity', availableQuantity, {
      shouldValidate: true,
    });
  };

  const updateNeedElectricity = (
    needElectricity: (typeof NEED_ELECTRICITY)[keyof typeof NEED_ELECTRICITY]
  ) => {
    setValue('needElectricity', needElectricity, {
      shouldValidate: true,
    });
  };

  const updatePaymentMethod = (
    paymentMethod: (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD]
  ) => {
    setValue('paymentMethod', paymentMethod, {
      shouldValidate: true,
    });
  };

  const updateMenuCategories = (
    menuCategories: (typeof FOOD_CATEGORIES)[keyof typeof FOOD_CATEGORIES]
  ) => {
    if (formData.menuCategories?.includes(menuCategories)) {
      setValue(
        'menuCategories',
        formData.menuCategories?.filter(
          menuCategory => menuCategory !== menuCategories
        ),
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue(
        'menuCategories',
        [...(formData.menuCategories ?? []), menuCategories],
        {
          shouldValidate: true,
        }
      );
    }
  };

  return {
    // Data
    availableQuantity: formData.availableQuantity,
    needElectricity: formData.needElectricity,
    paymentMethod: formData.paymentMethod,
    menuCategories: formData.menuCategories,
    // Errors
    availableQuantityError: errors.availableQuantity?.message,
    needElectricityError: errors.needElectricity?.message,
    paymentMethodError: errors.paymentMethod?.message,
    menuCategoriesError: errors.menuCategories?.message,
    // Actions
    updateAvailableQuantity,
    updateNeedElectricity,
    updatePaymentMethod,
    updateMenuCategories,
  };
};
