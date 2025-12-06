import ChatBubble from '@pages/chat-room/components/ChatBubble';
import type { Message } from '@pages/chat-room/chat-input-area/hooks/use-send-message';

interface ChatMessageListProps {
  messages: Message[];
  scrollRef?: (_element: HTMLDivElement | null) => void;
}

export default function ChatMessageList({
  messages,
  scrollRef,
}: ChatMessageListProps) {
  const handleReservationConfirm = () => {
    // TODO: 예약 확정서 확인하기
    alert('예약 확정서 확인하기');
  }
  const handleReservationAccept = () => {
    // TODO: 예약 확정 수락하기
    alert('예약 확정 수락하기');
  }
  const handleReservationDetails = () => {
    // TODO: 예약 확정 상세보기
    alert('예약 확정 상세보기');
  }

  const renderMessages = (msg: Message, index: number) => {
    const prevMessage = messages[index - 1];

    const isNewDate = index === 0 || msg.date !== prevMessage?.date;
    const isSameSender = !isNewDate && prevMessage && prevMessage.isMine === msg.isMine;

    const dateClass = index === 0 ? 'mb-[2.5rem]' : 'my-[2.5rem] pt-[0.4rem] border-t border-grayscale-200';
    const marginClass = isNewDate
      ? ''
      : isSameSender
        ? 'mt-[1rem]'
        : 'mt-[2.5rem]';

    const getReservationHandler = () => {
      if (!msg.reservationMessageType) return undefined;

      switch (msg.reservationMessageType) {
        case 'CONFIRMATION_SENT':
          return handleReservationConfirm;
        case 'CONFIRMATION_REQUEST':
          return handleReservationAccept;
        case 'RESERVATION_CONFIRMED':
          return handleReservationDetails;
        default:
          return undefined;
      }
    };

    return (
      <div key={msg.id} className='flex flex-col w-full'>
        {isNewDate && (
          <div className={`flex justify-center ${dateClass}`}>
            <span className='caption-m-12 text-grayscale-500'>{msg.date}</span>
          </div>
        )}
        <div className={marginClass}>
          <ChatBubble
            reservationMessageType={msg.reservationMessageType}
            isCancelled={msg.isCancelled}
            message={msg.message}
            time={msg.time}
            isMine={msg.isMine}
            profileImage={msg.profileImage}
            isRead={msg.isRead}
            handleReservationClick={getReservationHandler()}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={scrollRef}
      className='flex-1 overflow-y-auto overscroll-contain bg-white px-[2rem] pt-[6rem] pb-[8rem] scrollbar-hide'
    >
      {messages.length === 0 ? (
        <div className='flex justify-center'>
          <span className='px-[1.7rem] py-[0.4rem] bg-grayscale-100 rounded-[16px] body-m-14 text-grayscale-500'>
            대화를 시작해보세요!
          </span>
        </div>
      ) : (
        <div className='flex flex-col'>
          {messages.map(renderMessages)}
        </div>
      )}
    </div>
  );
}
