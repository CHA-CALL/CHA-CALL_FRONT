import { useState } from 'react';
import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import FoodTruckItem from '@pages/reservation/components/FoodTruckItem';
import { FOOD_TRUCK_CATEGORIES } from '@pages/reservation/constant/foodTruckCategory';

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

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={() => alert('뒤로가기 클릭')}
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
          onClick={() => alert('위치설정')}
          className='flex items-center gap-[0.6rem] cursor-pointer'
        >
          <Icon name='ic_locate' color='#f83419' />
          <span className='body-m-14 text-grayscale-900'>{location}</span>
          <Icon name='ic_dash' />
        </button>
        <button
          type='button'
          onClick={() => alert('필터')}
          className={cn(
            'flex items-center justify-center',
            'w-[2.8rem] h-[2.8rem] rounded-[0.4rem] border border-grayscale-200'
          )}
        >
          <Icon name='ic_dash' />
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
        {filteredFoodTrucks.map((item) => (
          <FoodTruckItem
            key={item.name}
            image={item.image}
            name={item.name}
            priceRange={item.priceRange}
            minOrder={item.minOrder}
            tags={item.tags}
          />
        ))}
      </div>

      <button
        type='button'
        onClick={() => {}}
        className={cn(
          'fixed bottom-[2.4rem] right-[2.4rem] w-[5rem] h-[5rem]',
          'flex items-center justify-center rounded-full',
          'bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.08)]'
        )}
      >
        <Icon name='ic_dash' />
      </button>
    </>
  )
}
