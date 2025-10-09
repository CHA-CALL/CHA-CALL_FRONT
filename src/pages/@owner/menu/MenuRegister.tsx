import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import Button from '@components/button/Button';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import MenuForm from '@pages/@owner/menu/components/MenuForm';

const TEST_FOOD_TRUCK_ID = 1;

export default function MenuRegister() {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    updateName,
    updateDescription,
    updatePrice,
    updateImage,
    isValid,
    handleSubmit,
  } = useMenuForm(TEST_FOOD_TRUCK_ID);

  const handleClickSubmit = () => {
    handleSubmit();
    navigate(ROUTES.MENU_LIST);
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
            handleClickButton={handleClickSubmit}
          >
            저장하기
          </Button>
        </div>
      }
    />
  );
}
