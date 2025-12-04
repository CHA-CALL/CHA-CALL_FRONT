import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';
import { Icon } from '@icon/Icon';
import ButtonFloating from '@ui/button-floating/ButtonFloating';
import Navigation from '@layout/navigation/Navigation';
import ChatInputArea from '@pages/chat-room/chat-input-area/ChatInputArea';
import ChatMessageList from '@pages/chat-room/components/ChatMessageList';
import NewChatIndicator from '@pages/chat-room/components/NewChatIndicator';
import LeaveChatBottomSheet from '@pages/chat-room/components/LeaveChatBottomSheet';
import MessageListBottomSheet from '@pages/chat-room/chat-input-area/components/MessageListBottomSheet';
import { useSendMessage } from '@pages/chat-room/chat-input-area/hooks/use-send-message';
import Tag from '@components/ui/tag/Tag';

export default function ChatRoom() {
  const navigate = useNavigate();

  // TODO: 상대방 이름 받아오기
  const otherName = '상대방 이름';
  const otherFoodTruckName = '상대방 푸드트럭';

  const { messages, handleSendMessage } = useSendMessage();
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(
    null
  );
  const [showNewChatIndicator, setShowNewChatIndicator] = useState(false);
  const [isLeaveSheetOpen, setIsLeaveSheetOpen] = useState(false);
  const [isMessageListOpen, setIsMessageListOpen] = useState(false);
  const [isExtensionMenuOpen, setIsExtensionMenuOpen] = useState(false);
  const [selectedQuickMessage, setSelectedQuickMessage] = useState<
    string | undefined
  >(undefined);

  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const isBottom = scrollHeight - scrollTop - clientHeight < 50;

      if (isBottom) {
        setShowNewChatIndicator(false);
      }
    };
    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [scrollElement]);

  useEffect(() => {
    if (!lastMessage || !scrollElement) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    const isBottom = scrollHeight - scrollTop - clientHeight < 50;

    if (lastMessage.isMine) {
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      if (!isBottom) {
        setShowNewChatIndicator(true);
      }
    }
  }, [messages, lastMessage, scrollElement]);

  const handleOpenLeaveSheet = () => {
    setIsLeaveSheetOpen(true);
  };
  const handleCloseLeaveSheet = () => {
    setIsLeaveSheetOpen(false);
  };
  const handleClickBack = () => {
    navigate(ROUTES.CHATLIST);
  };
  const handleLeaveChat = () => {
    // TODO: 채팅방 나가기
  };
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
  const handleExtensionMenuToggle = (isOpen: boolean) => {
    setIsExtensionMenuOpen(isOpen);
  };

  return (
    <div className='flex h-[100dvh] w-full flex-col overflow-hidden bg-white'>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        rightIcon={<Icon name='ic_dot' className='text-grayscale-900' />}
        centerContent={
          <div className='flex flex-row items-center gap-[1rem]'>
            <span className='title-sb-16'>{otherName}</span>
            <Tag title={otherFoodTruckName} />
          </div>
        }
        handleLeftClick={handleClickBack}
        handleRightClick={handleOpenLeaveSheet}
      />

      <ChatMessageList messages={messages} scrollRef={setScrollElement} />

      {showNewChatIndicator && lastMessage && !lastMessage.isMine ? (
        <NewChatIndicator
          profileImage={lastMessage.profileImage || 'https://placehold.co/40'}
          name={otherName}
          message={lastMessage.message || '새로운 메시지'}
          container={scrollElement!}
          className={isExtensionMenuOpen ? 'bottom-[27rem]' : 'bottom-[7.4rem]'}
        />
      ) : (
        <ButtonFloating
          isUp={false}
          container={scrollElement}
          className={isExtensionMenuOpen ? 'bottom-[27rem]' : 'bottom-[7.4rem]'}
        />
      )}

      <LeaveChatBottomSheet
        isOpen={isLeaveSheetOpen}
        handleLeaveChat={handleLeaveChat}
        handleCloseBottomSheet={handleCloseLeaveSheet}
      />

      <footer className='bottom-[0] w-full fixed-center'>
        <ChatInputArea
          selectedQuickMessage={selectedQuickMessage}
          handleOpenMessageList={handleOpenMessageList}
          handleSendMessage={handleSendMessage}
          onMenuToggle={handleExtensionMenuToggle}
        />
      </footer>

      {isMessageListOpen && (
        <MessageListBottomSheet
          isOpen={isMessageListOpen}
          handleSelectQuickMessage={handleSelectQuickMessage}
          handleCloseBottomSheet={handleCloseMessageList}
        />
      )}
    </div>
  );
}
