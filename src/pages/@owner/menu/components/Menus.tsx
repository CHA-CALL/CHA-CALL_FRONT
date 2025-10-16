import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '@components/loading/Loading';
import MenuItem from '@pages/@owner/menu/components/MenuItem';
import EmptyView from '@pages/@owner/menu/components/EmptyView';
import type { MyFoodTruckMenuResponse } from 'apis/data-contracts';

interface MenusProps {
  foodTruckId: number;
  menus: MyFoodTruckMenuResponse[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  handleMenuClick: (_foodTruckId?: string, _menuId?: string) => () => void;
  handleClickToggle: (_menuId?: number) => () => void;
}

export default function Menus({
  foodTruckId,
  menus,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  handleMenuClick,
  handleClickToggle,
}: MenusProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />;
  }

  if (!menus || menus.length === 0) {
    return <EmptyView />;
  }

  return (
    <div className='flex flex-col bg-white px-[2rem] pb-[15.5rem] pt-[11.9rem]'>
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.menuId}
          menuImage={menu.imageUrl || ''}
          menuName={menu.name || ''}
          menuDescription={menu.description || ''}
          menuPrice={menu.price || ''}
          isToggled={menu.status === 'ON'}
          handleMenuClick={handleMenuClick(foodTruckId.toString(), menu.menuId?.toString())}
          handleToggle={handleClickToggle(menu.menuId)}
          isLast={index === menus.length - 1}
        />
      ))}

      {isFetchingNextPage && <Loading />}
      {hasNextPage && <div ref={ref} className='h-[10rem] w-full' />}
    </div>
  );
}
