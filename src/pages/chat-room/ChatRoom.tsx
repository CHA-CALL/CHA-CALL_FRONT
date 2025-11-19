import { useState, useEffect } from 'react';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/layout/navigation/Navigation';
import ChatInputArea from '@pages/chat-room/chat-input-area/ChatInputArea';
import ChatMessageList from '@pages/chat-room/chat-input-area/components/ChatMessageList';
import NewChatIndicator from '@components/chat/new-chat-indicator/NewChatIndicator';
import LeaveChatBottomSheet from '@components/chat/leave-chat-bottom-sheet/LeaveChatBottomSheet';
import { useSendMessage } from '@pages/chat-room/chat-input-area/hooks/use-send-message';

export default function ChatRoom() {
  const { messages, handleSendMessage } = useSendMessage();
  const [isLeaveSheetOpen, setIsLeaveSheetOpen] = useState(false);
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);

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
        text='채팅방'
        handleLeftClick={() => setIsLeaveSheetOpen(true)}
      />

      <ChatMessageList
        messages={messages}
        scrollRef={setScrollElement}
      />

      {lastOtherMessage && scrollElement && (
        <NewChatIndicator
          profileImage={lastOtherMessage.profileImage || 'https://placehold.co/40'}
          name='상대방'
          message={lastOtherMessage.message}
          container={scrollElement}
        />
      )}

      <LeaveChatBottomSheet
        isOpen={isLeaveSheetOpen}
        handleLeaveChat={() => setIsLeaveSheetOpen(false)}
        handleCloseBottomSheet={() => setIsLeaveSheetOpen(false)}
      />

      <footer className='fixed-center bottom-[0] w-full'>
        <ChatInputArea onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}
