import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formatStringDatesToAvailableDates } from '@utils/date';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import {
  foodTruckSchema,
  type FoodTruckFormData,
} from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';
import useFoodTruckDetail from '@pages/food-truck-detail/hooks/use-food-truck-detail';

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

  const [isEdit, setIsEdit] = useState(false);

  const { foodTruckDetailData } = useFoodTruckDetail(foodTruckIdNumber);

  // TODO: 메뉴 리스트 조회 필요. 있다면 활성화, 없다면 비활성화

  useEffect(() => {
    if (foodTruckDetailData) {
      setIsEdit(true);
      reset({
        name: foodTruckDetailData.name,
        nameDuplicate: true,
        description: foodTruckDetailData.description,
        phoneNumber: foodTruckDetailData.phoneNumber,
        regionCodes: foodTruckDetailData.regionCodes,
        availableQuantity: foodTruckDetailData.availableQuantity,
        needElectricity: foodTruckDetailData.needElectricity,
        paymentMethod: foodTruckDetailData.paymentMethod,
        menuCategories: foodTruckDetailData.menuCategories,
        photoUrls: foodTruckDetailData.photoUrl,
        operatingInfo: foodTruckDetailData.operatingInfo,
        option: foodTruckDetailData.option,
        availableDates: formatStringDatesToAvailableDates(
          foodTruckDetailData.availableDates ?? []
        ),
        activeTime: foodTruckDetailData.activeTime,
        timeDiscussRequired: foodTruckDetailData.timeDiscussRequired,
        // TODO : 메뉴 리스트 있을 때 true
        menus: true,
      });
    }
  }, [foodTruckDetailData, reset]);

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
    isEdit,
    methods,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    isFormValid: isValid,
  };
};
