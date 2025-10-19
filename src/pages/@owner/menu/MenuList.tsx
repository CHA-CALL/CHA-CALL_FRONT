import { useParams } from 'react-router-dom';
import Button from '@components/button/Button';
import ButtonFloating from '@components/button-floating/ButtonFloating';
import MenuListHeader from '@pages/@owner/menu/components/MenuListHeader';
import Menus from '@pages/@owner/menu/components/Menus';
import ListSortBottomSheet from '@pages/@owner/menu/components/ListSortBottomSheet';
import { useMenuList } from '@pages/@owner/menu/hooks/use-menu-list';
import useToast from '@shared/hooks/use-toast';

export default function MenuList() {
  const toast = useToast();

  const { foodTruckId } = useParams<{ foodTruckId: string }>();
  const parsedFoodTruckId = Number(foodTruckId);

  const {
    menus,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,

    isBottomSheetOpen,
    isSorted,

    handleClickBack,
    handleRegister,

    handleOpenBottomSheet,
    handleCloseBottomSheet,
    handleSortByLatest,
    handleSortByOldest,

    handleMenuClick,
    handleClickToggle,

    handleSave,
  } = useMenuList(parsedFoodTruckId);

  const handleClickRegister = () => {
    handleRegister(parsedFoodTruckId.toString());
  }

  if (!foodTruckId || isNaN(parsedFoodTruckId)) {
    toast.error('잘못된 접근입니다.');
    return null;
  }

  return (
    <>
      <MenuListHeader
        isSorted={isSorted}
        handleClickBack={handleClickBack}
        handleRegister={handleClickRegister}
        handleOpenBottomSheet={handleOpenBottomSheet}
      />

      <Menus
        foodTruckId={parsedFoodTruckId}
        menus={menus}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        handleMenuClick={handleMenuClick}
        handleClickToggle={handleClickToggle}
      />

      <footer className='bottom-[0] z-10 w-full bg-white px-[2rem] py-[1.7rem] shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)] fixed-center'>
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={handleSave}
        >
          저장하기
        </Button>
      </footer>

      <ButtonFloating className='bottom-[10rem]' />

      <ListSortBottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        handleSortByLatest={handleSortByLatest}
        handleSortByOldest={handleSortByOldest}
      />
    </>
  );
}
