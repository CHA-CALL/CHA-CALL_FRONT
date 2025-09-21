import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import SearchBar from '@shared/components/search-bar/SearchBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USER_NAME_MAX_LENGTH = 25;

export default function SetUserName() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [newName, setNewName] = useState('');
  const handleClickBack = () => navigate(-1);
  const handleClickSave = () => {
    // TODO : 추후 이름 변경 API 추가, 프로필 페이지로 이동 후 toast
    navigate('/set-location');
  };
  const handleClearName = () => setNewName('');

  useEffect(() => {
    setUserName('원래이름');
  }, []);

  return (
    <div className='flex h-dvh flex-col'>
      <Navigation
        text='이름 변경'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='jusify-between flex flex-1 flex-col px-[2rem] pb-[1.7rem]'>
        <div className='flex flex-1 flex-col gap-[1rem] py-[2rem]'>
          <nav className='flex flex-col gap-[0.2rem] px-[0.5rem]'>
            <h2 className='title-sb-16'>이름을 입력해주세요.</h2>
            <p className='caption-m-11 text-grayscale-500'>
              사장님에게 보여지는 이름입니다.
            </p>
          </nav>

          <SearchBar
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder={userName}
            maxLength={newName === '' ? undefined : USER_NAME_MAX_LENGTH}
            rightComponent={
              newName !== '' && (
                <button
                  className='translate-y-[0.2rem]'
                  onClick={handleClearName}
                >
                  <Icon name='ic_close' />
                </button>
              )
            }
          />
        </div>
        <Button
          variant='cta'
          buttonStyle={newName === '' ? 'disabled' : 'active'}
          className='h-[5.4rem]'
          handleClickButton={handleClickSave}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
