import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import Button from '@components/button/Button';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import MenuForm from '@pages/@owner/menu/components/MenuForm';

export default function MenuRegister() {
  const navigate = useNavigate();

  const {
    isValid,
    handleSubmit,
    trigger,
  } = useMenuForm();

  const handleClickSubmit = async () => {
    const isFormValid = await trigger();

    if (!isFormValid) {
      // TODO: 에러 처리
      return;
    }

    await handleSubmit();
    // TODO: 성공 처리
    navigate(ROUTES.MENU_LIST);
  };

  return (
    <MenuForm
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
