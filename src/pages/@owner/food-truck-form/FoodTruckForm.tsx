import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import Button from '@shared/components/button/Button';
import {
  FoodTruckName,
  FoodTruckDescription,
  FoodTruckPhoneNumber,
  FoodTruckOperatingInfo,
  FoodTruckOption,
  FoodTruckPhoto,
} from '@pages/@owner/food-truck-form/@section/basic-info-section/index';
import {
  ActiveTime,
  ActiveDate,
} from '@pages/@owner/food-truck-form/@section/time-section/index';
import {
  AvailableQuantity,
  NeedElectricity,
  PaymentMethod,
} from '@pages/@owner/food-truck-form/@section/category-section/index';
import { MenuCategory } from '@pages/@owner/food-truck-form/@section/category-section';
import { useFoodTruckForm } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import RegionSection from '@pages/@owner/food-truck-form/@section/region-section/RegionSection';
import MenuInfo from '@pages/@owner/food-truck-form/@section/menu-section/MenuInfo';

// 메인 컴포넌트
export default function FoodTruckForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: id 값이 있을 시 푸드트럭 정보 가져오기
  const methods = useFoodTruckForm();

  useEffect(() => {
    if (location.state?.formData && location.state?.from) {
      methods.reset(location.state.formData);
    }
  }, [location.state]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <FormProvider {...methods.methods}>
      <Navigation
        text={isEditMode ? '나의 푸드트럭 수정' : '나의 푸드트럭 등록'}
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleNavigateBack}
      />
      <div className='flex flex-col px-[2rem] pb-[12rem]'>
        <FoodTruckName />
        <FoodTruckDescription />
        <FoodTruckPhoneNumber />
        <ActiveTime />
        <RegionSection />

        <MenuCategory />
        <AvailableQuantity />
        <NeedElectricity />
        <PaymentMethod />
        <MenuInfo />
        <FoodTruckPhoto />

        <ActiveDate />

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
