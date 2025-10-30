import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import Button from '@ui/button/Button';
import ButtonIcon from '@ui/button-icon/ButtonIcon';
import Tooltip from '@ui/tooltip/Tooltip';
import ButtonFloating from '@ui/button-floating/ButtonFloating';

import { FOOD_TRUCK_CATEGORIES } from '@constant/food-truck-categories';
import useReservation from '@pages/reservation/hooks/use-reservation';
import Loading from '@layout/loading/Loading';
import FoodTruckCard from '@components/food-truck/FoodTruckCard';
import FoodTruckEmptyView from '@pages/reservation/components/FoodTruckEmptyView';

export default function Reservation() {
  const {
    listBottomRef,
    isTooltipOpen,
    selectedCategory,
    locationName,
    notFiltered,
    isPending,
    foodTruckData,
    isFetchingNextPage,
    handleClickBack,
    handleClickLocation,
    handleClickFilter,
    handleClickFoodTruck,
    handleClickTooltip,
    handleClickChip,
    handleUpdateFoodTruckSaveStatus,
  } = useReservation();

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='예약하기'
      />
      <div className='border-b-grayscale-100 fixed-center z-50 flex items-center justify-between border-b bg-white px-[2rem] pb-[1rem] pt-[1.2rem]'>
        <button
          type='button'
          onClick={handleClickLocation}
          className='flex cursor-pointer items-center gap-[0.6rem]'
        >
          <Icon name='ic_locate' className='text-primary-700' />
          <span className='text-grayscale-900 body-m-14'>
            {locationName.length === 0 ? '전체' : locationName[0]}
            {locationName.length > 1 && ` 외 ${locationName.length - 1}곳`}
          </span>
          <Icon name='ic_down' />
        </button>

        <ButtonIcon
          icon='ic_filter'
          iconClassName={!notFiltered ? 'text-primary-700' : undefined}
          handleClick={handleClickFilter}
          className={cn(
            'flex h-[2.8rem] w-[2.8rem] items-center justify-center rounded-[0.4rem] border pl-[0.4rem] pt-[0.4rem]',
            !notFiltered
              ? 'border-primary-700 bg-primary-50'
              : 'border-grayscale-200'
          )}
        />

        {notFiltered && (
          <Tooltip
            text='맞춤조건을 설정할 수 있어요'
            isTooltipVisible={isTooltipOpen}
            handleCloseTooltip={handleClickTooltip}
            positionOffsetY={3.2}
            positionOffsetX={1.4}
            horizontalAlign='right'
            verticalAlign='bottom'
          />
        )}
      </div>

      <div
        className={`scrollbar-hide fixed-center top-[9.8rem] flex gap-[0.6rem] overflow-x-auto bg-white px-[2rem] py-[1.2rem]`}
      >
        {Object.values(FOOD_TRUCK_CATEGORIES).map(category => (
          <Button
            key={category}
            variant='chip'
            buttonStyle={
              selectedCategory === category ? 'selected1' : 'default'
            }
            handleClickButton={() => handleClickChip(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className='flex flex-col px-[2rem] pb-[6rem] pt-[12.6rem]'>
        {isPending && <Loading />}
        {!isPending && foodTruckData.length === 0 ? (
          <FoodTruckEmptyView />
        ) : (
          foodTruckData.map((item, index) => (
            <div key={item.foodTruckId}>
              <FoodTruckCard
                variant='foodtruckClient'
                data={item}
                handleClickCard={() => {
                  if (item.foodTruckId !== undefined) {
                    handleClickFoodTruck(item.foodTruckId);
                  }
                }}
                handleClickButton={() => {
                  if (
                    item.foodTruckId !== undefined &&
                    item.isSaved !== undefined
                  ) {
                    handleUpdateFoodTruckSaveStatus(
                      item.foodTruckId,
                      !item.isSaved
                    );
                  }
                }}
              />
              {index < foodTruckData.length - 1 && (
                <div className='bg-grayscale-100 mb-[2.2rem] mt-[2.4rem] h-[0.1rem] w-full' />
              )}
            </div>
          ))
        )}
      </div>

      <div ref={listBottomRef} className='h-[0.1rem] w-full' />
      {isFetchingNextPage && (
        <div className='text-grayscale-500 py-4 text-center'>
          더 불러오는 중…
        </div>
      )}

      <ButtonFloating />
    </>
  );
}
