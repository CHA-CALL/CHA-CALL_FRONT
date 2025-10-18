import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import Information from '@shared/components/information/Information';
import Button from '@shared/components/button/Button';
import { useGetOwnerFoodTrucks } from '@pages/@owner/food-truck-management/hooks/use-food-truck-list';
import { cn } from '@shared/utils/cn';
import { ROUTES } from '@router/constant/routes';

import DeleteFoodTruckBottomSheet from '@pages/@owner/food-truck-management/@modal/(.)delete-food-truck-bottom-sheet/DeleteFoodTruckBottomSheet';
import DeleteFoodTruckConfirm from '@pages/@owner/food-truck-management/@modal/(.)delete-food-truck-confirm-modal/DeleteFoodTruckConfirmModal';

export default function FoodTruckManagement() {
  const navigate = useNavigate();
  const { ref: listBottomRef, inView } = useInView();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  const handleNavigateToAdd = () => {
    navigate(ROUTES.UPLOAD_FOOD_TRUCK);
  };

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetOwnerFoodTrucks();

  // 모든 페이지의 데이터를 하나의 배열로 합치기
  const allFoodTrucks = data?.pages.flatMap(page => page?.content || []) || [];

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
    setIsDeleteConfirmModalOpen(false);
    setIsDeleteBottomSheetOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmModalOpen(false);
    setIsDeleteBottomSheetOpen(false);
  };

  // 무한 스크롤 처리
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
          allFoodTrucks.length > 0 && 'pb-[10rem]'
        )}
      >
        <div className='fixed-center top-0 bg-white px-[2rem] pb-[1.6rem] pt-[2rem]'>
          <Information
            iconId='ic_chat_dot'
            text='푸드트럭 노출 상태를 ON/OFF 버튼으로 조정해보세요!'
          />
        </div>
        <div className='mt-[8rem] flex flex-col gap-[2rem]'>
          {isLoading ? (
            <div className='flex justify-center py-[4rem]'>
              <p className='text-grayscale-500'>로딩 중...</p>
            </div>
          ) : isError ? (
            <div className='flex justify-center py-[4rem]'>
              <p className='text-red-500'>
                데이터를 불러오는 중 오류가 발생했습니다.
              </p>
            </div>
          ) : allFoodTrucks.length === 0 ? (
            <div className='flex justify-center py-[4rem]'>
              <p className='text-grayscale-500'>등록된 푸드트럭이 없습니다.</p>
            </div>
          ) : (
            allFoodTrucks.map((item, index) => (
              <div key={item.foodTruckId}>
                <div className={cn(index !== 0 && 'mt-[2rem]')}>
                  <p>{item.name}</p>
                </div>
                {index !== allFoodTrucks.length - 1 && (
                  <div className='bg-grayscale-100 h-[0.1rem] w-full' />
                )}
              </div>
            ))
          )}

          {/* 무한 스크롤 트리거 요소 */}
          <div ref={listBottomRef} className='h-[1px]' />

          {/* 무한 스크롤 로딩 인디케이터 */}
          {isFetchingNextPage && (
            <div className='flex justify-center py-[2rem]'>
              <p className='text-grayscale-500'>
                더 많은 데이터를 불러오는 중...
              </p>
            </div>
          )}
        </div>
      </div>

      <footer
        className={cn(
          allFoodTrucks.length > 0 &&
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
