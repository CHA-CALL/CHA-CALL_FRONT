import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import ButtonFloating from '@components/button-floating/ButtonFloating';
import BottomSheet from '@components/bottom-sheet/BottomSheet';
import MenuItem from '@pages/@owner/menu/components/MenuItem';

import { mockMenuData } from '@pages/@owner/menu/constant/mockUp';

type SortType = 'latest' | 'oldest';

export default function MenuList() {
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSorted, setIsSorted] = useState<SortType>('latest');

  const sortedMenuList = () => {
    return [...mockMenuData].sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return isSorted === 'latest' ? dateB - dateA : dateA - dateB;
    });
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleRegister = () => {
    navigate(ROUTES.MENU_REGISTER);
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleSelectSort = (type: SortType) => {
    setIsSorted(type);
    handleCloseBottomSheet();
  };

  const handleSave = () => {
    alert('메뉴가 등록되었습니다.');
    // TODO: 메뉴 노출 여부 저장 로직 구현
  };

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
          {isSorted === 'latest' ? '최신순' : '오래된순'}
          <Icon name='ic_down' />
        </button>
      </div>

      <div className='flex flex-col pt-[11.9rem] px-[2rem] pb-[8.5rem] bg-white'>
        {sortedMenuList().length > 0 ? (
          sortedMenuList().map((menu, index) => (
            <MenuItem
              key={menu.menuId}
              menuImage={menu.image}
              menuName={menu.name}
              menuDescription={menu.description}
              menuPrice={menu.price}
              handleToggle={handleSave}
              isLast={index === sortedMenuList().length - 1}
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

      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        sheetContent={
          <>
            <button
              type='button'
              onClick={() => handleSelectSort('latest')}
              className='w-full p-[2rem] title-sb-14 text-grayscale-700 border-b border-grayscale-100'
            >
              최신순
            </button>
            <button
              type='button'
              onClick={() => handleSelectSort('oldest')}
              className='w-full p-[2rem] title-sb-14 text-grayscale-700'
            >
              오래된순
            </button>
            <Button
              variant='cta'
              buttonStyle='sub'
              handleClickButton={handleCloseBottomSheet}
            >
              취소
            </Button>
          </>
        }
        sheetHeight={200}
      />
    </>
  );
}
