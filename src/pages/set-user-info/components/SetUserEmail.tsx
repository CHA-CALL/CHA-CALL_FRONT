import { Icon } from '@components/icon/Icon';
import Input from '@components/input/Input';
import type { SetUserInfoItemProps } from '@pages/set-user-info/types/set-user-types';
import type { ChangeEvent } from 'react';

export default function SetUserEmail({
  userInfo,
  setUserInfo,
}: SetUserInfoItemProps) {
  const userEmail = userInfo?.email ?? '';

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  const handleClearEmail = () => {
    setUserInfo(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        email: '',
      };
    });
  };

  return (
    <div className='flex flex-1 flex-col gap-[1rem] py-[2rem]'>
      <h2 className='title-sb-16 px-[0.5rem]'>이메일을 입력해주세요.</h2>
      <Input
        value={userEmail}
        onChange={handleChangeEmail}
        placeholder={'이메일 입력'}
        rightComponent={
          userEmail !== '' && (
            <button className='translate-y-[0.2rem]'>
              <Icon name='ic_close' />
            </button>
          )
        }
        handleRightClick={handleClearEmail}
      />
    </div>
  );
}
