import { useNavigate } from 'react-router-dom';

import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@components/button/Button';

import FoodTruckHeaderSection from '@pages/food-truck-detail/sections/FoodTruckHeaderSection';
import FoodTruckInfoSection from '@pages/food-truck-detail/sections/FoodTruckInfoSection';
import FoodTruckMenuSection from '@pages/food-truck-detail/sections/FoodTruckMenuSection';
import FoodTruckScheduleSection from '@pages/food-truck-detail/sections/FoodTruckScheduleSection';
import FoodTruckEtcSection from '@pages/food-truck-detail/sections/FoodTruckEtcSection';

import SectionDivider from '@pages/food-truck-detail/components/SectionDivider';
import { mockFoodTruck } from '@pages/food-truck-detail/mock-food-truck';

export default function FoodTruckDetail() {
  const navigate = useNavigate();

  // TODO: mock 대신 React Query로 받아오기
  const {
    photoUrl,
    foodTruckName,
    desc,
    location,
    time,
    availableDiscussion,
    phoneNumber,
    rating,
    foodCategories,
    operationInfo,
    availableQuantity,
    needElectricity,
    paymentMethod,
    menus,
    etc,
  } = mockFoodTruck;

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleToChatPage = () => {
    alert('채팅 페이지로');
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleClickBack}
        backgroundColor=''
      />
      <div className='mt-[-4.8rem] pb-[12rem]'>
        <FoodTruckHeaderSection
          photoUrl={photoUrl}
          foodTruckName={foodTruckName}
          desc={desc}
          location={location}
          time={time}
          availableDiscussion={availableDiscussion}
          phoneNumber={phoneNumber}
        />
        <SectionDivider />
        <FoodTruckInfoSection
          rating={rating}
          foodCategories={foodCategories}
          operationInfo={operationInfo}
          availableQuantity={availableQuantity}
          needElectricity={needElectricity}
          paymentMethod={paymentMethod}
        />
        <SectionDivider />
        <FoodTruckMenuSection menus={menus} />
        <SectionDivider />
        <FoodTruckScheduleSection />
        <SectionDivider />
        <FoodTruckEtcSection etc={etc} />
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
