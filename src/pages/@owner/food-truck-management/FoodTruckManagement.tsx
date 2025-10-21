import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

import Navigation from '@shared/components/navigation/Navigation';
import { Icon } from '@shared/components/icon/Icon';
import Information from '@shared/components/information/Information';
import Button from '@shared/components/button/Button';
import { useGetOwnerFoodTrucks } from '@pages/@owner/food-truck-management/hooks/use-food-truck-list';
import { cn } from '@shared/utils/cn';
import { ROUTES } from '@router/constant/routes';
import DeleteFoodTruckConfirm from '@pages/@owner/food-truck-management/@modal/(.)delete-food-truck-confirm-modal/DeleteFoodTruckConfirmModal';
import Loading from '@shared/components/loading/Loading';
import FoodTruckCard from '@shared/components/food-truck-card/FoodTruckCard';
import { useFoodTruckDelete } from '@pages/@owner/food-truck-management/hooks/use-food-truck-delete';
import Spinner from '@shared/components/spinner/Spinner';

export default function FoodTruckManagement() {
  const navigate = useNavigate();
  const { ref: listBottomRef, inView } = useInView();

  const handleNavigateBack = () => {
    navigate(-1);
  };
  const handleNavigateToAdd = () => {
    navigate(ROUTES.UPLOAD_FOOD_TRUCK);
  };

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetOwnerFoodTrucks();

  const allFoodTrucks = data?.pages.flatMap(page => page?.content || []) || [];

  const {
    deleteFoodTruckIds,
    handleClickFoodTruck,
    handleDeleteFoodTrucks,
    isDeleteConfirmModalOpen,
    handleConfirmModal,
    isEditing,
    handleToggleEditing,
  } = useFoodTruckDelete();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DeleteFoodTruckConfirm
        isOpen={isDeleteConfirmModalOpen}
        handleClose={handleConfirmModal}
        handleClickConfirm={handleDeleteFoodTrucks}
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
            편집
          </Button>
        }
      />
      <div
        className={cn(
          'flex flex-col',
          allFoodTrucks.length > 0 && 'pb-[10rem]'
        )}
      >
        <div className='fixed-center top-0 bg-white px-[2rem] py-[2rem]'>
          <Information
            iconId='ic_chat_dot'
            text='푸드트럭 노출 상태를 ON/OFF 버튼으로 조정해보세요!'
          />
        </div>
        <div className='mt-[8rem] flex flex-col'>
          {allFoodTrucks.length > 0 &&
            allFoodTrucks.map(item => (
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
          allFoodTrucks.length > 0 &&
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
          {isEditing ? '삭제하기' : '+ 추가하기'}
        </Button>
      </footer>
    </>
  );
}
