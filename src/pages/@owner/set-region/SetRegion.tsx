import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useFormContext } from 'react-hook-form';

import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import Region from '@shared/components/region/Region';
import { ROUTES } from '@router/constant/routes';
import { useRegion } from '@pages/@owner/set-region/hooks/use-region';
import {
  useFoodTruckForm,
  type FoodTruckFormData,
} from '@pages/@owner/food-truck-form/utils/use-food-truck-form';

export default function SetRegion() {
  const location = useLocation();
  const formData = location.state?.formData;
  const methods = useFoodTruckForm(formData);

  return (
    <FormProvider {...methods.methods}>
      <SetRegionContent />
    </FormProvider>
  );
}

function SetRegionContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getValues } = useFormContext<FoodTruckFormData>();

  const handleLeftClick = () => {
    const fromPage = location.state?.from;
    navigate(ROUTES.FOOD_TRUCK_FORM, {
      state: {
        from: fromPage || 'food-truck-form',
        formData: getValues(),
      },
    });
  };

  const { regionCodes, handleSubmitRegion, handleResetRegionFoodTruck } =
    useRegion();

  return (
    <>
      <Navigation
        text='활동 가능 지역 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleLeftClick}
      />
      <Region
        initialRegions={regionCodes}
        handleConfirmRegion={handleSubmitRegion}
        handleResetRegion={handleResetRegionFoodTruck}
      />
    </>
  );
}
