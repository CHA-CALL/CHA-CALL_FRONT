import { Icon } from '@shared/components/icon/Icon';
import Input from '@shared/components/input/Input';
import Navigation from '@shared/components/navigation/Navigation';
import { useFoodTruckMenus } from '../hooks/use-food-truck-menus';

interface FoodTruckMenusProps {
  handleCloseSearchMode: () => void;
}

export default function FoodTruckMenuSearch({
  handleCloseSearchMode,
}: FoodTruckMenusProps) {
  // TODO: 메뉴 검색 api 나오면 연결
  const { menusPreview } = useFoodTruckMenus();
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
      <div className='mt-[8.6rem]'>
        {menusPreview &&
          menusPreview.map(menu => (
            <div className='title-b-16' key={menu.menuId}>
              {menu.name} {menu.description} {menu.price}
            </div>
          ))}
      </div>
    </>
  );
}
