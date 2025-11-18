import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import type { MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';
import { useRegisterMenuMutation } from '@pages/@owner/menu/hooks/use-menu-mutations';

export const useRegisterMenu = (foodTruckId: number) => {
  const navigate = useNavigate();

  const { mutate: registerMenu } = useRegisterMenuMutation(foodTruckId);

  const handleRegisterSubmit = (formData: MenuFormData) => {
    registerMenu(formData);
  };

  const handleClickBack = () => {
    navigate(ROUTES.MENU_LIST(foodTruckId.toString()));
  };

  return {
    handleRegisterSubmit,
    handleClickBack,
  };
};
