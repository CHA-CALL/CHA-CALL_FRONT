import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Button from '@components/button/Button';
import Overlay from '@components/overlay/Overlay';
import { useMenuForm, type MenuFormData } from '@pages/@owner/menu/hooks/use-menu-form';
import MenuForm from '@pages/@owner/menu/components/MenuForm';
import { convertURLtoFile } from '@pages/@owner/menu/utils/convert-image-url';
import { useEditMenu } from '@pages/@owner/menu/hooks/use-menu-edit';
import { useDeleteMenu } from '@pages/@owner/menu/hooks/use-menu-delete';
import useToast from '@shared/hooks/use-toast';

export default function MenuEdit() {
  const location = useLocation();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { foodTruckId, menuId } = useParams<{ foodTruckId: string, menuId: string }>();
  const { mutate: editMenu } = useEditMenu(Number(foodTruckId), Number(menuId));
  const { mutate: deleteMenu } = useDeleteMenu(Number(foodTruckId), Number(menuId));

  const menuData = location.state?.menuData;

  const {
    formData,
    errors,
    updateName,
    updateDescription,
    updatePrice,
    updateImage,
    isValid,
    handleSubmit,
    reset,
  } = useMenuForm();

  const onSubmit = (formData: MenuFormData) => {
    if (!formData.image) return;

    editMenu({
      name: formData.name,
      description: formData.description,
      price: Number(formData.price.replace(/,/g, '')),
      photoUrl: formData.image.name,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMenu(undefined, {
      onSuccess: () => {
        toast.success('삭제되었습니다.');
      },
      onError: () => {
        toast.error('메뉴 삭제에 실패했습니다.');
      },
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (menuData) {
      const loadImage = async () => {
        const formattedPrice = Number(menuData.price.replace(/\D/g, '')).toLocaleString();
        let imageFile: File | undefined;

        try {
          // 이미지 URL을 File 객체로 변환
          if (menuData.imageUrl) {
            imageFile = await convertURLtoFile(menuData.imageUrl);
          }
        } catch (error) {
          console.error('이미지 파일로 변환 실패.', error);
        }

        reset({
          name: menuData.name,
          description: menuData.description,
          price: formattedPrice,
          image: imageFile,
        });
      };
      loadImage();
    }
  }, [menuData, reset]);

  return (
    <>
      <Overlay
        isOpen={isModalOpen}
        position='center'
        handleClose={handleCloseModal}
      >
        <div className='flex flex-col pt-[2.4rem] pb-[2rem] px-[2rem] rounded-[1.6rem] bg-white'>
          <span className='title-sb-16 text-grayscale-900'>
            이 메뉴를 삭제할까요?
          </span>
          <span className='caption-m-12 text-grayscale-700 mb-[1.6rem]'>
            삭제 후에는 되돌릴 수 없습니다.
          </span>
          <div className='flex gap-[1rem]'>
            <Button
              variant='cta'
              buttonStyle='sub'
              handleClickButton={handleCloseModal}
              className='w-[12.4rem]'
            >
              취소
            </Button>
            <Button
              variant='cta'
              buttonStyle='active'
              handleClickButton={handleConfirmDelete}
              className='w-[12.4rem]'
            >
              삭제
            </Button>
          </div>
        </div>
      </Overlay>

      <MenuForm
        initialImageUrl={menuData?.imageUrl}
        formData={formData}
        errors={errors}
        updateName={updateName}
        updateDescription={updateDescription}
        updatePrice={updatePrice}
        updateImage={updateImage}
        footerContent={
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
              buttonStyle={isValid ? 'active' : 'disabled'}
              handleClickButton={handleSubmit(onSubmit)}
            >
              저장하기
            </Button>
          </div>
        }
      />
    </>
  );
}
