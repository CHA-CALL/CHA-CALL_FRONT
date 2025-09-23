import DefaultProfile from '@assets/img/img_avatar.png';
import { Icon } from '@shared/components/icon/Icon';
import { user_mockup } from '@pages/mypage/constant/mockup';
import { useEffect, useState } from 'react';
import type { UserResponse } from 'apis/data-contracts';

interface MyInfoSectionProps {
  isPresident: boolean;
  handleNavigateTo: (_navigateTo: string) => void;
}

export default function MyInfoSection({
  isPresident,
  handleNavigateTo,
}: MyInfoSectionProps) {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);

  const handleNavigateToProfileSetting = () => {
    handleNavigateTo('/profile-setting');
  };

  useEffect(() => {
    // TODO: 추후 서버에서 api를 통해 회원정보 조회
    setUserInfo(user_mockup);
  }, []);

  return (
    <div className='flex flex-col gap-[2.3rem]'>
      <h4 className='text-grayscale-500 title-sb-12'>내정보</h4>
      <button
        type='button'
        className='flex w-fit flex-row items-center gap-[2.2rem]'
        onClick={handleNavigateToProfileSetting}
      >
        <img
          className='h-[5rem] w-[5rem]'
          src={userInfo?.profileImageUrl || DefaultProfile}
          alt='프로필 사진'
        />
        <div className='flex flex-col'>
          <div className='flex flex-row items-center gap-[0.6rem]'>
            <span className='text-grayscale-900 heading-sb-18'>
              {userInfo?.name}님
            </span>
            <Icon name='ic_next' color='var(--color-grayscale-900)' />
          </div>
          <span className='text-start text-grayscale-500 title-sb-12'>
            {isPresident ? '사장님' : '일반'} 회원
          </span>
        </div>
      </button>
    </div>
  );
}
