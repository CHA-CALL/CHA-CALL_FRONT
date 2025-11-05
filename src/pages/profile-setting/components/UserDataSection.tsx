import type { UserResponse } from 'apis/data-contracts';
interface UserDataSectionProps {
  userInfo: UserResponse | null;
}

export default function UserDataSection({ userInfo }: UserDataSectionProps) {
  return (
    userInfo && (
      <div className='border-grayscale-200 rounded-[1.6rem] border'>
        <div className='border-grayscale-200 flex flex-row items-center justify-between border-b py-[1.6rem] pl-[2rem] pr-[2rem]'>
          <span className='text-grayscale-500 title-sb-12'>이름</span>
          <span className='text-grayscale-900 body-m-13'>{userInfo.name}</span>
        </div>
        <div className='border-grayscale-200 flex flex-row items-center justify-between border-b py-[1.6rem] pl-[2rem] pr-[2rem]'>
          <span className='text-grayscale-500 title-sb-12'>이메일</span>
          <span className='text-grayscale-900 body-m-13'>{userInfo.email}</span>
        </div>
        <div className='flex flex-row items-center justify-between py-[1.6rem] pl-[2rem] pr-[2rem]'>
          <span className='text-grayscale-500 title-sb-12'>성별</span>
          <span className='text-grayscale-900 body-m-13'>
            {userInfo.gender}
          </span>
        </div>
      </div>
    )
  );
}
