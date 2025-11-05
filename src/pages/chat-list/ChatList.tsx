import { useNavigate } from 'react-router-dom';
import ChatListManageBar from '@pages/chat-list/components/ChatListManageBar';
import { useChatList } from '@pages/chat-list/hooks/use-chat-list';
import ChatListItem from '@shared/components/chat/chat-list-item/ChatListItem';
import { Icon } from '@icon/Icon';
import OverlayModal from '@layout/overlay/Overlay';
import Navigation from '@layout/navigation/Navigation';
import Button from '@ui/button/Button';

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
      <OverlayModal
        isOpen={isDeleteModalOpen}
        position='center'
        handleClose={handleCloseModal}
      >
        <div className='flex min-w-[27.4rem] flex-col gap-[1.6rem] rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]'>
          <div>
            <h3 className='title-sb-16'>선택한 대화를 삭제할까요?</h3>
            <p className='text-grayscale-700 caption-m-12'>{`${selectChatList.size}건이 삭제되며 되돌릴 수 없습니다.`}</p>
          </div>
          <div className='flex gap-[1rem]'>
            <Button
              variant='cta'
              buttonStyle='sub'
              handleClickButton={handleCloseModal}
            >
              취소
            </Button>
            <Button
              variant='cta'
              buttonStyle='active'
              handleClickButton={handleCloseModal}
            >
              삭제
            </Button>
          </div>
        </div>
      </OverlayModal>
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
