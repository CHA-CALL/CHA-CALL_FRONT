import DefaultProfile from '@assets/img/img_avatar.png';
import { Icon } from '@shared/components/icon/Icon';
import { user_mockup } from '@pages/mypage/constant/mockup';

interface MyInfoSectionProps {
  isPresident: boolean;
  handleNavigateTo: (_navigateTo: string) => void;
}

export default function MyInfoSection({
  isPresident,
  handleNavigateTo,
}: MyInfoSectionProps) {
  return (
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
  );
}
