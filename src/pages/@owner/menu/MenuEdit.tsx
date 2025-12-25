import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navigation from '@components/layout/navigation/Navigation';
import Button from '@components/ui/button/Button';
import { Icon } from '@components/icon/Icon';
import { convertURLtoFile } from '@utils/convert-image-url';
import useToast from '@shared/hooks/use-toast';
import { FormProvider } from 'react-hook-form';
import { MenuDeleteModal, MenuForm } from '@pages/@owner/menu/components';
import { useEditMenu, useFormValidation } from '@pages/@owner/menu/hooks';

export default function MenuEdit() {
  const location = useLocation();
  const toast = useToast();

  const isInitialized = useRef(false);

  const { foodTruckId, menuId } = useParams<{
    foodTruckId: string;
    menuId: string;
  }>();
  const parsedFoodTruckId = Number(foodTruckId);
  const parsedMenuId = Number(menuId);

  const menuData = location.state?.menuData;
  const [initialImageUrl, setInitialImageUrl] = useState(menuData?.imageUrl);

  const {
    methods,
    updateName,
    updateDescription,
    updatePrice,
    updateImageUrl,
  } = useFormValidation();

  const { isDirty, isValid } = methods.formState;

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
        centerContent='메뉴 수정'
      />
      <MenuForm
        initialImageUrl={initialImageUrl}
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
            buttonStyle={isDirty && isValid ? 'active' : 'disabled'}
            handleClickButton={methods.handleSubmit(handleEditSubmit)}
          >
            저장하기
          </Button>
        </div>
      </footer>
    </FormProvider>
  );
}
