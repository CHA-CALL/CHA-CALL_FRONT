import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import Navigation from '@layout/navigation/Navigation';
import { Icon } from '@icon/Icon';
import Button from '@ui/button/Button';
import { ROUTES } from '@router/constant/routes';
import useToast from '@hooks/use-toast';

import {
  FoodTruckName,
  FoodTruckDescription,
  FoodTruckPhoneNumber,
  FoodTruckOperatingInfo,
  FoodTruckOption,
  FoodTruckPhoto,
} from '@pages/@owner/food-truck-form/@section/basic-info-section/index';
import {
  AvailableQuantity,
  NeedElectricity,
  PaymentMethod,
  MenuInfo,
  RegionSection,
  MenuCategory,
} from '@pages/@owner/food-truck-form/@section';
import { useFoodTruckForm } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import { useFoodTruckFormDate } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form-date';
import { useFoodTruckFormTime } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form-time';
import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '@pages/@owner/food-truck-form/constants/food-truck';
import ActiveTime from '@components/active-time/ActiveTime';
import ActiveDate from '@components/active-date/ActiveDate';

// 메인 컴포넌트
export default function FoodTruckForm() {
  const { foodTruckId } = useParams();
  const foodTruckIdNumber = Number(foodTruckId);

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const { isEdit, methods, reset, isFormValid, handleSubmit } =
    useFoodTruckForm(foodTruckIdNumber);

  const {
    formActiveTime,
    formTimeDiscussRequired,
    activeTimeError,
    handleActiveTimeSetValue,
    handleTimeDiscussRequiredSetValue,
  } = useFoodTruckFormTime(methods);

  const {
    formAvailableDates,
    availableDatesError,
    handleActiveDateSetValue,
    handleActiveDateError,
  } = useFoodTruckFormDate(methods);

  useEffect(() => {
    if (location.state?.formData && location.state?.from) {
      reset(location.state.formData);
    }
  }, [location.state, reset]);

  if (!foodTruckId || isNaN(foodTruckIdNumber)) {
    toast.error('잘못된 접근입니다.');
    navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
    return null;
  }

  const handleNavigateBack = () => {
    navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
  };

  return (
    <FormProvider {...methods}>
      <Navigation
        centerContent={isEdit ? '나의 푸드트럭 수정' : '나의 푸드트럭 등록'}
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleNavigateBack}
      />
      <div className='flex flex-col px-[2rem] pb-[12rem]'>
        <FoodTruckName />
        <FoodTruckDescription />
        <FoodTruckPhoneNumber />
        <ActiveTime
          formActiveTime={formActiveTime}
          formTimeDiscussRequired={formTimeDiscussRequired}
          activeTimeError={activeTimeError}
          handleActiveTimeSetValue={handleActiveTimeSetValue}
          handleTimeDiscussRequiredSetValue={handleTimeDiscussRequiredSetValue}
        />
        <RegionSection />
        <MenuCategory />
        <AvailableQuantity />
        <NeedElectricity />
        <PaymentMethod />
        <MenuInfo />
        <FoodTruckPhoto />
        <ActiveDate
          formAvailableDates={formAvailableDates}
          availableDatesError={availableDatesError}
          errorMessages={FOOD_TRUCK_ERROR_MESSAGE.availableDates}
          maxLength={FOOD_TRUCK_MAX_LENGTH.availableDates.max}
          handleActiveDateSetValue={handleActiveDateSetValue}
          handleActiveDateError={handleActiveDateError}
        />
        <FoodTruckOperatingInfo />
        <FoodTruckOption />
      </div>

      <footer className='fixed bottom-[0] mx-auto w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={isFormValid ? 'active' : 'disabled'}
          handleClickButton={handleSubmit}
          disabled={!isFormValid}
        >
          저장하기
        </Button>
      </footer>
    </FormProvider>
  );
}
