import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';

import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import Region from '@shared/components/region/Region';
import { ROUTES } from '@router/constant/routes';
import { useRegion } from '@pages/@owner/set-region/hooks/use-region';
import { useFoodTruckForm } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';

export default function SetRegion() {
  const { foodTruckId } = useParams();
  const foodTruckIdNumber = Number(foodTruckId);
  const methods = useFoodTruckForm(foodTruckIdNumber);

  return (
    <FormProvider {...methods.methods}>
      <SetRegionContent />
    </FormProvider>
  );
}

function SetRegionContent() {
  const { foodTruckId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state.formData;

  const handleLeftClick = () => {
    if (!foodTruckId) {
      navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
      return;
    }
    const fromPage = location.state?.from;
    navigate(ROUTES.FOOD_TRUCK_FORM(foodTruckId), {
      state: {
        from: fromPage || 'food-truck-form',
        formData: formData,
      },
    });
  };

  const { handleSubmitRegion, handleResetRegionFoodTruck } = useRegion(
    formData,
    foodTruckId
  );

  return (
    <>
      <Navigation
        centerContent='활동 가능 지역 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleLeftClick}
      />
      <Region
        initialRegions={formData.regionCodes}
        handleConfirmRegion={handleSubmitRegion}
        handleResetRegion={handleResetRegionFoodTruck}
      />
    </>
  );
}
