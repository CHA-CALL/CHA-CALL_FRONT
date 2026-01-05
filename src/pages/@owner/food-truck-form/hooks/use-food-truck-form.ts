import { useEffect, useMemo } from 'react';
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
import { useMutationFoodTruckForm } from './use-mutation-food-truck-form';

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
    setValue,
    formState: { isValid },
    setError,
  } = methods;

  // 기존 등록 푸드트럭 데이터 조회
  const { foodTruckDetailData } = useFoodTruckDetail(foodTruckIdNumber);

  // 메뉴 등록 여부를 위한 조회
  const { data: menuData } = useMenusQuery(foodTruckIdNumber, '최신순');
  const menus = useMemo(
    () => menuData?.pages.flatMap(page => page?.content ?? []) ?? [],
    [menuData?.pages]
  );

  // 나의 푸드트럭 정보 업데이트
  const { updateFoodTruckInfo } = useMutationFoodTruckForm();

  const isEdit = !!foodTruckDetailData;

  useEffect(() => {
    if (!foodTruckDetailData) {
      setValue('menus', menus && menus.length > 0, { shouldValidate: true });
      return;
    }

    const result = resetFoodTruckFormValue(foodTruckDetailData, menus);

    if (result.isError) {
      toast.error('잘못된 정보입니다. 다시 시도해주세요.');
      return;
    }
    reset(result.values);
  }, [foodTruckDetailData, menus, toast, reset, setValue]);

  const handleSubmitFoodTruckInfo = async (formData: FoodTruckFormData) => {
    if (!formData.nameDuplicate) {
      setError('name', {
        message: FOOD_TRUCK_ERROR_MESSAGE.nameDuplicate.required,
      });
      return;
    }
    if (isValid && formData) {
      // TODO: 서버에 필요한 형식에 맞게 포맷하여 보내기. 타입 만들어야 함
      alert('푸드트럭 등록 제출');
      updateFoodTruckInfo({
        foodTruckId: foodTruckIdNumber,
        data: {
          name: formData.name,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
          activeTime: formData.activeTime,
          timeDiscussRequired: formData.timeDiscussRequired,
          foodTruckServiceAreas: formData.regionCodes.map(
            region => region.code!
          ),
          menuCategories: ['MEAL'],
          availableQuantity: formData.availableQuantity,
          needElectricity: formData.needElectricity,
          paymentMethod: formData.paymentMethod,
          availableDates: formData.availableDates,
          photoUrls: formData.photoUrls,
          operatingInfo: formData.operatingInfo,
          option: formData.option,
        },
      });
    }
  };

  return {
    // Form methods
    isEdit,
    methods,
    handleSubmit: handleSubmit(handleSubmitFoodTruckInfo),
    reset,
    isFormValid: isValid,
  };
};
