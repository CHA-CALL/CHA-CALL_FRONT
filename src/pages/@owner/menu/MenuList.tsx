import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import ButtonFloating from '@components/button-floating/ButtonFloating';
import MenuItem from '@pages/@owner/menu/components/MenuItem';
import ListSortBottomSheet from '@pages/@owner/menu/components/ListSortBottomSheet';
import { SORT_OPTIONS } from '@pages/@owner/menu/constant/menu-list-sort';
import { useMenuList } from '@pages/@owner/menu/hooks/use-menu-list';

export default function MenuList() {
  const {
    isBottomSheetOpen,
    isSorted,

    menuList,

    handleClickBack,
    handleRegister,

    handleOpenBottomSheet,
    handleCloseBottomSheet,
    handleSortByLatest,
    handleSortByOldest,

    handleMenuClick,
    handleClickToggle,
    handleSave,
  } = useMenuList(1);

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />

      <div className='fixed-center top-[4.8rem] flex flex-col w-full p-[2rem] bg-white z-10'>
        <span className='title-sb-16 text-grayscale-900'>
          푸드트럭 메뉴 등록
        </span>
        <span className='caption-m-12 text-grayscale-500'>
          숨김처리 이외의 모든 저장된 음식은 전부 노출 됩니다
        </span>
      </div>

      <div className='
        fixed-center top-[12.8rem] flex justify-between w-full px-[2rem] pb-[1rem]
        border-b border-grayscale-100 bg-white z-10
      '>
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
          className='flex items-center caption-m-12 text-grayscale-700'
        >
          {SORT_OPTIONS[isSorted]}
          <Icon name='ic_down' />
        </button>
      </div>

      <div className='flex flex-col pt-[11.9rem] px-[2rem] pb-[12.5rem] bg-white'>
        {menuList.length > 0 ? (
          menuList.map((menu, index) => (
            <MenuItem
              key={menu.menuId}
              menuImage={menu.imageUrl || ''}
              menuName={menu.name || ''}
              menuDescription={menu.description || ''}
              menuPrice={menu.price || ''}
              isToggled={menu.status === 'ON'}
              handleMenuClick={handleMenuClick(menu.menuId?.toString())}
              handleToggle={handleClickToggle(menu.menuId, menu.status)}
              isLast={index === menuList.length - 1}
            />
          ))
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <img
              src='https://placehold.co/140'
              alt='No Menu Items'
              className='w-[14rem] h-[14rem] mt-[50%] mb-[1.6rem] object-cover'
            />
            <span className='body-m-14 text-grayscale-500'>
              등록된 메뉴가 없습니다.
            </span>
          </div>
        )}
      </div>

      <footer className='
        fixed-center bottom-[0] w-full px-[2rem] py-[1.7rem]
        bg-white shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)] z-10
      '>
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
