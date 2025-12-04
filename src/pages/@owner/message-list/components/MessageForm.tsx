import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@ui/button/Button';
import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import ConfirmModal from '@pages/@owner/message-list/@modal/(.)confirm-modal/ConfirmModal';
import { usePostOwnerChatTemplates } from '@pages/@owner/message-list/hooks/use-owner-message';
import useToast from '@hooks/use-toast';
import Loading from '@layout/loading/Loading';
import Textarea from '@ui/text-area/Textarea';

export default function MessageForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);
  const MAX_LENGTH = 500;
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: postChatTemplate, isPending } = usePostOwnerChatTemplates();
  const toast = useToast();

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setSubmit(false);
  };

  const handleClickSave = () => {
    if (message.trim()) {
      postChatTemplate(message, {
        onSuccess: () => {
          setSubmit(true);
          toast.success('메시지가 성공적으로 저장되었습니다.');
          navigate(-1);
        },
        onError: () => {
          toast.error('메시지 저장에 실패했습니다.');
        },
      });
    }
  };

  const handleClickBack = () => {
    if (!submit && message.trim()) {
      setIsOpen(true);
    } else {
      navigate(-1);
    }
  };

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickConfirm = () => {
    setIsOpen(false);
    navigate(-1);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        handleClickConfirm={handleClickConfirm}
        handleClickCancel={handleClickCancel}
      />
      <Navigation
        centerContent='자주 쓰는 메세지 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex flex-col p-[2rem]'>
        <Textarea
          placeholder='텍스트를 입력해주세요.'
          value={message}
          maxLength={MAX_LENGTH}
          handleChange={handleChangeMessage}
        />
      </div>
      <footer className='bottom-[0] bg-white px-[2rem] py-[1.7rem] fixed-center'>
        <Button
          variant='cta'
          buttonStyle={message.length === 0 ? 'disabled' : 'active'}
          className='h-[5.4rem]'
          handleClickButton={handleClickSave}
          disabled={message.length === 0}
        >
          저장하기
        </Button>
      </footer>
    </>
  );
}
