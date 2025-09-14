import ChatListItem from '@shared/components/chat-list-item/ChatListItem';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import ChatListManageBar from '@pages/chat-list/components/ChatListManageBar';
import Modal from '@shared/components/modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useChatList } from '@pages/chat-list/hooks/useChatList';

export default function ChatList() {
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

  const {
    isEditing,
    activeFilter,
    setActiveFilter,
    chatList,
    selectChatList,
    handleToggleEdit,
    handleCheckChange,
    handleSelectOff,
    handleDeleteChat,
    isDeleteModalOpen,
    handleCloseModal,
  } = useChatList();

  return (
    <div className='flex flex-col h-screen'>
      <Navigation
        text='채팅'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <ChatListManageBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        isEditing={isEditing}
        selectChatList={selectChatList}
        handleToggleEdit={handleToggleEdit}
        handleSelectOff={handleSelectOff}
        handleDeleteChat={handleDeleteChat}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        title={'선택한 대화를 삭제할까요?'}
        content={`${selectChatList.size}건이 삭제되며 되돌릴 수 없습니다.`}
        cancelChildren={'취소'}
        confirmChildren={'삭제'}
        handleCancelClick={handleCloseModal}
        handleConfirmClick={handleCloseModal}
        handleModalClose={handleCloseModal}
      />
      <div className='flex flex-col flex-1 py-[1.2rem] overflow-y-scroll'>
        {(chatList ?? []).map(item => {
          return (
            <ChatListItem
              key={item.clientId}
              isEditing={isEditing}
              clientName={item.clientName}
              tagTitle={item.tagTitle}
              lastChat={item.lastChat}
              lastChatTime={item.lastChatTime}
              unreadCount={item.unreadCount}
              isChecked={selectChatList.has(item.clientId)}
              handleCheckChange={() => handleCheckChange(item.clientId)}
            />
          );
        })}
      </div>
    </div>
  );
}
