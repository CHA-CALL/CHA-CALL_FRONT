import { useNavigate } from 'react-router-dom';

import type { UserResponse } from 'apis/data-contracts';

import { Icon } from '@shared/components/icon/Icon';

interface UserDataSectionProps {
  userInfo: UserResponse | null;
}

export default function UserDataSection({ userInfo }: UserDataSectionProps) {
  const navigate = useNavigate();

  // TODO: 추가된 페이지 경로 설정
  const handleNavigateTo = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    userInfo && (
      <div className='rounded-[1.6rem] border border-grayscale-200'>
        <div className='flex flex-row items-center justify-between border-b border-grayscale-200 py-[1.6rem] pl-[2rem] pr-[1.4rem]'>
          <span className='text-grayscale-500 title-sb-12'>이름</span>
          <button
            type='button'
            className='flex flex-row items-center gap-[0.5rem]'
            onClick={() => handleNavigateTo('/')}
          >
            <span className='body-m-13 text-grayscale-900'>
              {userInfo.name}
            </span>
            <Icon name='ic_next' width={18} height={18} />
          </button>
        </div>
        <div className='flex flex-row items-center justify-between border-b border-grayscale-200 py-[1.6rem] pl-[2rem] pr-[1.4rem]'>
          <span className='text-grayscale-500 title-sb-12'>이메일</span>
          <button
            type='button'
            className='flex flex-row items-center gap-[0.5rem]'
            onClick={() => handleNavigateTo('/')}
          >
            <span className='body-m-13 text-grayscale-900'>
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
            onClick={() => handleNavigateTo('/')}
          >
            <span className='body-m-13 text-grayscale-900'>
              {userInfo.gender}
            </span>
            <Icon name='ic_next' width={18} height={18} />
          </button>
        </div>
      </div>
    )
  );
}
