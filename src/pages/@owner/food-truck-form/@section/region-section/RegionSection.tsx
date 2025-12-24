import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import FormLayout from '@components/layout/form-layout/FormLayout';
import { ROUTES } from '@router/constant/routes';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';
import { getNavigateState } from '@pages/@owner/food-truck-form/utils/navigate-state';
import { useRegion } from '@pages/@owner/set-region/hooks/use-region';
import RegionButton from '@pages/@owner/food-truck-form/components/RegionButton';
import useToast from '@hooks/use-toast';

interface RegionSectionProps {
  foodTruckId?: string;
}

export default function RegionSection({ foodTruckId }: RegionSectionProps) {
  const { watch } = useFormContext<FoodTruckFormData>();
  const navigate = useNavigate();
  const toast = useToast();
  const formData = watch();

  const handleClick = () => {
    if (!foodTruckId) {
      toast.error('잘못된 접근입니다.');
      navigate(ROUTES.FOOD_TRUCK_MANAGEMENT);
      return;
    }

    navigate(ROUTES.SET_REGION_FORM(foodTruckId), {
      state: getNavigateState(formData),
    });
  };
  const { regionCodes } = useRegion(foodTruckId);

  return (
    <FormLayout isRequired={true} title='활동 가능 지역'>
      <RegionButton
        text={
          regionCodes && regionCodes.length > 0
            ? regionCodes.map(region => region.name).join(', ')
            : ''
        }
        handleClick={handleClick}
      />
    </FormLayout>
  );
}
