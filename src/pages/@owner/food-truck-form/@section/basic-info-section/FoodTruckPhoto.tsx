import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import PageSwitchButton from '@pages/@owner/food-truck-form/components/PageSwitchButton';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import { ROUTES } from '@router/constant/routes';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import { getNavigateState } from '@pages/@owner/food-truck-form/utils/navigate-state';

export default function FoodTruckPhoto() {
  const { photoUrls } = useBasicInfo();
  const { watch } = useFormContext<FoodTruckFormData>();
  const navigate = useNavigate();
  const formData = watch();

  const handleClick = () => {
    navigate(ROUTES.UPLOAD_FOOD_TRUCK_IMAGES, {
      state: getNavigateState(formData),
    });
  };

  return (
    <FormLayout
      isRequired={true}
      title='푸드트럭 사진'
      description='첫번째 사진이 메인 사진으로 노출됩니다.'
    >
      {(() => {
        const hasPhotos = (photoUrls?.length ?? 0) > 0;
        return (
          <PageSwitchButton
            isSelected={hasPhotos}
            text={
              hasPhotos
                ? FOOD_TRUCK_ERROR_MESSAGE.photoUrls.success
                : FOOD_TRUCK_ERROR_MESSAGE.photoUrls.required
            }
            handleClick={handleClick}
          />
        );
      })()}
    </FormLayout>
  );
}
