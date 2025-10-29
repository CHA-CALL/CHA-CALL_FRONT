import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import Button from '@components/button/Button';
import MenuForm from '@pages/@owner/menu/components/MenuForm';
import { useFormValidation, type MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';
import { useRegisterMenu } from '@pages/@owner/menu/hooks/use-menu-register';
import { uploadImage, getPresignedUrl } from '@pages/@owner/menu/api';
import useToast from '@shared/hooks/use-toast';
import { FormProvider } from 'react-hook-form';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';

export default function MenuRegister() {
  const navigate = useNavigate();
  const toast = useToast();

  const { foodTruckId } = useParams<{ foodTruckId: string }>();
  const parsedFoodTruckId = Number(foodTruckId);

  const {
    methods,
    updateName,
    updateDescription,
    updatePrice,
    updateImageUrl,
    isValid,
  } = useFormValidation();
  const { mutate: registerMenu } = useRegisterMenu(parsedFoodTruckId);

  const onSubmit = async (formData: MenuFormData) => {
    if (!formData.imageUrl) {
      toast.error('이미지를 업로드해주세요.');
      return;
    }

    try {
      const fileExtension = formData.imageUrl.name.split('.').pop() || '';
      const imageInfo = await getPresignedUrl(fileExtension);

      if (!imageInfo.presignedUrl || !imageInfo.fileUrl) {
        toast.error('이미지 업로드 URL을 가져오는데 실패했습니다.');
        return;
      }

      await uploadImage(imageInfo.presignedUrl, formData.imageUrl);

      registerMenu({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price.replace(/,/g, '')),
        photoUrl: imageInfo.fileUrl,
      }, {
        onSuccess: () => {
          toast.success('메뉴가 등록되었습니다.');
        },
        onError: () => {
          toast.error('메뉴 등록에 실패했습니다.');
        },
      });
    } catch {
      toast.error('메뉴 등록 중 오류가 발생했습니다.');
    }
  };

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
            handleClickButton={methods.handleSubmit(onSubmit)}
          >
            저장하기
          </Button>
        </div>
      </footer>
    </FormProvider>
  );
}
