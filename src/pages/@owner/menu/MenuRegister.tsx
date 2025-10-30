import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import Button from '@components/button/Button';
import MenuForm from '@pages/@owner/menu/components/MenuForm';
import { useFormValidation } from '@pages/@owner/menu/hooks/use-form-validation';
import { useRegisterMenu } from '@pages/@owner/menu/hooks/use-menu-register';
import { FormProvider } from 'react-hook-form';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';

export default function MenuRegister() {
  const navigate = useNavigate();

  const { foodTruckId } = useParams<{ foodTruckId: string }>();
  const parsedFoodTruckId = Number(foodTruckId);

  const handleRegisterSubmit = useRegisterMenu(parsedFoodTruckId);

  const {
    methods,
    updateName,
    updateDescription,
    updatePrice,
    updateImageUrl,
    isValid,
  } = useFormValidation();

  return (
    <FormProvider {...methods}>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={() => navigate(ROUTES.MENU_LIST(foodTruckId || ''))}
        text='메뉴 등록'
      />

      <MenuForm
        updateName={updateName}
        updateDescription={updateDescription}
        updatePrice={updatePrice}
        updateImageUrl={updateImageUrl}
      />

      <footer className='fixed-center bottom-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
        <div className='flex flex-col gap-[1.7rem]'>
          <Button
            variant='cta'
            buttonStyle={isValid ? 'active' : 'disabled'}
            handleClickButton={methods.handleSubmit(handleRegisterSubmit)}
          >
            저장하기
          </Button>
        </div>
      </footer>
    </FormProvider>
  );
}
