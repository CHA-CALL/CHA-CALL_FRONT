import { type MouseEvent } from 'react';
import { cn } from '@utils/cn';
import { Icon, type IconId } from '@components/icon/Icon';
import Button from '@components/button/Button';
import { useRole } from '@shared/hooks/use-role';
import { ROLE } from '@shared/constant/role';

interface MenuItemProps {
  icon: IconId;
  text: string;
  handleMenuClick: () => void;
  show?: boolean;
}

interface SideBarProps {
  isOpen?: boolean;
  handleSideBarClose: () => void;
  className?: string;
}

const MenuItem = ({
  icon,
  text,
  handleMenuClick,
  show = true
}: MenuItemProps) => {
  if (!show) {
    return null;
  };

  return (
    <button
      type='button'
      onClick={handleMenuClick}
      className='flex items-center gap-[0.8rem] w-full mx-[0.6rem] my-[1.2rem] cursor-pointer'
    >
      <Icon name={icon} />
      <span className='relative top-[0.1rem] body-m-16 text-grayscale-900'>{text}</span>
    </button>
  );
};

export default function SideBar({
  isOpen,
  handleSideBarClose,
  className,
}: SideBarProps) {
  const { role, setRole } = useRole();

  if (!isOpen) {
    return null;
  };

  const handleLogin = () => {
    // TODO: 로그인 페이지로 라우팅
    setRole(ROLE.CLIENT);
  };

  const handleLogout = () => {
    setRole(ROLE.LOGOUT);
  };

  const handleSwitchToManager = () => {
    setRole(ROLE.PROVIDER);
  };

  const handleSwitchToCustomer = () => {
    setRole(ROLE.CLIENT);
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
    switch (role) {
    case ROLE.LOGOUT:
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
    case ROLE.CLIENT:
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
    case ROLE.PROVIDER:
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
        'bg-[var(--grayscale-black-50,rgba(0,0,0,0.5))] z-50',
        className
      )}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`
          fixed top-0 left-0 flex flex-col
          w-[80%] max-w-[30rem] h-full py-[2.3rem] px-[2rem]
          bg-white`
        }
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
            handleMenuClick={handleClickMyPage}
          />
          <MenuItem
            icon='ic_chat'
            text='채팅'
            handleMenuClick={handleClickChat}
          />
          <MenuItem
            icon='ic_register'
            text='푸드트럭 등록하기'
            handleMenuClick={handleClickRegister}
            show={role === ROLE.PROVIDER}
          />

          <div className='my-[1.2rem] border-b border-grayscale-200' />

          <MenuItem
            icon='ic_support'
            text='문의하기'
            handleMenuClick={handleClickSupport}
          />
          <MenuItem
            icon='ic_team'
            text='팀소개'
            handleMenuClick={handleClickTeam}
          />
        </div>
      </div>
    </div>
  )
}
