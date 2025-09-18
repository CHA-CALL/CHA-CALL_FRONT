import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MessageForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const MAX_LENGTH = 100;

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setHasChanges(true);
  };

  const handleClickSave = () => {
    //TODO: API 연동
    setHasChanges(false);
    //TODO: Toast 알림 표시
    navigate('/message-list');
  };

  const handleClickBack = () => {
    if (hasChanges && message.trim()) {
      const confirmExit = window.confirm('저장하지 않고 나가시겠습니까?');
      if (confirmExit) {
        navigate('/message-list');
      }
    } else {
      navigate('/message-list');
    }
  };

  const isDisabled = message.length === 0;

  return (
    <div>
      <Navigation
        text='자주 쓰는 메세지 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex min-h-[calc(100vh-13.2rem)] flex-col gap-[1rem] p-[2rem]'>
        <textarea
          className='body-m-14 border-grayscale-300 text-grayscale-900 placeholder:text-grayscale-300 caret-primary-700 placeholder:body-m-14 focus:border-grayscale-500 min-h-[34rem] rounded-[1.6rem] px-[2rem] py-[1.5rem] focus:outline-none'
          placeholder='메세지를 입력해주세요.'
          value={message}
          maxLength={MAX_LENGTH}
          onChange={handleChangeMessage}
        ></textarea>
        <div className='caption-m-12 flex items-center justify-end gap-[0.1rem]'>
          <p className='text-primary-700'>{message.length}</p>
          <p className='text-grayscale-700'>/</p>
          <p className='text-grayscale-700'>{MAX_LENGTH}</p>
        </div>
      </div>
      <footer className='sticky bottom-[0] left-[0] right-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
        <Button
          variant='cta'
          buttonStyle={isDisabled ? 'disabled' : 'active'}
          className='h-[5.4rem]'
          handleClickButton={handleClickSave}
        >
          저장하기
        </Button>
      </footer>
    </div>
  );
}
