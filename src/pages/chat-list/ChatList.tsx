import { useNavigate } from 'react-router-dom';
import ChatListManageBar from '@pages/chat-list/components/ChatListManageBar';
import { useChatList } from '@pages/chat-list/hooks/use-chat-list';
import ChatListItem from '@shared/components/chat/chat-list-item/ChatListItem';
import { Icon } from '@icon/Icon';
import OverlayModal from '@layout/overlay/Overlay';
import Navigation from '@layout/navigation/Navigation';
import Button from '@ui/button/Button';
import { useGetChatList } from '@pages/chat-list/api/chat-list-api';
import Loading from '@layout/loading/Loading';

export default function ChatList() {
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

  //TODO: 유저,오너 구분 확인 로직 필요
  const isOwner = true;
  const { data: chatListData, isPending, isError } = useGetChatList(isOwner);

  const {
    isEditing,
    activeFilter,
    setActiveFilter,
    selectChatList,
    handleToggleEdit,
    handleCheckChange,
    handleSelectOff,
    handleDeleteChat,
    isDeleteModalOpen,
    handleCloseModal,
  } = useChatList();

  //TODO: 에러 처리 필요
  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <div>채팅 목록을 불러오는 중에 오류가 발생했습니다.</div>;
  }
  return (
    <>
      <Navigation
        centerContent='채팅'
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
        {(chatListData?.content ?? []).map(item => {
          return (
            <ChatListItem
              key={item.id}
              isEditing={isEditing}
              name={item.name ?? ''}
              foodTruckName={item.foodTruckName ?? ''}
              lastMessage={item.lastMessage ?? ''}
              lastMessageSendTime={item.lastMessageSendTime ?? ''}
              unreadCount={item.unreadCount ?? 0}
              isChecked={selectChatList.has(item.id ?? 0)}
              handleCheckChange={() => handleCheckChange(item.id ?? 0)}
            />
          );
        })}
      </div>
    </>
  );
}
