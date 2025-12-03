import { Icon } from '@components/icon/Icon';
import Navigation from '@components/layout/navigation/Navigation';
import Button from '@components/ui/button/Button';
import type { SortType } from '@pages/@owner/menu/constant/menu-list-sort';

interface MenuListHeaderProps {
  isSorted: SortType;
  handleClickBack: () => void;
  handleRegister: () => void;
  handleOpenBottomSheet: () => void;
}

export default function MenuListHeader({
  isSorted,
  handleClickBack,
  handleRegister,
  handleOpenBottomSheet,
}: MenuListHeaderProps) {
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
          {isSorted}
          <Icon name='ic_down' />
        </button>
      </div>
    </>
  );
}
