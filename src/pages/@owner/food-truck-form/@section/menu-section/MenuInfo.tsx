import { useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { ROUTES } from '@router/constant/routes';
import FormLayout from '@pages/@owner/food-truck-form/components/FormLayout';
import PageSwitchButton from '@pages/@owner/food-truck-form/components/PageSwitchButton';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import { getNavigateState } from '@pages/@owner/food-truck-form/utils/navigate-state';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/schemas/food-truck-form.schema';

export default function MenuInfo() {
  const navigate = useNavigate();
  const { id: foodTruckId } = useParams<{ id: string }>();

  const { watch } = useFormContext<FoodTruckFormData>();
  const formData = watch();
  const handleClick = () => {
    if (foodTruckId) {
      navigate(ROUTES.MENU_LIST(foodTruckId), {
        state: getNavigateState(formData),
      });
    }
  };

  return (
    <FormLayout
      isRequired={true}
      title='메뉴 정보'
      description={FOOD_TRUCK_ERROR_MESSAGE.menus.required}
    >
      <PageSwitchButton
        isSelected={formData.menus}
        text={
          formData.menus
            ? FOOD_TRUCK_ERROR_MESSAGE.menus.success
            : FOOD_TRUCK_ERROR_MESSAGE.menus.required
        }
        handleClick={handleClick}
      />
    </FormLayout>
  );
}
