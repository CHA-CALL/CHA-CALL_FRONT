import { useNavigate } from 'react-router-dom';

import type { UserResponse } from 'apis/data-contracts';

import { Icon } from '@shared/components/icon/Icon';
import { ROUTES } from '@router/constant/routes';

interface UserDataSectionProps {
  userInfo: UserResponse | null;
}

export default function UserDataSection({ userInfo }: UserDataSectionProps) {
  const navigate = useNavigate();

  const handleNavigateToName = () => {
    navigate(ROUTES.PROFILE_SETTING_DETAIL + '/name');
  };
  const handleNavigateToEmail = () => {
    navigate(ROUTES.PROFILE_SETTING_DETAIL + '/email');
  };
  const handleNavigateToGender = () => {
    navigate(ROUTES.PROFILE_SETTING_DETAIL + '/gender');
  };

  return (
    userInfo && (
      <div className='border-grayscale-200 rounded-[1.6rem] border'>
        <div className='border-grayscale-200 flex flex-row items-center justify-between border-b py-[1.6rem] pl-[2rem] pr-[1.4rem]'>
          <span className='text-grayscale-500 title-sb-12'>이름</span>
          <button
            type='button'
            className='flex flex-row items-center gap-[0.5rem]'
            onClick={handleNavigateToName}
          >
            <span className='text-grayscale-900 body-m-13'>
              {userInfo.name}
            </span>
            <Icon name='ic_next' width={18} height={18} />
          </button>
        </div>
        <div className='border-grayscale-200 flex flex-row items-center justify-between border-b py-[1.6rem] pl-[2rem] pr-[1.4rem]'>
          <span className='text-grayscale-500 title-sb-12'>이메일</span>
          <button
            type='button'
            className='flex flex-row items-center gap-[0.5rem]'
            onClick={handleNavigateToEmail}
          >
            <span className='text-grayscale-900 body-m-13'>
              {userInfo.email}
            </span>
            <Icon name='ic_next' width={18} height={18} />
          </button>
        </div>
        <div className='flex flex-row items-center justify-between py-[1.6rem] pl-[2rem] pr-[1.4rem]'>
          <span className='text-grayscale-500 title-sb-12'>성별</span>
          <button
            type='button'
            className='flex flex-row items-center gap-[0.5rem]'
            onClick={handleNavigateToGender}
          >
            <span className='text-grayscale-900 body-m-13'>
              {userInfo.gender}
            </span>
            <Icon name='ic_next' width={18} height={18} />
          </button>
        </div>
      </div>
    )
  );
}
