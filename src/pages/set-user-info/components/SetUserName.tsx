import { Icon } from '@shared/components/icon/Icon';
import SearchBar from '@shared/components/search-bar/SearchBar';
import type { SetUserInfoItemProps } from '@pages/set-user-info/types/set-user-types';
import {
  setUserNameText,
  USER_NAME_MAX_LENGTH,
} from '@pages/set-user-info/constant/set-user-constant';
import { useRole } from '@shared/hooks/use-role';
import { ROLE } from '@shared/constant/role';

interface SetUserNameProps extends SetUserInfoItemProps {
  originalName: string;
}

export default function SetUserName({
  newUserInfo,
  setNewUserInfo,
  originalName,
}: SetUserNameProps) {
  const { title, ownerText, memberText } = setUserNameText;
  const { role } = useRole();
  const isPresident = role === ROLE.PRESIDENT;

  const handleChangeName = (value: string) => {
    setNewUserInfo(prev => ({
      ...prev,
      name: value,
    }));
  };

  return (
    <div className='flex flex-1 flex-col gap-[1rem] py-[2rem]'>
      <nav className='flex flex-col gap-[0.2rem] px-[0.5rem]'>
        <h2 className='title-sb-16'>{title}</h2>
        <p className='caption-m-11 text-grayscale-500'>
          {isPresident ? ownerText : memberText}
        </p>
      </nav>

      <SearchBar
        value={newUserInfo?.name}
        onChange={e => handleChangeName(e.target.value)}
        placeholder={originalName}
        maxLength={newUserInfo.name === '' ? undefined : USER_NAME_MAX_LENGTH}
        rightComponent={
          newUserInfo.name !== '' && (
            <button
              className='translate-y-[0.2rem]'
              onClick={() => handleChangeName('')}
            >
              <Icon name='ic_close' />
            </button>
          )
        }
      />
    </div>
  );
}
