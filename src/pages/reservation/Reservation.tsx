import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import FoodTruckItem from '@pages/reservation/components/FoodTruckItem';
import { FOOD_TRUCK_CATEGORIES } from '@shared/constant/foodTruckCategory';

import { mockFoodTruckData } from '@pages/reservation/constant/mockUp';

interface ReservationProps {
  location?: string;
  categories?: string[];
}

export default function Reservation({
  location = '서울시 광진구 구의동',
  categories = FOOD_TRUCK_CATEGORIES,
}: ReservationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(FOOD_TRUCK_CATEGORIES[0]);

  const filteredFoodTrucks = selectedCategory === FOOD_TRUCK_CATEGORIES[0]
    ? mockFoodTruckData
    : mockFoodTruckData.filter(truck => truck.category === selectedCategory);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigate = useNavigate();

  const handleClickBack = () => {
    alert('뒤로가기 클릭');
    navigate(-1);
  };

  const handleClickLocation = () => {
    alert('위치설정 클릭');
    navigate('/location');
  };

  const handleClickFilter = () => {
    alert('필터 클릭');
    navigate('/filter');
  };

  const handleClickFoodTruck = (name: string) => {
    alert(`${name} 푸드트럭 클릭`);
    navigate(`/food-truck/${name}`);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='예약하기'
      />

      <div className={cn(
        'sticky top-[4.8rem] bg-white',
        'flex between items-center justify-between',
        'px-[2rem] pt-[1.2rem] pb-[1rem]',
        'border-b border-b-grayscale-100',
      )}>
        <button
          type='button'
          onClick={handleClickLocation}
          className='flex items-center gap-[0.6rem] cursor-pointer'
        >
          <Icon name='ic_locate' color='#f83419' />
          <span className='body-m-14 text-grayscale-900'>{location}</span>
          <Icon name='ic_down' />
        </button>
        <button
          type='button'
          onClick={handleClickFilter}
          className={cn(
            'flex items-center justify-center',
            'w-[2.8rem] h-[2.8rem] pl-[0.4rem] pt-[0.4rem]',
            'rounded-[0.4rem] border border-grayscale-200'
          )}
        >
          <Icon name='ic_filter' />
        </button>
      </div>

      <div className={cn(
        'sticky top-[9.9rem] flex gap-[0.6rem]',
        'px-[2rem] py-[1.2rem] bg-white',
        'overflow-x-auto scrollbar-hide'
      )}>
        {categories.map((category) => (
          <Button
            key={category}
            variant='chip'
            buttonStyle={selectedCategory === category ? 'selected1' : 'default'}
            handleClickButton={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className='flex flex-col gap-[2.2rem] px-[2rem] py-[1.6rem]'>
        {filteredFoodTrucks.map((item, index) => (
          <FoodTruckItem
            key={item.name}
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

      <button
        type='button'
        onClick={handleScrollToTop}
        className={cn(
          'fixed bottom-[2.6rem] right-[2.4rem] w-[5rem] h-[5rem]',
          'flex items-center justify-center pr-[0.1rem] pb-[0.3rem]',
          'rounded-full bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.08)]'
        )}
      >
        <Icon name='ic_up' />
      </button>
    </>
  )
}
