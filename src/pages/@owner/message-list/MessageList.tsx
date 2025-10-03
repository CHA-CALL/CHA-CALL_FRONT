import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import Button from '@shared/components/button/Button';
import Message from '@pages/@owner/message-list/components/Message';
import Information from '@shared/components/information/Information';
import { ROUTES } from '@router/constant/routes';
import { useState } from 'react';
import DeleteMessageBottomSheet from '@pages/@owner/message-list/@modal/(.)delete-message-bottom-sheet/DeleteMessageBottomSheet';
import ConfirmDeleteModal from '@pages/@owner/message-list/@modal/(.)confirm-delete-modal/ConfirmExitModal';
import ButtonFloating from '@shared/components/button-floating/ButtonFloating';
import {
  useOwnerChatTemplates,
  useDeleteOwnerChatTemplates,
} from '@pages/@owner/message-list/hooks/use-owner-message';
import type { ChatTemplateResponse } from '@/../apis/data-contracts';
import useToast from '@shared/hooks/use-toast';

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
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        handleClose={handleCloseConfirmModal}
        handleClickConfirm={handleFinalDelete}
        handleClickCancel={handleCloseConfirmModal}
      />
      <Navigation
        text='자주 쓰는 메세지 설정'
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
