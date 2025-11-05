import { useNavigate } from 'react-router-dom';
import { Icon, type IconId } from '@components/icon/Icon';
import Button from '@ui/button/Button';
import Overlay from '@layout/overlay/Overlay';
import { useRole } from '@shared/hooks/use-role';
import { ROLE } from '@shared/constant/role';
import { ROUTES } from '@router/constant/routes';

interface MenuItemProps {
  icon: IconId;
  text: string;
  handleMenuClick: () => void;
  show?: boolean;
}

interface SideBarProps {
  isOpen?: boolean;
  handleSideBarClose: () => void;
}

const MenuItem = ({
  icon,
  text,
  handleMenuClick,
  show = true,
}: MenuItemProps) => {
  if (!show) {
    return null;
  }

  return (
    <button
      type='button'
      onClick={handleMenuClick}
      className='flex w-full cursor-pointer items-center gap-[0.8rem] px-[0.6rem] py-[1.2rem]'
    >
      <Icon name={icon} />
      <span className='body-m-16 text-grayscale-900 relative top-[0.1rem]'>
        {text}
      </span>
    </button>
  );
};

export default function SideBar({ isOpen, handleSideBarClose }: SideBarProps) {
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

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
    navigate(ROUTES.MYPAGE);
    handleSideBarClose();
  };

  const handleClickChat = () => {
    navigate(ROUTES.CHATLIST);
    handleSideBarClose();
  };

  const handleClickRegister = () => {
    navigate(ROUTES.FOOD_TRUCK_ONBOARDING);
    handleSideBarClose();
  };

  const handleClickSupport = () => {
    // TODO: 문의하기 페이지로 라우팅
    handleSideBarClose();
  };

  const handleClickTeam = () => {
    // TODO: 팀소개 페이지로 라우팅
    handleSideBarClose();
  };

  const renderButtons = () => {
    if (role === ROLE.LOGOUT) {
      return (
        <Button
          variant='cta'
          buttonStyle='active'
          handleClickButton={handleLogin}
        >
          로그인
        </Button>
      );
    }

    return (
      <div className='flex flex-col gap-[0.8rem]'>
        <Button
          variant='cta'
          buttonStyle='sub'
          handleClickButton={handleLogout}
        >
          로그아웃
        </Button>
        {role === ROLE.CLIENT && (
          <Button
            variant='default'
            buttonStyle='large'
            handleClickButton={handleSwitchToManager}
          >
            사장님 모드로 전환
          </Button>
        )}
        {role === ROLE.PROVIDER && (
          <Button
            variant='default'
            buttonStyle='large'
            handleClickButton={handleSwitchToCustomer}
          >
            고객 모드로 전환
          </Button>
        )}
      </div>
    );
  };

  return (
    <Overlay isOpen={isOpen} position='left' handleClose={handleSideBarClose}>
      <div
        onClick={e => e.stopPropagation()}
        className='fixed left-0 top-0 flex h-full w-[80%] max-w-[30rem] flex-col bg-white px-[2rem] py-[2.3rem]'
      >
        <img
          src='https://picsum.photos/id/11/120/34'
          alt='logo'
          className='mb-[1.8rem] h-[3.4rem] w-[12rem] bg-black'
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

          <div className='border-grayscale-200 my-[1.2rem] border-b' />

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
    </Overlay>
  );
}
