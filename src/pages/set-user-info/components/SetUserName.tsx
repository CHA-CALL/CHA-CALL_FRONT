import { Icon } from '@shared/components/icon/Icon';
import Input from '@shared/components/input/Input';
import type { SetUserInfoItemProps } from '@pages/set-user-info/types/set-user-types';
import { USER_NAME_MAX_LENGTH } from '@pages/set-user-info/constant/set-user-constant';

import type { ChangeEvent } from 'react';

export default function SetUserName({
  userInfo,
  setUserInfo,
}: SetUserInfoItemProps) {
  const userName = userInfo?.name ?? '';

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  const handleClearName = () => {
    setUserInfo(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        name: '',
      };
    });
  };
  return (
    <div className='flex flex-1 flex-col gap-[1rem]'>
      <nav className='flex flex-col gap-[0.2rem] px-[0.5rem]'>
        <h2 className='title-sb-14'>이름</h2>
      </nav>

      <Input
        value={userName}
        placeholder={userName}
        maxLength={userName === '' ? undefined : USER_NAME_MAX_LENGTH}
        rightComponent={
          <button className='translate-y-[0.2rem]'>
            <Icon name='ic_close' />
          </button>
        }
        handleRightClick={handleClearName}
        onChange={handleChangeName}
      />
    </div>
  );
}
