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
  ActiveTime,
  ActiveDate,
} from '@pages/@owner/food-truck-form/@section/time-section/index';
import {
  AvailableQuantity,
  NeedElectricity,
  PaymentMethod,
} from '@pages/@owner/food-truck-form/@section/category-section/index';
import { MenuCategory } from '@pages/@owner/food-truck-form/@section/category-section';
import RegionSection from '@pages/@owner/food-truck-form/@section/region-section/RegionSection';
import MenuInfo from '@pages/@owner/food-truck-form/@section/menu-section/MenuInfo';
import { useFoodTruckForm } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import useFoodTruckDetail from '@pages/food-truck-detail/hooks/use-food-truck-detail';
import { ROUTES } from '@router/constant/routes';

// 메인 컴포넌트
export default function FoodTruckForm() {
  const { foodTruckId } = useParams();
  const foodTruckIdNumber = Number(foodTruckId);

  const navigate = useNavigate();
  const location = useLocation();

  // 서버에서 활동 가능 지역은 지역코드로 받아야함
  const { foodTruckDetailData } = useFoodTruckDetail(foodTruckIdNumber);

  // TODO: 등록된 정보가 있을 때, 푸드트럭 정보 가져오기
  const { isFormValid, reset, handleSubmit, ...methods } = useFoodTruckForm();

  useEffect(() => {
    if (location.state?.formData && location.state?.from) {
      reset(location.state.formData);
    }
  }, [location.state, reset]);

  const handleNavigateBack = () => {
    navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
  };

  return (
    <FormProvider {...methods.methods}>
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
        <ActiveTime />
        <RegionSection foodTruckId={foodTruckId} />

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
