import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import Button from '@components/button/Button';
import Overlay from '@components/overlay/Overlay';
import { useMenuForm } from '@pages/@owner/menu/hooks/use-menu-form';
import MenuForm from '@pages/@owner/menu/components/MenuForm';

import { mockMenuData } from '@pages/@owner/menu/constant/mockUp';

export default function MenuEdit() {
  const navigate = useNavigate();
  const { menuId } = useParams<{ menuId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isValid,
    handleSubmit,
    trigger,
  } = useMenuForm();

  // TODO: menuId를 사용해서 기존 메뉴 데이터 불러오기
  const menuData = mockMenuData.find(menu => menu.menuId === Number(menuId)) || mockMenuData[0];

  const initialData = {
    name: menuData.name || '',
    description: menuData.description || '',
    price: menuData.price || '',
    imageUrl: menuData.imageUrl || '',
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickDelete = () => {
    setIsModalOpen(true);
  };

  const handleClickUpdate = async () => {
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
