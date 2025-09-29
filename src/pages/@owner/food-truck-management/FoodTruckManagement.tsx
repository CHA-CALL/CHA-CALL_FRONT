import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import { useNavigate } from 'react-router-dom';
import Information from '@shared/components/information/Information';
import Button from '@shared/components/button/Button';
import { mockup } from '@pages/@owner/food-truck-management/mockup';
import { cn } from '@shared/utils/cn';
import { ROUTES } from '@router/constant/routes';
import { useState, useEffect } from 'react';
import DeleteFoodTruckBottomSheet from '@pages/@owner/food-truck-management/@modal/(.)delete-food-truck-bottom-sheet/DeleteFoodTruckBottomSheet';
import DeleteFoodTruckConfirm from '@pages/@owner/food-truck-management/@modal/(.)delete-food-truck-confirm-modal/DeleteFoodTruckConfirmModal';

export default function FoodTruckManagement() {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };
  const handleNavigateToAdd = () => {
    navigate(ROUTES.UPLOAD_FOOD_TRUCK);
  };
  const data = mockup;
  const [isDeleteBottomSheetOpen, setIsDeleteBottomSheetOpen] = useState(false);
  const handleCloseDeleteBottomSheet = () => {
    setIsDeleteBottomSheetOpen(false);
  };
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOpenDeleteConfirm = () => {
    setIsDeleteConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    //TODO: API 연동
    setIsDeleteConfirmModalOpen(false);
    setIsDeleteBottomSheetOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmModalOpen(false);
    setIsDeleteBottomSheetOpen(false);
  };

  useEffect(() => {
    const checkScrollbar = () => {
      const hasScrollbar =
        document.documentElement.scrollHeight > window.innerHeight;
      setIsScrolled(hasScrollbar);
    };

    checkScrollbar();

    window.addEventListener('resize', checkScrollbar);
    return () => {
      window.removeEventListener('resize', checkScrollbar);
    };
  }, [data]);

  return (
    <>
      {isDeleteBottomSheetOpen && (
        <DeleteFoodTruckBottomSheet
          isOpen={isDeleteBottomSheetOpen}
          handleClose={handleCloseDeleteBottomSheet}
          handleDeleteFoodTruck={handleOpenDeleteConfirm}
        />
      )}
      {isDeleteConfirmModalOpen && (
        <DeleteFoodTruckConfirm
          handleClickConfirm={handleConfirmDelete}
          isOpen={isDeleteConfirmModalOpen}
          handleClose={handleCancelDelete}
        />
      )}
      <Navigation
        text='나의 푸드트럭 관리'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleNavigateBack}
      />
      <div
        className={cn(
          'flex flex-col gap-[1.6rem] p-[2rem]',
          data.length > 0 && 'pb-[10rem]'
        )}
      >
        <Information
          iconId='ic_chat_dot'
          text='푸드트럭을 등록하고 의뢰를 받아보세요!'
        />
        <div className='flex flex-col gap-[2rem]'>
          {data &&
            data.map((item, index) => (
              <div key={item.id}>
                <div className={cn(index !== 0 && 'mt-[2rem]')}>
                  <p>{item.name}</p>
                </div>
                {index !== data.length - 1 && (
                  <div className='bg-grayscale-100 h-[0.1rem] w-full' />
                )}
              </div>
            ))}
        </div>
      </div>

      <footer
        className={cn(
          data.length > 0 &&
            'fixed bottom-[0] mx-auto w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]',
          'px-[2rem]',
          isScrolled && 'shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)]'
        )}
      >
        <Button
          variant='default'
          buttonStyle='large'
          handleClickButton={handleNavigateToAdd}
          className='rounded-[1.6rem]'
        >
          + 추가하기
        </Button>
      </footer>
    </>
  );
}
