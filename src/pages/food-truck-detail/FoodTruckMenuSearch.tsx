import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Icon } from '@components/icon/Icon';
import Input from '@ui/input/Input';
import Navigation from '@layout/navigation/Navigation';

import {
  useFoodTruckMenus,
  useSearchFoodTruckMenus,
} from '@pages/food-truck-detail/hooks/use-food-truck-menus';
import ButtonFloating from '@ui/button-floating/ButtonFloating';
import Loading from '@layout/loading/Loading';
import MenuItem from '@shared/components/menu-item/MenuItem';
import SearchMenuEmptyView from '@pages/food-truck-detail/components/SearchMenuEmptyView';
import useToast from '@shared/hooks/use-toast';
import { ROUTES } from '@router/constant/routes';

interface FoodTruckMenusProps {
  handleCloseSearchMode: () => void;
}

export default function FoodTruckMenuSearch({
  handleCloseSearchMode,
}: FoodTruckMenusProps) {
  const { foodTruckId } = useParams();
  const foodTruckIdNumber = Number(foodTruckId);

  const navigate = useNavigate();
  const toast = useToast();

  if (isNaN(foodTruckIdNumber)) {
    navigate(ROUTES.RESERVATION);
    toast.error('잘못된 페이지 접근입니다.');
  }

  const { foodTruckMenusData, isPendingMenus, listBottomRef } =
    useFoodTruckMenus(foodTruckIdNumber);

  const {
    searchedMenus,
    isPendingMenusSearch,
    inputText,
    searchText,
    handleChangeInputText,
    handleDeleteInputText,
    handleSearchMenu,
  } = useSearchFoodTruckMenus(foodTruckIdNumber);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleInputFocus = (isFocused: boolean) => {
    setIsInputFocused(isFocused);
  };

  const renderMenus = () => {
    if (searchText && isPendingMenusSearch) return <Loading />;

    const menuList = searchText ? searchedMenus : foodTruckMenusData;
    if (!menuList) return null;

    if (menuList.length === 0) return <SearchMenuEmptyView />;

    return menuList.map((menu, index) => (
      <MenuItem
        key={menu.menuId}
        menu={menu}
        isLast={menuList.length - 1 === index}
      />
    ));
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleCloseSearchMode}
        text='메뉴 검색'
      />
      <div className='fixed-center bg-white px-[2rem] py-[1.6rem]'>
        <Input
          type='search'
          value={inputText}
          onChange={handleChangeInputText}
          onFocus={() => handleInputFocus(true)}
          onBlur={() => handleInputFocus(false)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearchMenu();
            }
          }}
          placeholder='검색어를 입력해주세요.'
          rightComponent={
            isInputFocused ? (
              <Icon name='ic_close' className='text-grayscale-500' />
            ) : (
              <Icon name='ic_search' className='text-grayscale-500' />
            )
          }
          handleRightClick={() => {
            if (isInputFocused) {
              handleDeleteInputText();
            }
          }}
        />
      </div>
      <div className='p-[2rem] pt-[8.6rem]'>{renderMenus()}</div>
      {isPendingMenus && <Loading />}
      {!searchText && <div ref={listBottomRef} />}
      <ButtonFloating />
    </>
  );
}
