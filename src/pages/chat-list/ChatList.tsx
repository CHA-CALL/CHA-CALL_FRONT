import ConfirmModal from '@components/ui/modal/ConfirmModal';
import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import ChatListManageBar from '@pages/chat-list/components/ChatListManageBar';
import { useChatList } from '@pages/chat-list/hooks/use-chat-list';
import ChatListItem from '@shared/components/chat/chat-list-item/ChatListItem';
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
    <>
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
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        handleClose={handleCloseModal}
        title={'선택한 대화를 삭제할까요?'}
        description={`${selectChatList.size}건이 삭제되며 되돌릴 수 없습니다.`}
        handleConfirm={handleCloseModal}
        handleCancel={handleCloseModal}
      />
      <div className='scrollbar-hide flex flex-col overflow-y-scroll pb-[2.4rem] pt-[7.8rem]'>
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
    </>
  );
}
