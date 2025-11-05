import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Button from '@components/button/Button';
import { useFormValidation } from '@pages/@owner/menu/hooks/use-form-validation';
import MenuForm from '@pages/@owner/menu/components/MenuForm';
import MenuDeleteModal from '@pages/@owner/menu/components/MenuDeleteModal';
import { convertURLtoFile } from '@pages/@owner/menu/utils/convert-image-url';
import { useEditMenu } from '@pages/@owner/menu/hooks/use-menu-edit';
import useToast from '@shared/hooks/use-toast';
import { FormProvider } from 'react-hook-form';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';

export default function MenuEdit() {
  const location = useLocation();
  const toast = useToast();

  const isInitialized = useRef(false);

  const { foodTruckId, menuId } = useParams<{ foodTruckId: string, menuId: string }>();
  const parsedFoodTruckId = Number(foodTruckId);
  const parsedMenuId = Number(menuId);

  const menuData = location.state?.menuData;
  const [initialImageUrl, setInitialImageUrl] = useState(menuData?.imageUrl);

  const {
    methods,
    displayPrice,
    updateName,
    updateDescription,
    updatePrice,
    updateImageUrl
  } = useFormValidation();

  const {
    isModalOpen,
    handleEditSubmit,
    handleConfirmDelete,
    handleCloseModal,
    handleClickDelete,
    handleClickBack,
   } = useEditMenu(parsedFoodTruckId, parsedMenuId);

  useEffect(() => {
    if (menuData && !isInitialized.current) {
      const setInitialData = async () => {
        try {
          const imageFile = menuData.imageUrl
            ? await convertURLtoFile(menuData.imageUrl)
            : undefined;

          methods.reset({
            name: menuData.name,
            description: menuData.description,
            price: menuData.price,
            imageUrl: imageFile,
          });

          isInitialized.current = true;

          if (imageFile) {
            setInitialImageUrl(undefined);
          }
        } catch (error) {
          console.error('이미지를 파일로 변환하는 데 실패했습니다:', error);
          toast.error('메뉴 정보를 불러오는 데 실패했습니다.');
        }
      };
      setInitialData();
    }
  }, [menuData, methods, toast]);

  return (
    <FormProvider {...methods}>
      <MenuDeleteModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleConfirmDelete={handleConfirmDelete}
      />

      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />
      <MenuForm
        initialImageUrl={initialImageUrl}
        displayPrice={displayPrice}
        updateName={updateName}
        updateDescription={updateDescription}
        updatePrice={updatePrice}
        updateImageUrl={updateImageUrl}
      />
      <footer className='fixed-center bottom-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
        <div className='flex gap-[1rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleClickDelete}
            className='w-[50%]'
          >
            삭제
          </Button>
          <Button
            variant='cta'
            buttonStyle={methods.formState.isValid ? 'active' : 'disabled'}
            handleClickButton={methods.handleSubmit(handleEditSubmit)}
          >
            저장하기
          </Button>
        </div>
      </footer>
    </FormProvider>
  );
}
