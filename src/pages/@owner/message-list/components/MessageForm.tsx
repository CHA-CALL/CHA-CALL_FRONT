import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import Button from '@ui/button/Button';
import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import { usePostOwnerChatTemplates } from '@pages/@owner/message-list/hooks/use-owner-message';
import useToast from '@hooks/use-toast';
import Loading from '@layout/loading/Loading';
import Textarea from '@ui/text-area/Textarea';
import ConfirmModal from '@components/ui/modal/ConfirmModal';

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
          navigate(ROUTES.MESSAGE_LIST);
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
      navigate(ROUTES.MESSAGE_LIST);
    }
  };

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickConfirm = () => {
    setIsOpen(false);
    navigate(ROUTES.MESSAGE_LIST);
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
        title='저장하지 않고 나가시겠습니까?'
        description={`작성 중인 내용은 저장되지 않으며, \n나가면 모두 삭제됩니다.`}
        handleConfirm={handleClickConfirm}
        handleCancel={handleClickCancel}
      />
      <Navigation
        text='자주 쓰는 메세지 설정'
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
      <footer className='fixed-center bottom-[0] bg-white px-[2rem] py-[1.7rem]'>
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
