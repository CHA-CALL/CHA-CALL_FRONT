import { Icon } from '@shared/components/icon/Icon';
import SearchBar from '@shared/components/search-bar/SearchBar';
import type { SetUserInfoItemProps } from '@pages/set-user-info/types/set-user-types';

export default function SetUserEmail({
  newUserInfo,
  setNewUserInfo,
}: SetUserInfoItemProps) {
  const handleChangeEmail = (value: string) => {
    setNewUserInfo(prev => ({
      ...prev,
      email: value,
    }));
  };
  return (
    <div className='flex flex-1 flex-col gap-[1rem] py-[2rem]'>
      <h2 className='title-sb-16 px-[0.5rem]'>이메일을 입력해주세요.</h2>
      <SearchBar
        value={newUserInfo.email}
        onChange={e => handleChangeEmail(e.target.value)}
        placeholder={'이메일 입력'}
        rightComponent={
          newUserInfo.email !== '' && (
            <button
              className='translate-y-[0.2rem]'
              onClick={() => handleChangeEmail('')}
            >
              <Icon name='ic_close' />
            </button>
          )
        }
      />
    </div>
  );
}
