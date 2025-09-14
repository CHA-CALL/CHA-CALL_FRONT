import { type MouseEvent } from 'react';
import { cn } from '@utils/cn';
import { Icon, type IconId } from '@components/icon/Icon';

type UserType = 'guest' | 'customer' | 'manager';

interface MenuItemProps {
  icon: IconId;
  text: string;
  onClick: () => void;
  show?: boolean;
}

interface SideBarProps {
  isOpen?: boolean;
  userType: UserType;
  handleLogin?: () => void;
  handleLogout?: () => void;
  handleSwitchToManager?: () => void;
  handleSwitchToCustomer?: () => void;
  handleClickMyPage: () => void;
  handleClickChat: () => void;
  handleClickRegister?: () => void;
  handleClickSupport: () => void;
  handleClickTeam: () => void;
  handleSideBarClose: () => void;
}

const MenuItem = ({
  icon,
  text,
  onClick,
  show = true
}: MenuItemProps) => {
  if (!show) {
    return null;
  };

  return (
    <button
      type='button'
      onClick={onClick}
      className='flex items-center gap-[0.8rem] mx-[0.6rem] my-[1.2rem] cursor-pointer'
    >
      <Icon name={icon} />
      <span className='body-m-16 text-grayscale-900'>{text}</span>
    </button>
  );
};

export default function SideBar({
  isOpen,
  userType = 'guest',
  handleLogin,
  handleLogout,
  handleSwitchToManager,
  handleSwitchToCustomer,
  handleClickMyPage,
  handleClickChat,
  handleClickRegister,
  handleClickSupport,
  handleClickTeam,
  handleSideBarClose,
}: SideBarProps) {
  if (!isOpen) {
    return null;
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleSideBarClose();
    }
  };

  const renderButtons = () => {
    const BUTTON_CLASS = cn(
      'w-full h-[4.6rem] py-[1.25rem] title-sb-14 text-grayscale-900',
      'bg-white rounded-[0.4rem] border border-grayscale-200'
    );

    switch (userType) {
    case 'guest':
      return (
        <button
          type='button'
          onClick={handleLogin}
          className={cn(BUTTON_CLASS, 'px-[8.5rem]')}
        >
          로그인/회원가입
        </button>
      )
    case 'customer':
      return (
        <div className='flex gap-[1rem]'>
          <button
            type='button'
            onClick={handleLogout}
            className={cn(BUTTON_CLASS, 'px-[3.05rem]')}
          >
            로그아웃
          </button>
          <button
            type='button'
            onClick={handleSwitchToManager}
            className={cn(BUTTON_CLASS, 'px-[3.05rem]')}
          >
            사장님 전환
          </button>
        </div>
      )
    case 'manager':
      return (
        <div className='flex gap-[1rem]'>
          <button
            type='button'
            onClick={handleLogout}
            className={cn(BUTTON_CLASS, 'px-[3.05rem]')}
          >
            로그아웃
          </button>
          <button
            type='button'
            onClick={handleSwitchToCustomer}
            className={cn(BUTTON_CLASS, 'px-[3.05rem]')}
          >
            고객 전환
          </button>
        </div>
      )
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={cn(
        'fixed flex w-full h-full',
        'bg-[var(--grayscale-black-50,rgba(0,0,0,0.5))] z-50'
      )}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={cn(
          'fixed top-0 left-0 flex flex-col',
          'w-[80%] max-w-[30rem] py-[2.3rem] px-[2rem] h-full',
          'bg-white'
        )}
      >
        <img
          src='https://picsum.photos/id/11/120/34'
          alt='logo'
          className='w-[12rem] h-[3.4rem] mb-[1.8rem] bg-black'
        />
        {renderButtons()}

        <div className='mt-[2rem]'>
          <MenuItem
            icon='ic_mypage'
            text='마이페이지'
            onClick={handleClickMyPage}
          />
          <MenuItem
            icon='ic_chat'
            text='채팅'
            onClick={handleClickChat}
          />
          <MenuItem
            icon='ic_register'
            text='푸드트럭 등록하기'
            onClick={handleClickRegister ?? (() => {})}
            show={userType === 'manager' && !!handleClickRegister}
          />

          <div className='my-[1.2rem] border-b border-grayscale-200' />

          <MenuItem
            icon='ic_support'
            text='문의하기'
            onClick={handleClickSupport}
          />
          <MenuItem
            icon='ic_team'
            text='팀소개'
            onClick={handleClickTeam}
          />
        </div>
      </div>
    </div>
  )
}
