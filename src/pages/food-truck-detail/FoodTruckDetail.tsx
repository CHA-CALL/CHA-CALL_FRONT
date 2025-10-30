import { cn } from '@shared/utils/cn';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import Button from '@components/button/Button';

import FoodTruckHeaderSection from '@pages/food-truck-detail/sections/FoodTruckHeaderSection';
import FoodTruckInfoSection from '@pages/food-truck-detail/sections/FoodTruckInfoSection';
import FoodTruckMenuSection from '@pages/food-truck-detail/sections/FoodTruckMenuSection';
import FoodTruckScheduleSection from '@pages/food-truck-detail/sections/FoodTruckScheduleSection';
import FoodTruckOptionSection from '@pages/food-truck-detail/sections/FoodTruckOptionSection';
import FoodTruckMenuSearch from '@pages/food-truck-detail/FoodTruckMenuSearch';

import SectionDivider from '@pages/food-truck-detail/components/SectionDivider';
import useFoodTruckDetail from '@pages/food-truck-detail/hooks/use-food-truck-detail';
import useFoodTruckDetailView from '@pages/food-truck-detail/hooks/use-food-truck-detail-view';
import { useFoodTruckMenusPreview } from '@pages/food-truck-detail/hooks/use-food-truck-menus';
import Loading from '@shared/components/loading/Loading';

export default function FoodTruckDetail() {
  const {
    isScrolled,
    isSearchMode,
    handleOpenSearchMode,
    handleCloseSearchMode,
  } = useFoodTruckDetailView();

  const {
    foodTruckDetailData,
    handleClickSaveButton,
    handleClickBack,
    handleToChatPage,
    isPendingFoodTruckDetail,
  } = useFoodTruckDetail();

  const { menusPreview, isPendingMenusPreview } = useFoodTruckMenusPreview();

  if (isPendingFoodTruckDetail) {
    return <Loading />;
  }

  return isSearchMode ? (
    <FoodTruckMenuSearch handleCloseSearchMode={handleCloseSearchMode} />
  ) : (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleClickBack}
        text={isScrolled ? foodTruckDetailData?.name : undefined}
        rightIcon={
          isScrolled ? (
            <button
              type='button'
              onClick={handleClickSaveButton}
              aria-label={
                foodTruckDetailData?.isSaved ? '찜하기 취소' : '찜하기'
              }
            >
              <Icon
                name={
                  foodTruckDetailData?.isSaved
                    ? 'ic_heart_fill'
                    : 'ic_heart_empty'
                }
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
          photoUrl={foodTruckDetailData?.photoUrl}
          name={foodTruckDetailData?.name}
          isSaved={foodTruckDetailData?.isSaved}
          description={foodTruckDetailData?.description}
          serviceAreas={foodTruckDetailData?.serviceAreas}
          activeTime={foodTruckDetailData?.activeTime}
          timeDiscussRequired={foodTruckDetailData?.timeDiscussRequired}
          phoneNumber={foodTruckDetailData?.phoneNumber}
          handleClickSaveButton={handleClickSaveButton}
        />
        <SectionDivider />
        <FoodTruckInfoSection
          averageRating={foodTruckDetailData?.averageRating}
          menuCategories={foodTruckDetailData?.menuCategories}
          operatingInfo={foodTruckDetailData?.operatingInfo}
          availableQuantity={foodTruckDetailData?.availableQuantity}
          needElectricity={foodTruckDetailData?.needElectricity}
          paymentMethod={foodTruckDetailData?.paymentMethod}
        />
        <SectionDivider />
        <FoodTruckMenuSection
          menus={menusPreview}
          isPending={isPendingMenusPreview}
          handleOpenSearchMode={handleOpenSearchMode}
        />
        {foodTruckDetailData?.availableDates && (
          <>
            <SectionDivider />
            <FoodTruckScheduleSection
              availableDates={foodTruckDetailData?.availableDates}
            />
          </>
        )}
        {foodTruckDetailData?.option && (
          <>
            <SectionDivider />
            <FoodTruckOptionSection option={foodTruckDetailData?.option} />
          </>
        )}
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
