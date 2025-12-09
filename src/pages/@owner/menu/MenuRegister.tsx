import { useParams } from 'react-router-dom';
import Navigation from '@components/layout/navigation/Navigation';
import Button from '@components/ui/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import { FormProvider } from 'react-hook-form';
import { useFormValidation, useRegisterMenu } from '@pages/@owner/menu/hooks';
import { MenuForm } from '@pages/@owner/menu/components';

export default function MenuRegister() {
  const { foodTruckId } = useParams<{ foodTruckId: string }>();
  const parsedFoodTruckId = Number(foodTruckId);

  const { handleRegisterSubmit, handleClickBack } =
    useRegisterMenu(parsedFoodTruckId);

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
        handleLeftClick={handleClickBack}
        centerContent='메뉴 등록'
      />

      <MenuForm
        updateName={updateName}
        updateDescription={updateDescription}
        updatePrice={updatePrice}
        updateImageUrl={updateImageUrl}
      />

      <footer className='fixed-center bottom-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={isValid ? 'active' : 'disabled'}
          handleClickButton={methods.handleSubmit(handleRegisterSubmit)}
        >
          저장하기
        </Button>
      </footer>
    </FormProvider>
  );
}
