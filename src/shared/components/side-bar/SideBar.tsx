import { type MouseEvent } from 'react';
import { cn } from '@utils/cn';
import { Icon, type IconId } from '@components/icon/Icon';
import Button from '@components/button/Button';

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
  handleSideBarClose,
}: SideBarProps) {
  if (!isOpen) {
    return null;
  };

  const handleLogin = () => {
    // TODO: 로그인 페이지로 라우팅
  };

  const handleLogout = () => {
    // TODO: 로그아웃 로직
  };

  const handleSwitchToManager = () => {
    // TODO: 사장님 모드 전환 로직
  };

  const handleSwitchToCustomer = () => {
    // TODO: 고객 모드 전환 로직
  };

  const handleClickMyPage = () => {
    // TODO: 마이페이지로 라우팅
  };

  const handleClickChat = () => {
    // TODO: 채팅 페이지로 라우팅
  };

  const handleClickRegister = () => {
    // TODO: 푸드트럭 등록 페이지로 라우팅
  };

  const handleClickSupport = () => {
    // TODO: 문의하기 페이지로 라우팅
  };

  const handleClickTeam = () => {
    // TODO: 팀소개 페이지로 라우팅
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleSideBarClose();
    }
  };

  const renderButtons = () => {
    switch (userType) {
    case 'guest':
      return (
        <Button
          variant='default'
          buttonStyle='large'
          handleClickButton={handleLogin}
          className='px-[0] py-[0]'
        >
          로그인/회원가입
        </Button>
      )
    case 'customer':
      return (
        <div className='flex gap-[1rem]'>
          <Button
            variant='default'
            buttonStyle='large'
            handleClickButton={handleLogout}
            className='px-[0] py-[0]'
          >
            로그아웃
          </Button>
          <Button
            variant='default'
            buttonStyle='large'
            handleClickButton={handleSwitchToManager}
            className='px-[0] py-[0]'
          >
            사장님 전환
          </Button>
        </div>
      )
    case 'manager':
      return (
        <div className='flex gap-[1rem]'>
          <Button
            variant='default'
            buttonStyle='large'
            handleClickButton={handleLogout}
            className='px-[0] py-[0]'
          >
            로그아웃
          </Button>
          <Button
            variant='default'
            buttonStyle='large'
            handleClickButton={handleSwitchToCustomer}
            className='px-[0] py-[0]'
          >
            고객 전환
          </Button>
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
            onClick={handleClickRegister}
            show={userType === 'manager'}
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
