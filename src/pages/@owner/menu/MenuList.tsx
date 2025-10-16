import Button from '@components/button/Button';
import ButtonFloating from '@components/button-floating/ButtonFloating';
import MenuListHeader from '@pages/@owner/menu/components/MenuListHeader';
import Menus from '@pages/@owner/menu/components/Menus';
import ListSortBottomSheet from '@pages/@owner/menu/components/ListSortBottomSheet';
import { useMenuList } from '@pages/@owner/menu/hooks/use-menu-list';

const TEST_FOOD_TRUCK_ID = 1;

export default function MenuList() {
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
  } = useMenuList(TEST_FOOD_TRUCK_ID);

  return (
    <>
      <MenuListHeader
        isSorted={isSorted}
        handleClickBack={handleClickBack}
        handleRegister={handleRegister}
        handleOpenBottomSheet={handleOpenBottomSheet}
      />

      <Menus
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
