import { cn } from '@shared/utils/cn';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@components/button/Button';

import FoodTruckHeaderSection from '@pages/food-truck-detail/sections/FoodTruckHeaderSection';
import FoodTruckInfoSection from '@pages/food-truck-detail/sections/FoodTruckInfoSection';
import FoodTruckMenuSection from '@pages/food-truck-detail/sections/FoodTruckMenuSection';
import FoodTruckScheduleSection from '@pages/food-truck-detail/sections/FoodTruckScheduleSection';
import FoodTruckOptionSection from '@pages/food-truck-detail/sections/FoodTruckOptionSection';

import SectionDivider from '@pages/food-truck-detail/components/SectionDivider';
import useFoodTruckDetail from '@pages/food-truck-detail/hooks/use-food-truck-detail';
import useFoodTruckDetailView from '@pages/food-truck-detail/hooks/use-food-truck-detail-view';

export default function FoodTruckDetail() {
  const { isScrolled } = useFoodTruckDetailView();

  const {
    photoUrl,
    name,
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
    isLiked,
    menus,
    handleClickSaveButton,
    handleClickBack,
    handleToChatPage,
  } = useFoodTruckDetail();

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleClickBack}
        text={isScrolled ? name : undefined}
        rightIcon={
          isScrolled ? (
            <button
              type='button'
              onClick={handleClickSaveButton}
              aria-label={isLiked ? '찜하기 취소' : '찜하기'}
            >
              <Icon
                name={isLiked ? 'ic_heart_fill' : 'ic_heart_empty'}
                width={24}
                height={24}
                className='mx-[0.7rem] text-primary-700'
              />
            </button>
          ) : undefined
        }
        className={cn(
          'transition-colors duration-300',
          isScrolled ? 'bg-white' : 'bg-transparent'
        )}
      />

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
