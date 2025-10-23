import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@components/button/Button';

import FoodTruckHeaderSection from '@pages/food-truck-detail/sections/FoodTruckHeaderSection';
import FoodTruckInfoSection from '@pages/food-truck-detail/sections/FoodTruckInfoSection';
import FoodTruckMenuSection from '@pages/food-truck-detail/sections/FoodTruckMenuSection';
import FoodTruckScheduleSection from '@pages/food-truck-detail/sections/FoodTruckScheduleSection';
import FoodTruckOptionSection from '@pages/food-truck-detail/sections/FoodTruckOptionSection';

import SectionDivider from '@pages/food-truck-detail/components/SectionDivider';
import {
  mockFoodTruck,
  mockMenus,
} from '@pages/food-truck-detail/mock-food-truck';

export default function FoodTruckDetail() {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 감지 로직
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 210);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TODO: mock 대신 React Query로 받아오기
  const {
    photoUrl,
    name,
    isSaved,
    description,
    foodTruckServiceAreas,
    activeTime,
    timeDiscussRequired,
    phoneNumber,
    averageRating,
    menuCategories,
    operatingInfo,
    availableQuantity,
    needElectricity,
    paymentMethod,
    availableDates,
    option,
  } = mockFoodTruck;
  const menus = mockMenus;

  // TODO: 핸들러는 서버 api 호출로 변경될 예정. 상태는 제거 예정
  const [isLiked, setIsLiked] = useState(isSaved);
  const handleClickSaveButton = () => setIsLiked(!isLiked);

  const handleClickBack = () => navigate(-1);
  const handleToChatPage = () => alert('채팅 페이지로');

  return (
    <>
      <div>
        <Navigation
          leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
          handleLeftClick={handleClickBack}
          text={isScrolled ? name : undefined}
          rightIcon={
            isScrolled ? (
              <Icon
                name={isLiked ? 'ic_heart_fill' : 'ic_heart_empty'}
                width={24}
                height={24}
                className='text-primary-700'
                onClick={handleClickSaveButton}
              />
            ) : undefined
          }
          className={`transition-colors duration-100 ${
            isScrolled ? 'bg-white' : 'bg-transparent'
          } `}
        />
      </div>

      <div className='mt-[-4.8rem] pb-[12rem]'>
        <FoodTruckHeaderSection
          photoUrl={photoUrl}
          name={name}
          isSaved={isLiked}
          description={description}
          foodTruckServiceAreas={foodTruckServiceAreas}
          activeTime={activeTime}
          timeDiscussRequired={timeDiscussRequired}
          phoneNumber={phoneNumber}
          handleClickSaveButton={handleClickSaveButton}
        />
        <SectionDivider />
        <FoodTruckInfoSection
          averageRating={averageRating}
          menuCategories={menuCategories}
          operatingInfo={operatingInfo}
          availableQuantity={availableQuantity}
          needElectricity={needElectricity}
          paymentMethod={paymentMethod}
        />
        <SectionDivider />
        <FoodTruckMenuSection menus={menus} />
        <SectionDivider />
        <FoodTruckScheduleSection availableDates={availableDates} />
        <SectionDivider />
        <FoodTruckOptionSection option={option} />
      </div>
      <footer className='bottom-[0] w-full bg-white px-[2rem] py-[1.7rem] shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)] fixed-center'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={handleToChatPage}
        >
          채팅하기
        </Button>
      </footer>
    </>
  );
}
