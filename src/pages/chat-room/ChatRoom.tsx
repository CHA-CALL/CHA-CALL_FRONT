import { useState } from 'react';
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

  const lastMessage = messages[messages.length - 1];
  const lastOtherMessage = lastMessage && !lastMessage.isMine ? lastMessage : null;

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        text='채팅방'
        handleLeftClick={() => setIsLeaveSheetOpen(true)}
      />

      <ChatMessageList messages={messages} />

      {lastOtherMessage && (
        <NewChatIndicator
          profileImage='https://placehold.co/40'
          name='상대방'
          message={lastOtherMessage.message}
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
    </>
  );
}
