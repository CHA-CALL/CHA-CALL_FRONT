import { Icon } from '@shared/components/icon/Icon';
import Input from '@shared/components/ui/input/Input';
import type { SetUserInfoItemProps } from '@pages/set-user-info/types/set-user-types';
import {
  SET_USER_NAME_TEXT,
  USER_NAME_MAX_LENGTH,
} from '@pages/set-user-info/constant/set-user-constant';
import { useRole } from '@shared/hooks/use-role';
import { ROLE } from '@shared/constant/role';
import type { ChangeEvent } from 'react';

export default function SetUserName({
  userInfo,
  setUserInfo,
}: SetUserInfoItemProps) {
  const { title, ownerText, memberText } = SET_USER_NAME_TEXT;
  const { role } = useRole();
  const isProvider = role === ROLE.PROVIDER;
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
    <div className='flex flex-1 flex-col gap-[1rem] py-[2rem]'>
      <nav className='flex flex-col gap-[0.2rem] px-[0.5rem]'>
        <h2 className='title-sb-16'>{title}</h2>
        <p className='caption-m-11 text-grayscale-500'>
          {isProvider ? ownerText : memberText}
        </p>
      </nav>

      <Input
        value={userName}
        placeholder={userName}
        maxLength={userName === '' ? undefined : USER_NAME_MAX_LENGTH}
        rightComponent={
          userName !== '' && (
            <button className='translate-y-[0.2rem]'>
              <Icon name='ic_close' />
            </button>
          )
        }
        handleRightClick={handleClearName}
        onChange={handleChangeName}
      />
    </div>
  );
}
