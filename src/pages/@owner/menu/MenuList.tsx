import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import ButtonFloating from '@components/button-floating/ButtonFloating';
import MenuItem from '@pages/@owner/menu/components/MenuItem';
import ListSortBottomSheet from '@pages/@owner/menu/components/ListSortBottomSheet';
import {
  SORT_OPTIONS,
  // SORT_TYPES,
  // type SortType,
} from '@pages/@owner/menu/constant/menu-list-sort';
import { useMenuList } from '@pages/@owner/menu/hooks/use-menu-list';

const TEST_FOOD_TRUCK_ID = 1;

export default function MenuList() {
  const {
    isBottomSheetOpen,
    isSorted,

    menus,

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
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />

      <div className='top-[4.8rem] z-10 flex w-full flex-col bg-white p-[2rem] fixed-center'>
        <span className='text-grayscale-900 title-sb-16'>
          푸드트럭 메뉴 등록
        </span>
        <span className='text-grayscale-500 caption-m-12'>
          숨김처리 이외의 모든 저장된 음식은 전부 노출 됩니다
        </span>
      </div>

      <div className='top-[12.8rem] z-10 flex w-full justify-between border-b border-grayscale-100 bg-white px-[2rem] pb-[1rem] fixed-center'>
        <Button
          variant='default'
          buttonStyle='edit'
          handleClickButton={handleRegister}
        >
          + 추가하기
        </Button>
        <button
          type='button'
          onClick={handleOpenBottomSheet}
          className='flex items-center text-grayscale-700 caption-m-12'
        >
          {SORT_OPTIONS[isSorted]}
          <Icon name='ic_down' />
        </button>
      </div>

      <div className='flex flex-col bg-white px-[2rem] pb-[8.5rem] pt-[11.9rem]'>
        {menus.length > 0 ? (
          menus.map((menu, index) => (
            <MenuItem
              key={menu.menuId}
              menuImage={menu.imageUrl || ''}
              menuName={menu.name || ''}
              menuDescription={menu.description || ''}
              menuPrice={menu.price || ''}
              isToggled={menu.status === 'ON'}
              handleMenuClick={handleMenuClick(menu.menuId?.toString())}
              handleToggle={handleClickToggle(menu.menuId)}
              isLast={index === menus.length - 1}
            />
          ))
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <img
              src='https://placehold.co/140'
              alt='No Menu Items'
              className='mb-[1.6rem] mt-[50%] h-[14rem] w-[14rem] object-cover'
            />
            <span className='text-grayscale-500 body-m-14'>
              등록된 메뉴가 없습니다.
            </span>
          </div>
        )}
      </div>

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
        // sheetHeight={200}
      />
        {/* <>
          <button
            type='button'
            onClick={handleSortByLatest}
            className='w-full border-b border-grayscale-100 p-[2rem] text-grayscale-700 title-sb-14'
          >
            {SORT_OPTIONS[SORT_TYPES.LATEST]}
          </button>
          <button
            type='button'
            onClick={handleSortByOldest}
            className='w-full p-[2rem] text-grayscale-700 title-sb-14'
          >
            {SORT_OPTIONS[SORT_TYPES.OLDEST]}
          </button>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleCloseBottomSheet}
          >
            취소
          </Button>
        </> */}
      {/* </ListSortBottomSheet> */}
    </>
  );
}
