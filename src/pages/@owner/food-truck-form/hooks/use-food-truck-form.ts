import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import {
  foodTruckSchema,
  type FoodTruckFormData,
} from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';

export const useFoodTruckForm = (initialData?: FoodTruckFormData) => {
  const methods = useForm<FoodTruckFormData>({
    resolver: zodResolver(foodTruckSchema),
    defaultValues: initialData ?? {
      name: '',
      nameDuplicate: false,
      description: '',
      phoneNumber: '',
      regionCodes: [],
      availableQuantity: undefined,
      needElectricity: undefined,
      paymentMethod: undefined,
      menuCategories: [],
      photoUrls: [],
      operatingInfo: undefined,
      option: undefined,
      availableDates: [],
      activeTime: '',
      timeDiscussRequired: false,
      menus: false,
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
    setError,
  } = methods;

  const onSubmit = async (formData: FoodTruckFormData) => {
    if (!formData.nameDuplicate) {
      setError('name', {
        message: FOOD_TRUCK_ERROR_MESSAGE.nameDuplicate.required,
      });
      return;
    }
    if (isValid && formData) {
      //TODO: 계좌 등록 제출
      alert('푸드트럭 등록 제출');
    }
  };

  return {
    // Form methods
    methods,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    isFormValid: isValid,
  };
};
