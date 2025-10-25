import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FormProvider, useFormContext } from 'react-hook-form';

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
} from '@pages/@owner/food-truck-form/@section/basic-info-section';
import {
  ActiveTime,
  ActiveDate,
} from '@pages/@owner/food-truck-form/@section/time-section';
import {
  AvailableQuantity,
  NeedElectricity,
  PaymentMethod,
} from './@section/category-section';
import { MenuCategory } from './@section/category-section';
import { createFoodTruckFormMethods } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import RegionSection from '@pages/@owner/food-truck-form/@section/RegionSection';
import MenuInfo from '@pages/@owner/food-truck-form/@section/menu-section/MenuInfo';

// 메인 컴포넌트
export default function FoodTruckForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: id 값이 있을 시 푸드트럭 정보 가져오기
  const methods = createFoodTruckFormMethods(undefined);

  // 업로드 페이지에서 돌아온 경우 폼 데이터 업데이트
  useEffect(() => {
    if (location.state?.formData && location.state?.fromUpload) {
      methods.reset(location.state.formData);
    }
  }, [location.state, methods]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
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
        <MenuCategory />
        <MenuInfo />
        <FoodTruckPhoto />

        <ActiveDate />

        <FoodTruckOperatingInfo />
        <FoodTruckOption />
      </div>

      <footer className='fixed bottom-[0] mx-auto w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]'>
        <SubmitButton />
      </footer>
    </FormProvider>
  );
}

// 제출 버튼 컴포넌트
function SubmitButton() {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext();

  const onSubmit = async (data: any) => {
    if (isValid && data) {
      // TODO: 폼 제출 로직
    }
  };

  return (
    <Button
      variant='cta'
      buttonStyle={isValid ? 'active' : 'disabled'}
      handleClickButton={handleSubmit(onSubmit)}
      disabled={!isValid}
    >
      저장하기
    </Button>
  );
}
