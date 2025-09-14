import ChatListItem from '@shared/components/chat-list-item/ChatListItem';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import { useEffect, useState } from 'react';
import ChatListManageBar from './components/ChatListManageBar';
import Modal from '@shared/components/modal/Modal';
import { useNavigate } from 'react-router-dom';

const mockup = [
  {
    clientId: 1,
    clientName: '고객이름',
    tagTitle: '오소리 푸드트럭',
    lastChat: '혹시 예약 가능할까요?',
    lastChatTime: '오후 5:40',
    unreadCount: 12,
  },
  {
    clientId: 2,
    clientName: '고객이름',
    tagTitle: '오소리 푸드트럭',
    lastChat: '혹시 예약 가능할까요?',
    lastChatTime: '오후 5:40',
    unreadCount: 122,
  },
  {
    clientId: 3,
    clientName: '고객이름',
    tagTitle: '오소리 푸드트럭',
    lastChat: '혹시 예약 가능할까요?',
    lastChatTime: '오후 5:40',
    unreadCount: 0,
  },
  {
    clientId: 4,
    clientName: '고객이름고객이름고객이름',
    tagTitle: '오소리 푸드트럭',
    lastChat:
      '혹시 예약 가능할까요? 아 안된다고요. 알겠습니다. 몇자 제한입니까',
    lastChatTime: '오후 5:40',
    unreadCount: 12,
  },
];

type Chat = {
  clientId: number;
  clientName: string;
  tagTitle: string;
  lastChat: string;
  lastChatTime: string;
  unreadCount: number;
};

export default function ChatList() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('전체보기');
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [selectChatList, setSelectChatList] = useState(new Set<number>());

  const handleClickBack = () => navigate(-1)
  const handleToggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const handleCheckChange = (clientId: number) => {
    setSelectChatList(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clientId)) {
        newSet.delete(clientId);
      } else {
        newSet.add(clientId);
      }
      return newSet;
    });
  };

  const handleSelectOff = () => {
    const newSet = new Set<number>();
    setSelectChatList(newSet);
  };

  const handleDeleteChat = () => {
    setIsDeleteModalOpen(true);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setChatList(mockup);
  }, []);

  return (
    <div>
      <Navigation text='채팅' leftIcon={<Icon name='ic_back'/>} handleLeftClick={handleClickBack}/>
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
        handleCancelClick={() => setIsDeleteModalOpen(false)}
        handleConfirmClick={() => setIsDeleteModalOpen(false)}
        handleModalClose={() => setIsDeleteModalOpen(false)}
      />
      <div className='py-[1.2rem]'>
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
