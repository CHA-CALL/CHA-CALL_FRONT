import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import Overlay from '@shared/components/overlay/Overlay';
import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MessageForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);
  const MAX_LENGTH = 100;
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setSubmit(false);
  };

  const handleClickSave = () => {
    //TODO: API 연동
    setSubmit(true);
    //TODO: Toast 알림 표시
    navigate('/message-list');
  };

  const handleClickBack = () => {
    if (!submit && message.trim()) {
      setIsOpen(true);
    } else {
      navigate('/message-list');
    }
  };

  const isDisabled = message.length === 0;
  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickConfirm = () => {
    setIsOpen(false);
    navigate('/message-list');
  };

  return (
    <div>
      <Overlay isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <div className='flex w-[27.4rem] flex-col items-center justify-center gap-[1.6rem] rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
          <div className='flex w-full flex-col justify-start gap-[0.2rem]'>
            <p className='title-sb-16 text-grayscale-900'>
              저장하지 않고 나가시겠습니까?
            </p>
            <p className='caption-m-12 text-grayscale-700'>
              작성 중인 내용은 저장되지 않으며,
              <br />
              나가면 모두 삭제됩니다.
            </p>
          </div>
          <div className='flex justify-between gap-[1rem]'>
            <Button
              variant='cta'
              buttonStyle='sub'
              className='w-[11.2rem]'
              handleClickButton={handleClickConfirm}
            >
              나가기
            </Button>
            <Button
              variant='cta'
              buttonStyle='active'
              className='w-[11.2rem]'
              handleClickButton={handleClickCancel}
            >
              취소
            </Button>
          </div>
        </div>
      </Overlay>
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
