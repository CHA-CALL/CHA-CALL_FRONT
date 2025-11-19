import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { ROUTES } from '@router/constant/routes';
import FormLayout from '@components/layout/form-layout/FormLayout';
import PageSwitchButton from '@pages/@owner/food-truck-form/components/PageSwitchButton';
import type { FoodTruckFormData } from '@pages/@owner/food-truck-form/utils/use-food-truck-form';
import { FOOD_TRUCK_ERROR_MESSAGE } from '@pages/@owner/food-truck-form/constants/food-truck';
import { getNavigateState } from '@pages/@owner/food-truck-form/utils/navigate-state';

export default function MenuInfo() {
  const navigate = useNavigate();

  const { watch } = useFormContext<FoodTruckFormData>();
  const formData = watch();
  const handleClick = () => {
    navigate(ROUTES.MENU_LIST, {
      state: getNavigateState(formData),
    });
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
