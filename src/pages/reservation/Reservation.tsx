import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import Tooltip from '@components/tooltip/Tooltip';
import ButtonFloating from '@components/button-floating/ButtonFloating';
import FoodTruckItem from '@pages/reservation/components/FoodTruckItem';
import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/foodTruckCategory';
import { mockFoodTruckData } from '@pages/reservation/constant/mockUp';
import ButtonIcon from '@shared/components/button-icon/ButtonIcon';
import { cn } from '@shared/utils/cn';

interface ReservationProps {
  location?: string;
  categories?: string[];
}

export default function Reservation({
  location = '서울시 광진구 구의동',
  categories = FOOD_TRUCK_CATEGORIES,
}: ReservationProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  const isAll = selectedCategory === categories[0];
  const filteredFoodTrucks = isAll
    ? mockFoodTruckData
    : mockFoodTruckData.filter(truck => truck.category === selectedCategory);

  const navigate = useNavigate();

  // TODO: 필터 페이지와 연결 및 필터 상태 관리 로직 추가
  const [isFilterApplied] = useState<boolean>(false);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickLocation = () => {
    navigate('/set-location');
  };

  const handleClickFilter = () => {
    navigate('/filter');
  };

  const handleClickFoodTruck = (name: string) => {
    navigate(`/food-truck/${name}`);
  };

  const handleClickTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  const handleClickChip = (category: string) => {
    setSelectedCategory(category);
  };

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
          <span className='text-grayscale-900 body-m-14'>{location}</span>
          <Icon name='ic_down' />
        </button>

        <ButtonIcon
          icon='ic_filter'
          iconClassName={isFilterApplied ? 'text-primary-700' : undefined}
          handleClick={handleClickFilter}
          className={cn(
            'flex h-[2.8rem] w-[2.8rem] items-center justify-center rounded-[0.4rem] border pl-[0.4rem] pt-[0.4rem]',
            isFilterApplied
              ? 'border-primary-700 bg-primary-50'
              : 'border-grayscale-200'
          )}
        />

        {!isFilterApplied && (
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
        {categories.map(category => (
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
        {filteredFoodTrucks.map((item, index) => (
          <FoodTruckItem
            key={item.truckId}
            image={item.image}
            name={item.name}
            priceRange={item.priceRange}
            minOrder={item.minOrder}
            tags={item.tags}
            handleClick={() => handleClickFoodTruck(item.name)}
            isLast={index === filteredFoodTrucks.length - 1}
          />
        ))}
      </div>

      <ButtonFloating />
    </>
  );
}
