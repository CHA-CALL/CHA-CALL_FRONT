import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import Information from '@shared/components/information/Information';
import Button from '@shared/components/button/Button';
import { mockup } from '@pages/@owner/food-truck-management/mockup';
import { cn } from '@shared/utils/cn';
import { ROUTES } from '@router/constant/routes';

import DeleteFoodTruckBottomSheet from '@pages/@owner/food-truck-management/@modal/(.)delete-food-truck-bottom-sheet/DeleteFoodTruckBottomSheet';
import DeleteFoodTruckConfirm from '@pages/@owner/food-truck-management/@modal/(.)delete-food-truck-confirm-modal/DeleteFoodTruckConfirmModal';

export default function FoodTruckManagement() {
  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };
  const handleNavigateToAdd = () => {
    navigate(ROUTES.FOOD_TRUCK_FORM);
  };
  const data = mockup;
  const [isDeleteBottomSheetOpen, setIsDeleteBottomSheetOpen] = useState(false);
  const handleCloseDeleteBottomSheet = () => {
    setIsDeleteBottomSheetOpen(false);
  };
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);

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

  return (
    <>
      <DeleteFoodTruckBottomSheet
        isOpen={isDeleteBottomSheetOpen}
        handleClose={handleCloseDeleteBottomSheet}
        handleDeleteFoodTruck={handleOpenDeleteConfirm}
      />
      <DeleteFoodTruckConfirm
        handleClickConfirm={handleConfirmDelete}
        isOpen={isDeleteConfirmModalOpen}
        handleClose={handleCancelDelete}
      />
      <Navigation
        text='나의 푸드트럭 관리'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleNavigateBack}
      />
      <div
        className={cn(
          'flex flex-col px-[2rem]',
          data.length > 0 && 'pb-[10rem]'
        )}
      >
        <div className='fixed-center top-0 bg-white px-[2rem] pb-[1.6rem] pt-[2rem]'>
          <Information
            iconId='ic_chat_dot'
            text='푸드트럭 노출 상태를 ON/OFF 버튼으로 조정해보세요!'
          />
        </div>
        <div className='mt-[8rem] flex flex-col gap-[2rem]'>
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
          'px-[2rem]'
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
