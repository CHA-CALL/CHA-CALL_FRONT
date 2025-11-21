import Information from '@components/information/Information';
import Spinner from '@components/spinner/Spinner';
import ConfirmModal from '@components/ui/modal-confirm/ConfirmModal';
import useToast from '@hooks/use-toast';
import { Icon } from '@icon/Icon';
import Loading from '@layout/loading/Loading';
import Navigation from '@layout/navigation/Navigation';
import { useFoodTruckEditMode } from '@pages/@owner/food-truck-management/hooks/use-food-truck-edit-mode';
import { useGetOwnerFoodTrucks } from '@pages/@owner/food-truck-management/hooks/use-food-truck-list';
import { ROUTES } from '@router/constant/routes';
import FoodTruckCard from '@shared/components/food-truck/FoodTruckCard';
import Button from '@ui/button/Button';
import { cn } from '@utils/cn';
import type { MyFoodTruckResponse } from 'apis/data-contracts';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

export default function FoodTruckManagement() {
  const navigate = useNavigate();
  const { ref: listBottomRef, inView } = useInView();
  const toast = useToast();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  const handleNavigateToAdd = () => {
    navigate(ROUTES.FOOD_TRUCK_FORM);
  };

  const {
    foodTrucks,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
  } = useGetOwnerFoodTrucks();

  const {
    deleteFoodTruckIds,
    handleClickFoodTruck,
    handleDeleteFoodTrucks,
    isDeleteConfirmModalOpen,
    handleConfirmModal,
    isEditing,
    handleToggleEditing,
  } = useFoodTruckEditMode();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    toast.error('푸드트럭 목록을 불러오는 중에 오류가 발생했습니다.');
  }

  return (
    <>
      <ConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        handleClose={handleConfirmModal}
        title='이 푸드트럭을 삭제할까요?'
        description='삭제 후에는 되돌릴 수 없습니다.'
        confirmLabel='삭제'
        handleConfirm={handleDeleteFoodTrucks}
        handleCancel={handleConfirmModal}
      />
      <Navigation
        text='나의 푸드트럭 관리'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleNavigateBack}
        rightIcon={
          <Button
            variant='default'
            buttonStyle='edit'
            handleClickButton={handleToggleEditing}
          >
            {isEditing ? '선택해제' : '편집'}
          </Button>
        }
      />
      <div
        className={cn('flex flex-col', foodTrucks.length > 0 && 'pb-[10rem]')}
      >
        <div className='fixed-center top-0 bg-white px-[2rem] py-[2rem]'>
          <Information
            iconId='ic_chat_dot'
            text='푸드트럭 노출 상태를 ON/OFF 버튼으로 조정해보세요!'
          />
        </div>
        <div className='mt-[8rem] flex flex-col'>
          {foodTrucks.length > 0 &&
            foodTrucks.map((item: MyFoodTruckResponse) => (
              <FoodTruckCard
                variant='foodtruckProvider'
                isRemovable={isEditing}
                isRemove={deleteFoodTruckIds.includes(item.foodTruckId ?? 0)}
                isOn={item.status === 'ON'}
                key={item.foodTruckId}
                data={item}
                handleClickButton={() => {
                  handleClickFoodTruck(item.foodTruckId ?? 0);
                }}
                handleCardRemove={() => {
                  handleClickFoodTruck(item.foodTruckId ?? 0);
                }}
              />
            ))}

          <div ref={listBottomRef} className='h-[1px]' />

          {isFetchingNextPage && <Spinner />}
        </div>
      </div>

      <footer
        className={cn(
          foodTrucks.length > 0 &&
            'fixed bottom-[0] mx-auto w-full max-w-[60rem] bg-white px-[2rem] py-[1.7rem]',
          'px-[2rem]'
        )}
      >
        <Button
          variant='default'
          buttonStyle='large'
          handleClickButton={
            isEditing ? handleConfirmModal : handleNavigateToAdd
          }
          className='rounded-[1.6rem]'
        >
          {isEditing ? (
            '삭제하기'
          ) : (
            <div className='flex items-center justify-center gap-[0.8rem]'>
              <Icon name='ic_plus' className='h-[0.8rem] w-[0.8rem]' />
              <span> 추가하기</span>
            </div>
          )}
        </Button>
      </footer>
    </>
  );
}
