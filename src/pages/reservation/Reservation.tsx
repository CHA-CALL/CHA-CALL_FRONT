import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import ButtonIcon from '@components/button-icon/ButtonIcon';
import Tooltip from '@components/tooltip/Tooltip';
import ButtonFloating from '@components/button-floating/ButtonFloating';

// import FoodTruckItem from '@pages/reservation/components/FoodTruckItem';
import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/foodTruckCategory';
import useReservation from '@pages/reservation/hooks/use-reservation';

export default function Reservation() {
  const {
    isTooltipOpen,
    selectedCategory,
    locationName,
    notFiltered,
    // isLoading,
    foodTruckData,
    handleClickBack,
    handleClickLocation,
    handleClickFilter,
    // handleClickFoodTruck,
    handleClickTooltip,
    handleClickChip,
  } = useReservation();

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='예약하기'
      />
      <div className='z-50 flex items-center justify-between border-b border-b-grayscale-100 bg-white px-[2rem] pb-[1rem] pt-[1.2rem] fixed-center'>
        <button
          type='button'
          onClick={handleClickLocation}
          className='flex cursor-pointer items-center gap-[0.6rem]'
        >
          <Icon name='ic_locate' className='text-primary-700' />
          <span className='text-grayscale-900 body-m-14'>
            {locationName.length === 0 ? '전체' : locationName[0]}{' '}
            {locationName.length > 1 && `외 ${locationName.length - 1}곳`}
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
        className={`top-[9.8rem] flex gap-[0.6rem] overflow-x-auto bg-white px-[2rem] py-[1.2rem] scrollbar-hide fixed-center`}
      >
        {FOOD_TRUCK_CATEGORIES.map(category => (
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

      <div className='flex flex-col gap-[2.2rem] px-[2rem] pb-[1.6rem] pt-[12.6rem]'>
        {foodTruckData?.content?.map((item, index) => (
          // TODO: 카드 컴포넌트 사용하여 ui 마무리
          <div key={`${item.name}-${index}`}>{item.name}</div>
          // <FoodTruckItem
          //   key={item.truckId}
          //   image={item.image}
          //   name={item.name}
          //   priceRange={item.priceRange}
          //   minOrder={item.minOrder}
          //   tags={item.tags}
          //   handleClick={() => handleClickFoodTruck(item.name)}
          //   isLast={index === filteredFoodTrucks.length - 1}
          // />
        ))}
      </div>

      <ButtonFloating />
    </>
  );
}
