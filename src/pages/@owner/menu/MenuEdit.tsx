import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import Button from '@components/button/Button';
import Overlay from '@components/overlay/Overlay';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import MenuForm from '@pages/@owner/menu/components/MenuForm';

import { mockMenuData } from '@pages/@owner/menu/constant/mockUp';

const TEST_FOOD_TRUCK_ID = 1;

const convertURLtoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = data.type.split('/')[1] || 'jpg';
  const filename = url.split('/').pop() || `image.${ext}`;
  const metadata = { type: data.type };

  return new File([data], filename, metadata);
};

export default function MenuEdit() {
  const navigate = useNavigate();
  const { menuId } = useParams<{ menuId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: menuId를 사용해서 기존 메뉴 데이터 불러오기
  const menuData = mockMenuData.find(menu => menu.menuId === Number(menuId)) || mockMenuData[0];

  const initialData = {
    name: menuData.name || '',
    description: menuData.description || '',
    price: menuData.price || '',
    imageUrl: menuData.imageUrl || '',
  };

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
  } = useMenuForm(TEST_FOOD_TRUCK_ID, initialData);

  useEffect(() => {
    const loadImage = async () => {
      if (menuData?.imageUrl) {
        try {
          const file = await convertURLtoFile(menuData.imageUrl);
          reset({
            name: menuData.name,
            description: menuData.description,
            price: menuData.price,
            image: file,
          });
        } catch (error) {
          console.error("이미지 파일로 변환 실패.", error);
        }
      }
    };
    loadImage();
  }, [menuData, reset]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickDelete = () => {
    setIsModalOpen(true);
  };

  const handleClickUpdate = () => {
    handleSubmit();
    navigate(ROUTES.MENU_LIST);
  };

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
              handleClickButton={handleCloseModal}
              className='w-[12.4rem]'
            >
              삭제
            </Button>
          </div>
        </div>
      </Overlay>

      <MenuForm
        formData={formData}
        errors={errors}
        updateName={updateName}
        updateDescription={updateDescription}
        updatePrice={updatePrice}
        updateImage={updateImage}
        initialData={initialData}
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
              handleClickButton={handleClickUpdate}
            >
              저장하기
            </Button>
          </div>
        }
      />
    </>
  );
}
