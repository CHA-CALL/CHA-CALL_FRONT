import ChatListManageBar from '@pages/chat-list/components/ChatListManageBar';
import { useChatList } from '@pages/chat-list/hooks/use-chat-list';
import ChatListItem from '@shared/components/chat-list-item/ChatListItem';
import { Icon } from '@shared/components/icon/Icon';
import Modal from '@shared/components/modal/Modal';
import Navigation from '@shared/components/navigation/Navigation';
import { useNavigate } from 'react-router-dom';

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
    <div className='flex h-screen flex-col'>
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
      <div className='scrollbar-hide flex flex-1 flex-col overflow-y-scroll py-[1.2rem]'>
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
