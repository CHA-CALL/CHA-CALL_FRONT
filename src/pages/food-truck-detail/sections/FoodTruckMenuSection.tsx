import type { FoodTruckMenuResponse } from 'apis/data-contracts';

import Button from '@components/button/Button';
import { Icon } from '@components/icon/Icon';
import Loading from '@shared/components/loading/Loading';

interface FoodTruckMenuSectionProps {
  menus?: FoodTruckMenuResponse[];
  isPending?: boolean;
  handleOpenSearchMode: () => void;
}

export default function FoodTruckMenuSection({
  menus,
  isPending,
  handleOpenSearchMode,
}: FoodTruckMenuSectionProps) {
  return (
    <div className='flex flex-col gap-[2rem] py-[2rem]'>
      <h3 className='pl-[2.5rem] text-grayscale-900 title-sb-12'>메뉴 정보</h3>
      <div className='flex flex-row gap-[1.6rem] overflow-x-scroll px-[2rem]'>
        {isPending ? (
          <Loading />
        ) : (
          menus &&
          menus.map(menu => (
            <div key={menu.menuId} className='flex flex-col gap-[0.7rem]'>
              <img
                src={menu.imageUrl}
                alt='메뉴 사진'
                className='h-[10rem] w-[10rem] rounded-[1.6rem] border border-grayscale-200'
              />
              <div className='flex flex-col text-grayscale-900'>
                <span className='body-m-14'>{menu.name}</span>
                <div className='flex flex-row items-center gap-[0.2rem]'>
                  <span className='title-sb-16'>
                    {menu.price?.toLocaleString()}
                  </span>
                  <span className='text-grayscale-700 caption-m-11'>원</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className='px-[2rem]'>
        <Button
          variant='cta'
          buttonStyle='sub'
          handleClickButton={handleOpenSearchMode}
        >
          <div className='flex flex-row items-center justify-center gap-[0.2rem]'>
            <span className='text-grayscale-700 body-m-14'>메뉴 더보기</span>
            <Icon
              name='ic_next'
              className='mt-[0.1rem] text-grayscale-500'
              width={16}
              height={16}
            />
          </div>
        </Button>
      </div>
    </div>
  );
}
