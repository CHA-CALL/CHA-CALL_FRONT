import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import Navigation from '@layout/navigation/Navigation';
import { Icon } from '@icon/Icon';
import Button from '@ui/button/Button';
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
} from '@pages/@owner/food-truck-form/@section/category-section/index';
import { MenuCategory } from '@pages/@owner/food-truck-form/@section/category-section';
import RegionSection from '@pages/@owner/food-truck-form/@section/region-section/RegionSection';
import MenuInfo from '@pages/@owner/food-truck-form/@section/menu-section/MenuInfo';
import { useFoodTruckForm } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import { useFoodTruckFormDate } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form-date';
import { useFoodTruckFormTime } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form-time';
import {
  FOOD_TRUCK_ERROR_MESSAGE,
  FOOD_TRUCK_MAX_LENGTH,
} from '@pages/@owner/food-truck-form/constants/food-truck';
import ActiveTime from '@components/active-time/ActiveTime';
import ActiveDate from '@components/active-date/ActiveDate';
import useFoodTruckDetail from '@pages/food-truck-detail/hooks/use-food-truck-detail';
import { ROUTES } from '@router/constant/routes';

// 메인 컴포넌트
export default function FoodTruckForm() {
  const { foodTruckId } = useParams();
  const foodTruckIdNumber = Number(foodTruckId);

  const navigate = useNavigate();
  const location = useLocation();

  // TODO: id 값이 있을 시 푸드트럭 정보 가져오기
  const { methods, reset, isFormValid, handleSubmit } = useFoodTruckForm();

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
  // 서버에서 활동 가능 지역은 지역코드로 받아야함
  const { foodTruckDetailData } = useFoodTruckDetail(foodTruckIdNumber);

  useEffect(() => {
    if (location.state?.formData && location.state?.from) {
      reset(location.state.formData);
    }
  }, [location.state, reset]);

  const handleNavigateBack = () => {
    navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
  };

  return (
    <FormProvider {...methods}>
      <Navigation
        centerContent={
          foodTruckDetailData ? '나의 푸드트럭 수정' : '나의 푸드트럭 등록'
        }
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
