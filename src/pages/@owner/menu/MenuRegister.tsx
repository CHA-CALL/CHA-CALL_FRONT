import { useNavigate } from 'react-router-dom';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import MenuNameInput from '@pages/@owner/menu/components/MenuNameInput';
import MenuDescInput from '@pages/@owner/menu/components/MenuDescInput';
import MenuPriceInput from '@pages/@owner/menu/components/MenuPriceInput';
import MenuImageInput from '@pages/@owner/menu/components/MenuImageInput';

export default function MenuRegister() {
  const navigate = useNavigate();

  const {
    formData,
    imageUrls,
    errors,
    isAllFieldsValid,
    updateName,
    updateDescription,
    updatePrice,
    addImage,
    removeImage,
    handleSubmit,
  } = useMenuForm();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickSubmit = handleSubmit((data) => {
    console.info('메뉴 등록 성공:', data);
    navigate(-1);
    // TODO: 메뉴 등록 API 호출
  });

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />

      <div className='flex flex-col p-[2rem]'>
        <MenuNameInput
          value={formData.name}
          error={errors.name}
          onChange={updateName}
        />

        <MenuDescInput
          value={formData.description}
          error={errors.description}
          onChange={updateDescription}
        />

        <MenuPriceInput
          value={formData.price}
          error={errors.price}
          onChange={updatePrice}
        />

        <MenuImageInput
          value={formData.images}
          error={Array.isArray(errors.images) ? errors.images[0] : errors.images}
          onChange={addImage}
          removeImage={removeImage}
          imageUrls={imageUrls}
        />
      </div>

      <footer className='fixed-center bottom-[0] w-full px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={isAllFieldsValid ? 'active' : 'disabled'}
          handleClickButton={handleClickSubmit}
        >
          저장하기
        </Button>
      </footer>
    </>
  );
}
