import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Button from '@components/button/Button';
import { useFormValidation, type MenuFormData } from '@pages/@owner/menu/hooks/use-form-validation';
import MenuForm from '@pages/@owner/menu/components/MenuForm';
import MenuDeleteModal from '@pages/@owner/menu/components/MenuDeleteModal';
import { convertURLtoFile } from '@pages/@owner/menu/utils/convert-image-url';
import { useEditMenu } from '@pages/@owner/menu/hooks/use-menu-edit';
import { useDeleteMenu } from '@pages/@owner/menu/hooks/use-menu-delete';
import { useMenuImage } from '@pages/@owner/menu/hooks/use-menu-image';
import { uploadImage } from '@pages/@owner/menu/api';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import useToast from '@shared/hooks/use-toast';

export default function MenuEdit() {
  const location = useLocation();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { foodTruckId, menuId } = useParams<{ foodTruckId: string, menuId: string }>();
  const { mutate: editMenu } = useEditMenu(Number(foodTruckId), Number(menuId));
  const { mutate: deleteMenu } = useDeleteMenu(Number(foodTruckId), Number(menuId));

  const menuData = location.state?.menuData;
  const { mutateAsync: getPresignedUrl } = useMenuImage();

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
    initialImageUrl: menuData?.imageUrl,
    formData,
    updateName,
    updateImage,
  });

  const onSubmit = async (formData: MenuFormData) => {
    if (!formData.image) return;

    try {
      const fileExtension = formData.image.name.split('.').pop() || '';
      const imageInfo = await getPresignedUrl(fileExtension);

      await uploadImage(imageInfo.presignedUrl!, formData.image);

      editMenu({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price.replace(/,/g, '')),
        photoUrl: imageInfo.fileUrl!,
      }, {
        onSuccess: () => {
          toast.success('메뉴가 수정되었습니다.');
        },
        onError: () => {
          toast.error('메뉴 수정에 실패했습니다.');
        },
      });
    } catch (error) {
      console.error('메뉴 수정에 실패했습니다.:', error);
    }
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
        const formattedPrice = menuData.price
          ? Number(menuData.price.replace(/\D/g, '')).toLocaleString()
          : '';
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
      <MenuDeleteModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleConfirmDelete={handleConfirmDelete}
      />

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
