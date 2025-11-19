import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import FormLayout from '@components/layout/form-layout/FormLayout';
import { ROUTES } from '@router/constant/routes';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import { getNavigateState } from '@pages/@owner/food-truck-form/utils/navigate-state';
import { useRegion } from '@pages/@owner/set-region/hooks/use-region';
import RegionButton from '@pages/@owner/food-truck-form/components/RegionButton';

export default function RegionSection() {
  const { watch } = useFormContext<FoodTruckFormData>();
  const navigate = useNavigate();
  const formData = watch();

  const handleClick = () => {
    navigate(ROUTES.SET_REGION_FORM, {
      state: getNavigateState(formData),
    });
  };
  const { regionCodes } = useRegion();

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
