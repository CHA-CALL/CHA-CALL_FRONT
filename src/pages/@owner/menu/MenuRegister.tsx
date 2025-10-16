import { useNavigate, useParams } from 'react-router-dom';
import Button from '@components/button/Button';
import MenuForm from '@pages/@owner/menu/components/MenuForm';
import { useMenuForm, type MenuFormData } from '@pages/@owner/menu/hooks/use-menu-form';
import { useRegisterMenu } from '@pages/@owner/menu/hooks/use-menu-register';
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
  } = useMenuForm();

  const { mutate: registerMenu } = useRegisterMenu(parsedFoodTruckId);

  if (!foodTruckId || isNaN(parsedFoodTruckId)) {
    alert('잘못된 접근입니다.');
    navigate(-1);
    return null;
  }

  const onSubmit = (formData: MenuFormData) => {
    if (!formData.image) return;

    registerMenu({
      name: formData.name,
      description: formData.description,
      price: Number(formData.price.replace(/,/g, '')),
      photoUrl: formData.image.name,
    }, {
      onSuccess: () => {
        toast.success('메뉴가 등록되었습니다.');
      },
      onError: () => {
        toast.error('메뉴 등록에 실패했습니다.');
      },
    });
  };

  return (
    <MenuForm
      formData={formData}
      errors={errors}
      updateName={updateName}
      updateDescription={updateDescription}
      updatePrice={updatePrice}
      updateImage={updateImage}
      footerContent={
        <div className='flex flex-col gap-[1.7rem]'>
          <span className='caption-m-12 text-grayscale-300'>
            1280 x 960 (가로x세로) 사이즈 이상, 5MB 이하의 JPG/PNG으로만 첨부가 가능합니다.
          </span>
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
