import { Icon } from '@components/icon/Icon';
import Input from '@components/input/Input';
import Navigation from '@components/navigation/Navigation';

import { useFoodTruckMenus } from '@pages/food-truck-detail/hooks/use-food-truck-menus';
import ButtonFloating from '@shared/components/button-floating/ButtonFloating';
import Loading from '@shared/components/loading/Loading';
import MenuItem from '@shared/components/menu-item/MenuItem';

interface FoodTruckMenusProps {
  handleCloseSearchMode: () => void;
}

export default function FoodTruckMenuSearch({
  handleCloseSearchMode,
}: FoodTruckMenusProps) {
  const { foodTruckMenusData, isPendingMenus, listBottomRef } =
    useFoodTruckMenus();
  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleCloseSearchMode}
        text='메뉴 검색'
      />
      <div className='bg-white px-[2rem] py-[1.6rem] fixed-center'>
        <Input
          type='search'
          placeholder='검색어를 입력해주세요.'
          rightComponent={
            <Icon name='ic_close' className='text-grayscale-500' />
          }
        />
      </div>
      <div className='p-[2rem] pt-[8.6rem]'>
        {foodTruckMenusData &&
          foodTruckMenusData.map((menu, index) => (
            <MenuItem
              key={menu.menuId}
              menu={menu}
              isLast={foodTruckMenusData.length - 1 === index}
            />
          ))}
      </div>
      {isPendingMenus && <Loading />}
      <div ref={listBottomRef} />
      <ButtonFloating />
    </>
  );
}
