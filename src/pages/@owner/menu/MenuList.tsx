import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import ButtonFloating from '@components/button-floating/ButtonFloating';
import BottomSheet from '@components/bottom-sheet/BottomSheet';
import MenuItem from '@pages/@owner/menu/components/MenuItem';
import {
  SORT_OPTIONS,
  SORT_TYPES,
  type SortType,
} from '@pages/@owner/menu/constant/menu-list-sort';

import { mockMenuData } from '@pages/@owner/menu/constant/mockUp';

export default function MenuList() {
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSorted, setIsSorted] = useState<SortType>(SORT_TYPES.LATEST);
  const [sortedMenuList, setSortedMenuList] = useState(mockMenuData);

  useEffect(() => {
    const sorted = [...mockMenuData].sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return isSorted === SORT_TYPES.LATEST ? dateB - dateA : dateA - dateB;
    });
    setSortedMenuList(sorted);
  }, [isSorted]);

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

  const handleSortByLatest = () => {
    setIsSorted(SORT_TYPES.LATEST);
    handleCloseBottomSheet();
  };

  const handleSortByOldest = () => {
    setIsSorted(SORT_TYPES.OLDEST);
    handleCloseBottomSheet();
  };

  const handleClickToggle = () => {
    alert('메뉴가 등록되었습니다.');
  };

  const handleSave = () => {
    // TODO: 메뉴 노출 여부 저장 로직 구현
  };

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
        {sortedMenuList.length > 0 ? (
          sortedMenuList.map((menu, index) => (
            <MenuItem
              key={menu.menuId}
              menuImage={menu.image}
              menuName={menu.name}
              menuDescription={menu.description}
              menuPrice={menu.price}
              handleToggle={handleClickToggle}
              isLast={index === sortedMenuList.length - 1}
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

      <BottomSheet
        isOpen={isBottomSheetOpen}
        handleCloseBottomSheet={handleCloseBottomSheet}
        sheetHeight={200}
      >
        <>
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
        </>
      </BottomSheet>
    </>
  );
}
