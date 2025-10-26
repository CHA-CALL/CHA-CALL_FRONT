import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import PageSwitchButton from '@pages/@owner/food-truck-form/components/PageSwitchButton';
import { useBasicInfo } from '@pages/@owner/food-truck-form/hooks/use-basic-info';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import { ROUTES } from '@router/constant/routes';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';
import { getNavigateState } from '@pages/@owner/food-truck-form/utils/navigate-state';
import ErrorText from '@shared/components/error-text/ErrorText';

export default function FoodTruckPhoto() {
  const { photoUrls, photoUrlsError } = useBasicInfo();
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
      <PageSwitchButton
        isSelected={photoUrls.length > 0 ? true : false}
        text={
          photoUrls.length > 0
            ? FOOD_TRUCK_ERROR_MESSAGE.photoUrls.success
            : FOOD_TRUCK_ERROR_MESSAGE.photoUrls.required
        }
        handleClick={handleClick}
      />
      {photoUrlsError && <ErrorText text={photoUrlsError} />}
    </FormLayout>
  );
}
