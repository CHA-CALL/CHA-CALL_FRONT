import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import Button from '@components/button/Button';
import MenuForm from '@pages/@owner/menu/components/MenuForm';
import { useFormValidation, type MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';
import { useRegisterMenu } from '@pages/@owner/menu/hooks/use-menu-register';
import { useMenuImage } from '@pages/@owner/menu/hooks/use-menu-image';
import { uploadImage } from '@pages/@owner/menu/api';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import useToast from '@shared/hooks/use-toast';

export default function MenuRegister() {
  const navigate = useNavigate();
  const toast = useToast();

  const { foodTruckId } = useParams<{ foodTruckId: string }>();
  const parsedFoodTruckId = Number(foodTruckId);

  const {
    formData,
    errors,
    updateName,
    updateDescription,
    updatePrice,
    updateImage,
    isValid,
    handleSubmit,
  } = useFormValidation();

  const {
    imageUrl,
    canAdd,
    handleFileChange,
    handleRemoveFile,
    handleClearName,
    handleClickBack,
  } = useMenuForm({
    foodTruckId: foodTruckId || '',
    formData,
    updateName,
    updateImage,
  });

  const { mutate: registerMenu } = useRegisterMenu(parsedFoodTruckId);
  const { mutateAsync: getPresignedUrl } = useMenuImage();

  if (!foodTruckId || isNaN(parsedFoodTruckId)) {
    alert('잘못된 접근입니다.');
    navigate(ROUTES.MENU_LIST(parsedFoodTruckId.toString()));
    return null;
  }

  const onSubmit = async (formData: MenuFormData) => {
    if (!formData.image) return;

    try {
      const fileExtension = formData.image.name.split('.').pop() || '';
      const imageInfo = await getPresignedUrl(fileExtension);

      await uploadImage(imageInfo.presignedUrl!, formData.image);

      registerMenu({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price.replace(/,/g, '')),
        photoUrl: imageInfo.fileUrl!,
      }, {
        onSuccess: () => {
          toast.success('메뉴가 등록되었습니다.');
        },
        onError: () => {
          toast.error('메뉴 등록에 실패했습니다.');
        },
      });
    } catch (error) {
      console.error('메뉴 등록에 실패했습니다.:', error);
    }
  };

  return (
    <MenuForm
      formData={formData}
      errors={errors}
      imageUrl={imageUrl}
      canAdd={canAdd}
      handleFileChange={handleFileChange}
      handleRemoveFile={handleRemoveFile}
      handleClickBack={handleClickBack}
      handleClearName={handleClearName}
      updateName={updateName}
      updateDescription={updateDescription}
      updatePrice={updatePrice}
      footerContent={
        <div className='flex flex-col gap-[1.7rem]'>
          <Button
            variant='cta'
            buttonStyle={isValid ? 'active' : 'disabled'}
            handleClickButton={handleSubmit(onSubmit)}
          >
            저장하기
          </Button>
        </div>
      }
    />
  );
}
