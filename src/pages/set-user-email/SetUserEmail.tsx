import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import SearchBar from '@shared/components/search-bar/SearchBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetUserEmail() {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('');
  const handleClickBack = () => navigate(-1);
  const handleClickSave = () => {
    // TODO : 추후 이메일 변경 API 추가, 프로필 페이지로 이동 후 toast
    navigate('/set-location');
  };
  const handleClearEmail = () => setNewEmail('');

  return (
    <div className='flex h-dvh flex-col'>
      <Navigation
        text='이메일 변경'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='jusify-between flex flex-1 flex-col px-[2rem] pb-[1.7rem]'>
        <div className='flex flex-1 flex-col gap-[1rem] py-[2rem]'>
          <h2 className='title-sb-16 px-[0.5rem]'>이메일을 입력해주세요.</h2>
          <SearchBar
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            placeholder={'이메일 입력'}
            rightComponent={
              newEmail !== '' && (
                <button
                  className='translate-y-[0.2rem]'
                  onClick={handleClearEmail}
                >
                  <Icon name='ic_close' />
                </button>
              )
            }
          />
        </div>
        <Button
          variant='cta'
          buttonStyle={newEmail === '' ? 'disabled' : 'active'}
          className='h-[5.4rem]'
          handleClickButton={handleClickSave}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
