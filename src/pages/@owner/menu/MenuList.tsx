import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ROUTES } from '@/router/constant/routes';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Button from '@components/button/Button';
import ButtonFloating from '@components/button-floating/ButtonFloating';
import BottomSheet from '@components/bottom-sheet/BottomSheet';
import MenuItem from '@pages/@owner/menu/components/MenuItem';
import { type MyFoodTruckMenuResponse } from 'apis/data-contracts';
import {
  SORT_TYPES,
  type SortType,
} from '@pages/@owner/menu/constant/menu-list-sort';
import { useMenuInfo } from '@pages/@owner/food-truck-form/hooks/use-menu-info';
import { useFoodTruckForm } from '@pages/@owner/food-truck-form/hooks/use-food-truck-form';

export default function MenuList() {
  const methods = useFoodTruckForm(undefined);

  return (
    <FormProvider {...methods.methods}>
      <MenuListContent />
    </FormProvider>
  );
}

function MenuListContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateMenus } = useMenuInfo();
  const { foodTruckId } = useParams();
  const [menus, setMenus] = useState<MyFoodTruckMenuResponse[]>([]);
  const [sortOption, setSortOption] = useState<SortType>(SORT_TYPES.LATEST);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  if (foodTruckId) {
    //TODO: 메뉴 목록 조회 로직 구현
    setMenus([]);
  }

  const handleClickBack = () => {
    const fromPage = location.state?.from;
    updateMenus(menus.length > 0 ? true : false);
    navigate(ROUTES.FOOD_TRUCK_FORM, {
      state: { from: fromPage || 'food-truck-form' },
    });
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

  const handleSortByType = (type: SortType) => {
    setSortOption(type);
    if (foodTruckId) {
      //TODO: api 요청 로직 구현 (정렬 기준 최신순)
    }

    handleCloseBottomSheet();
  };

  const handleClickToggle = () => {
    alert('메뉴가 등록되었습니다.');
  };

  const handleSave = () => {};

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
        text='메뉴 등록'
      />

      <div className='fixed-center top-[4.8rem] z-10 flex w-full flex-col bg-white p-[2rem]'>
        <span className='text-grayscale-900 title-sb-16'>
          푸드트럭 메뉴 등록
        </span>
        <span className='text-grayscale-500 caption-m-12'>
          숨김처리 이외의 모든 저장된 음식은 전부 노출 됩니다
        </span>
      </div>

      <div className='border-grayscale-100 fixed-center top-[12.8rem] z-10 flex w-full justify-between border-b bg-white px-[2rem] pb-[1rem]'>
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
          className='text-grayscale-700 caption-m-12 flex items-center'
        >
          {sortOption}
          <Icon name='ic_down' />
        </button>
      </div>

      <div className='flex flex-col bg-white px-[2rem] pb-[8.5rem] pt-[11.9rem]'>
        {menus.length > 0 ? (
          menus.map((menu, index) => (
            <MenuItem
              key={menu.menuId}
              imageUrl={menu.imageUrl || ''}
              name={menu.name || ''}
              description={menu.description || ''}
              price={menu.price ? Number(menu.price) : 0}
              handleToggle={handleClickToggle}
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

      <footer className='fixed-center bottom-[0] z-10 w-full bg-white px-[2rem] py-[1.7rem] shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)]'>
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
            onClick={() => handleSortByType(SORT_TYPES.LATEST)}
            className='border-grayscale-100 text-grayscale-700 title-sb-14 w-full border-b p-[2rem]'
          >
            {SORT_TYPES.LATEST}
          </button>
          <button
            type='button'
            onClick={() => handleSortByType(SORT_TYPES.OLDEST)}
            className='text-grayscale-700 title-sb-14 w-full p-[2rem]'
          >
            {SORT_TYPES.OLDEST}
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
