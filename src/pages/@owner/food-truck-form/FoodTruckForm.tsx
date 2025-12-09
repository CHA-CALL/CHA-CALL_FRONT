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
import { useFoodTruckFormTime } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form-time';
import { useFoodTruckFormDate } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form-date';
import ActiveTime from '@components/active-time/ActiveTime';
import ActiveDate from '@components/active-date/ActiveDate';

// 메인 컴포넌트
export default function FoodTruckForm() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  // TODO: id 값이 있을 시 푸드트럭 정보 가져오기
  console.info(id);
  const methods = useFoodTruckForm();

  useEffect(() => {
    if (location.state?.formData && location.state?.from) {
      methods.reset(location.state.formData);
    }
  }, [location.state, methods]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <FormProvider {...methods.methods}>
      <Navigation
        centerContent='나의 푸드트럭 수정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleNavigateBack}
      />
      <div className='flex flex-col px-[2rem] pb-[12rem]'>
        <FoodTruckName />
        <FoodTruckDescription />
        <FoodTruckPhoneNumber />
        <ActiveTime useActiveTimeHook={useFoodTruckFormTime} />
        <RegionSection />
        <MenuCategory />
        <AvailableQuantity />
        <NeedElectricity />
        <PaymentMethod />
        <MenuInfo />
        <FoodTruckPhoto />
        <ActiveDate useActiveDateHook={useFoodTruckFormDate} />
        <FoodTruckOperatingInfo />
        <FoodTruckOption />
      </div>

      <footer className='fixed bottom-[0] mx-auto w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={methods.isFormValid ? 'active' : 'disabled'}
          handleClickButton={methods.handleSubmit}
          disabled={!methods.isFormValid}
        >
          저장하기
        </Button>
      </footer>
    </FormProvider>
  );
}
