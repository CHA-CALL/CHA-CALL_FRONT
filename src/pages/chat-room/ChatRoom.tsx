import { Icon } from '@components/icon/Icon';
import Navigation from '@components/layout/navigation/Navigation';
import ChatInputArea from '@pages/chat-room/chat-input-area/ChatInputArea';
import MessageListBottomSheet from '@pages/chat-room/chat-input-area/components/MessageListBottomSheet';
import { useState } from 'react';

export default function ChatRoom() {
  const [isMessageListOpen, setIsMessageListOpen] = useState(false);
  const [selectedQuickMessage, setSelectedQuickMessage] = useState<
    string | undefined
  >(undefined);

  const handleSelectQuickMessage = (message?: string) => {
    setSelectedQuickMessage(message);
    setIsMessageListOpen(false);
  };
  const handleOpenMessageList = () => {
    setIsMessageListOpen(true);
  };
  const handleCloseMessageList = () => {
    setIsMessageListOpen(false);
  };

  return (
    <>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        text='채팅방'
      />
      <div className='flex flex-col gap-[4rem] p-[2rem]'>채팅 목록</div>
      <footer className='bottom-[0] w-full fixed-center'>
        <ChatInputArea
          selectedQuickMessage={selectedQuickMessage}
          handleOpenMessageList={handleOpenMessageList}
        />
      </footer>
      {isMessageListOpen && (
        <MessageListBottomSheet
          isOpen={isMessageListOpen}
          handleSelectQuickMessage={handleSelectQuickMessage}
          handleCloseBottomSheet={handleCloseMessageList}
        />
      )}
    </>
  );
}
