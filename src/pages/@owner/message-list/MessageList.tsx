import type { ChatTemplateResponse } from 'apis/data-contracts';

import Information from '@components/information/Information';
import ConfirmModal from '@components/ui/modal-confirm/ConfirmModal';
import useToast from '@hooks/use-toast';
import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import DeleteMessageBottomSheet from '@pages/@owner/message-list/@bottom-sheet/DeleteMessageBottomSheet';
import Message from '@pages/@owner/message-list/components/Message';
import {
  useDeleteOwnerChatTemplates,
  useOwnerChatTemplates,
} from '@pages/@owner/message-list/hooks/use-owner-message';
import { ROUTES } from '@router/constant/routes';
import ButtonFloating from '@ui/button-floating/ButtonFloating';
import Button from '@ui/button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MessageList() {
  const navigate = useNavigate();
  const { data: messageList } = useOwnerChatTemplates();
  const { mutate: deleteOwnerChatTemplates } = useDeleteOwnerChatTemplates();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const toast = useToast();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleAddClick = () => {
    navigate(ROUTES.MESSAGE_FORM);
  };

  const handleDeleteMessage = (messageId: string) => {
    setSelectedMessageId(messageId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMessageId('');
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setSelectedMessageId('');
  };

  const handleFinalDelete = () => {
    if (selectedMessageId) {
      deleteOwnerChatTemplates(selectedMessageId, {
        onSuccess: () => {
          setIsConfirmDeleteModalOpen(false);
          setSelectedMessageId('');
          toast.success('메시지가 성공적으로 삭제되었습니다.');
        },
        onError: () => {
          toast.error('메시지 삭제에 실패했습니다.');
        },
      });
    }
  };

  return (
    <>
      <DeleteMessageBottomSheet
        isOpen={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleDeleteMessage={handleConfirmDelete}
        handleCloseModal={handleCloseDeleteModal}
      />
      <ConfirmModal
        isOpen={isConfirmDeleteModalOpen}
        handleClose={handleCloseConfirmModal}
        title='이 메시지를 삭제할까요?'
        description='삭제 후에는 되돌릴 수 없습니다.'
        handleClickRight={handleFinalDelete}
        handleClickLeft={handleCloseConfirmModal}
      />
      <Navigation
        centerContent='자주 쓰는 메세지 설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='fixed-center top-[4.8rem] z-10 bg-white p-[2rem] pb-[1.6rem]'>
        <Information
          iconId='ic_chat_dot'
          text='한 번 등록하면 채팅에서 바로 내용 전송이 가능해요!'
        />
      </div>

      <div className='flex flex-col gap-[1.2rem] px-[2rem] pb-[10rem] pt-[8rem]'>
        {messageList?.data &&
          messageList.data.length > 0 &&
          messageList.data.map(
            (message: ChatTemplateResponse, index: number) => (
              <Message
                key={index}
                number={index + 1}
                message={message.content || ''}
                messageId={String(message.chatTemplateId)}
                handleDeleteMessage={handleDeleteMessage}
              />
            )
          )}
      </div>

      <footer className='fixed-center bottom-[0] bg-white px-[2rem] py-[1.7rem] shadow-[0_-4px_10px_0_rgba(0,0,0,0.04)]'>
        <Button
          variant='default'
          buttonStyle='large'
          className='border-grayscale-200 body-m-14 w-full rounded-[1.6rem] border'
          handleClickButton={handleAddClick}
        >
          + 추가하기
        </Button>
      </footer>

      <ButtonFloating />
    </>
  );
}
