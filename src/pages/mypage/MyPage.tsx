import { useNavigate } from 'react-router-dom';

import DefaultProfile from '@assets/img/img_avatar.png';
import Navigation from '@components/navigation/Navigation';
import { Icon } from '@components/icon/Icon';
import { useRole } from '@hooks/use-role';
import { ROUTES } from '@router/constant/routes';
import { user_mockup } from '@pages/mypage/constant/mockup';

interface SettingList {
  menu: string;
  navigateTo: string;
}

export default function MyPage() {
  const navigate = useNavigate();

  const { role } = useRole();
  const isPresident = role === 'president';

  // TODO: 추가된 페이지 경로 설정
  const settingList: SettingList[] = isPresident
    ? [
        {
          menu: '나의 푸드트럭',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
        {
          menu: '자주 쓰는 채팅 설정',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
        {
          menu: '결제관리',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
      ]
    : [
        {
          menu: '예약내역',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
        {
          menu: '저장한 푸드트럭',
          navigateTo: ROUTES.MESSAGE_LIST,
        },
      ];

  const handleNavigateTo = (navigateTo: string) => {
    navigate(navigateTo);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Navigation
        leftIcon={<Icon name='ic_back' color='#19212A' />}
        handleLeftClick={handleGoBack}
        text='마이페이지'
      />
      <div className='flex flex-col gap-[4rem] p-[2rem]'>
        <div className='flex flex-col gap-[2.3rem]'>
          <h4 className='text-grayscale-500 title-sb-12'>내정보</h4>
          <div
            className='flex w-fit flex-row items-center gap-[2.2rem]'
            onClick={() => handleNavigateTo('/profile-setting')}
          >
            <img
              className='h-[5rem] w-[5rem]'
              src={DefaultProfile}
              alt='프로필 사진'
            />
            <div className='flex flex-col'>
              <div className='flex flex-row items-center gap-[0.6rem]'>
                <span className='text-grayscale-900 heading-sb-18'>
                  {user_mockup.name}
                </span>
                <Icon name='ic_next' color='#19212A' />
              </div>
              <span className='text-grayscale-500 title-sb-12'>
                {isPresident ? '사장님' : '일반'} 회원
              </span>
            </div>
          </div>
        </div>
        <div className='h-[0.1rem] w-full bg-grayscale-100' />
        <div className='flex flex-col gap-[1rem]'>
          <h4 className='mb-[0.3rem] text-grayscale-500 title-sb-12'>
            계정 관리
          </h4>
          {settingList.map(setting => (
            <button
              key={setting.menu}
              className='flex flex-row items-center justify-between px-[0.6rem] py-[1.2rem]'
              onClick={() => handleNavigateTo(setting.navigateTo)}
            >
              <span className='text-grayscale-900 title-sb-14'>
                {setting.menu}
              </span>
              <Icon name='ic_next' width={18} height={18} color='#838992' />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
