import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useToast from '@hooks/use-toast';

import useFoodTruckDetail from '@pages/food-truck-detail/hooks/use-food-truck-detail';
import { useMenusQuery } from '@pages/@owner/menu/hooks/use-menus-query';
import {
  foodTruckSchema,
  type FoodTruckFormData,
} from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';
import { resetFoodTruckFormValue } from '@pages/@owner/food-truck-form/utils/reset-food-truck-form-value';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';

const initialData = {
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
};

export const useFoodTruckForm = (foodTruckIdNumber: number) => {
  const toast = useToast();
  const methods = useForm<FoodTruckFormData>({
    resolver: zodResolver(foodTruckSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
    setError,
  } = methods;

  // 기존 등록 푸드트럭 데이터 조회
  const { foodTruckDetailData } = useFoodTruckDetail(foodTruckIdNumber);

  // 메뉴 등록 여부를 위한 조회
  const { data: menuData } = useMenusQuery(foodTruckIdNumber, '최신순');

  const isEdit = !!foodTruckDetailData;

  useEffect(() => {
    if (!foodTruckDetailData) return;

    const menus = menuData?.pages.flatMap(page => page?.content || []);
    const result = resetFoodTruckFormValue(foodTruckDetailData, menus);

    if (result.isError) {
      toast.error('잘못된 정보입니다. 다시 시도해주세요.');
      return;
    }
    reset(result.values);
  }, [foodTruckDetailData, menuData, reset, toast]);

  const onSubmit = async (formData: FoodTruckFormData) => {
    if (!formData.nameDuplicate) {
      setError('name', {
        message: FOOD_TRUCK_ERROR_MESSAGE.nameDuplicate.required,
      });
      return;
    }
    if (isValid && formData) {
      // TODO: 푸드트럭 등록 api 호출
      alert('푸드트럭 등록 제출');
    }
  };

  return {
    // Form methods
    isEdit,
    methods,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    isFormValid: isValid,
  };
};
