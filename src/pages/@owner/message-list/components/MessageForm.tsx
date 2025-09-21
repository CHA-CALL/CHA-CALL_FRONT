import { ROUTES } from '@router/constant/routes';
import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import ConfirmModal from '@pages/@owner/message-list/@modal/(.)confirm-modal/ConfirmModal';
import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MessageForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);
  const MAX_LENGTH = 500;
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setSubmit(false);
  };

  const handleClickSave = () => {
    //TODO: API 연동
    setSubmit(true);
    //TODO: Toast 알림 표시
    navigate(ROUTES.MESSAGELIST);
  };

  const handleClickBack = () => {
    if (!submit && message.trim()) {
      setIsOpen(true);
    } else {
      navigate(ROUTES.MESSAGELIST);
    }
  };

  const isDisabled = message.length === 0;
  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickConfirm = () => {
    setIsOpen(false);
    navigate(ROUTES.MESSAGELIST);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='flex h-screen flex-col'>
      <ConfirmModal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        handleClickConfirm={handleClickConfirm}
        handleClickCancel={handleClickCancel}
      />
      <Navigation
        text='자주 쓰는 메세지 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex flex-1 flex-col gap-[1rem] p-[2rem]'>
        <textarea
          className='body-m-14 border-grayscale-300 text-grayscale-900 placeholder:text-grayscale-300 caret-primary-700 placeholder:body-m-14 focus:border-grayscale-500 min-h-[34rem] rounded-[1.6rem] px-[2rem] py-[1.5rem] focus:outline-none'
          placeholder='텍스트를 입력해주세요.'
          value={message}
          maxLength={MAX_LENGTH}
          onChange={handleChangeMessage}
        />
        <div className='caption-m-12 flex items-center justify-end gap-[0.1rem]'>
          <p className='text-primary-700'>{message.length}</p>
          <p className='text-grayscale-700'>/</p>
          <p className='text-grayscale-700'>{MAX_LENGTH}</p>
        </div>
      </div>
      <footer className='sticky bottom-[0] w-full bg-white px-[2rem] py-[1.7rem]'>
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
