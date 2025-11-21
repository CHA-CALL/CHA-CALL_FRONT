import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { Icon } from '@icon/Icon';
import Navigation from '@layout/navigation/Navigation';
import ChatInputArea from '@pages/chat-room/chat-input-area/ChatInputArea';
import ChatMessageList from '@pages/chat-room/chat-input-area/components/ChatMessageList';
import NewChatIndicator from '@pages/chat-room/components/NewChatIndicator';
import LeaveChatBottomSheet from '@pages/chat-room/components/LeaveChatBottomSheet';
import { useSendMessage } from '@pages/chat-room/chat-input-area/hooks/use-send-message';

export default function ChatRoom() {
  const navigate = useNavigate();

  // TODO: 상대방 이름 받아오기
  const otherName = '상대방 이름';
  const otherFoodTruckName = '상대방 푸드트럭';

  const { messages, handleSendMessage } = useSendMessage();
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);
  const [isLeaveSheetOpen, setIsLeaveSheetOpen] = useState(false);

  const handleOpenLeaveSheet = () => {
    setIsLeaveSheetOpen(true);
  }
  const handleCloseLeaveSheet = () => {
    setIsLeaveSheetOpen(false);
  }
  const handleClickBack = () => {
    navigate(ROUTES.CHATLIST);
  }
  const handleLeaveChat = () => {
    // TODO: 채팅방 나가기
  }

  const lastMessage = messages[messages.length - 1];
  const lastOtherMessage = lastMessage && !lastMessage.isMine ? lastMessage : null;

  useEffect(() => {
    if (!scrollElement || messages.length === 0) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    const isMyMessage = messages[messages.length - 1].isMine;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    if (isMyMessage || isNearBottom) {
      scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, scrollElement]);

  return (
    <div className='flex h-screen w-full flex-col bg-white'>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        rightIcon={<Icon name='ic_dot' className='text-grayscale-900' />}
        text={otherName}
        tag={otherFoodTruckName}
        handleLeftClick={handleClickBack}
        handleRightClick={handleOpenLeaveSheet}
      />

      <ChatMessageList
        messages={messages}
        scrollRef={setScrollElement}
      />

      {lastOtherMessage && scrollElement && (
        <NewChatIndicator
          profileImage={lastOtherMessage.profileImage || 'https://placehold.co/40'}
          name={otherName}
          message={lastOtherMessage.message || '예약 확정을 요청했어요!'}
          container={scrollElement}
        />
      )}

      <LeaveChatBottomSheet
        isOpen={isLeaveSheetOpen}
        handleLeaveChat={handleLeaveChat}
        handleCloseBottomSheet={handleCloseLeaveSheet}
      />

      <footer className='fixed-center bottom-[0] w-full'>
        <ChatInputArea handleSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}
