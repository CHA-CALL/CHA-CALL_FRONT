import Navigation from '@layout/navigation/Navigation';
import { Icon } from '@icon/Icon';
import { ROLE } from '@constant/role';
import { useRole } from '@hooks/use-role';
import MyInfoSection from '@pages/mypage/components/MyInfoSection';
import SettingMenuSection from '@pages/mypage/components/SettingMenuSection';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();

  const { role } = useRole();
  const isProvider = role === ROLE.PROVIDER;

  const handleNavigateTo = (navigateTo: string) => {
    navigate(navigateTo);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        handleLeftClick={handleGoBack}
        text='마이페이지'
      />
      <div className='flex flex-col gap-[4rem] p-[2rem]'>
        <MyInfoSection
          isProvider={isProvider}
          handleNavigateTo={handleNavigateTo}
        />
        <div className='bg-grayscale-100 h-[0.1rem] w-full' />
        <SettingMenuSection
          isProvider={isProvider}
          handleNavigateTo={handleNavigateTo}
        />
      </div>
    </>
  );
}
