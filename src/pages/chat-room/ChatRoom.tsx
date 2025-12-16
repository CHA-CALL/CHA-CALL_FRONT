import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@router/constant/routes';

import useToast from '@hooks/use-toast';
import { Icon } from '@icon/Icon';
import Tag from '@ui/tag/Tag';
import ButtonFloating from '@ui/button-floating/ButtonFloating';
import Navigation from '@layout/navigation/Navigation';
import ChatInputArea from '@pages/chat-room/chat-input-area/ChatInputArea';
import { MessageListBottomSheet } from '@pages/chat-room/chat-input-area/components';
import {
  ChatMessageList,
  LeaveChatBottomSheet,
  NewChatIndicator,
} from '@pages/chat-room/components';
import { useSendMessage } from '@pages/chat-room/chat-input-area/hooks/use-send-message';
import { useChatRoomQuery } from '@pages/chat-room/hooks';

// TODO: 사장님인지 일반 유저인지 여부
const isOwner = true;

export default function ChatRoom() {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  const toast = useToast();

  const { metaData, isMetaDataPending } = useChatRoomQuery(isOwner, chatRoomId);

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
    navigate(ROUTES.CHAT_LIST);
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

  if (!chatRoomId || !metaData) {
    toast.error('잘못된 접근입니다.');
    navigate(ROUTES.CHAT_LIST);
    return;
  }

  const { name, foodTruckName, foodTruckId, reservationId, memberId } =
    metaData;

  return (
    <div className='flex h-[100dvh] w-full flex-col overflow-hidden bg-white'>
      <Navigation
        leftIcon={<Icon name='ic_back' className='text-grayscale-900' />}
        rightIcon={<Icon name='ic_dot' className='text-grayscale-900' />}
        centerContent={
          !isMetaDataPending && (
            <div className='flex flex-row items-center gap-[1rem]'>
              <span className='title-sb-16'>{name}</span>
              {foodTruckName && <Tag title={foodTruckName} />}
            </div>
          )
        }
        handleLeftClick={handleClickBack}
        handleRightClick={handleOpenLeaveSheet}
      />

      <ChatMessageList messages={messages} scrollRef={setScrollElement} />

      {name && showNewChatIndicator && lastMessage && !lastMessage.isMine ? (
        <NewChatIndicator
          profileImage={lastMessage.profileImage || 'https://placehold.co/40'}
          name={name}
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

      <footer className='fixed-center bottom-[0] w-full'>
        {foodTruckId && memberId && (
          <ChatInputArea
            foodTruckId={foodTruckId}
            chatRoomId={chatRoomId}
            reservationId={reservationId ?? null}
            memberId={memberId}
            selectedQuickMessage={selectedQuickMessage}
            handleOpenMessageList={handleOpenMessageList}
            handleSendMessage={handleSendMessage}
            onMenuToggle={handleExtensionMenuToggle}
          />
        )}
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
