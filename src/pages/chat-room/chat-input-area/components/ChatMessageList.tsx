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

  return (
    <div
      ref={scrollRef}
      className='flex-1 overflow-y-auto bg-white px-[2rem] py-[1rem] pb-[10rem] scrollbar-hide'
    >
      {messages.length === 0 ? (
        <div className='flex justify-center items-center h-full'>
          <span className='px-[1.7rem] py-[0.4rem] bg-grayscale-100 rounded-[16px] body-m-14 text-grayscale-500'>대화를 시작해보세요!</span>
        </div>
      ) : (
        <div className='flex flex-col'>
          {messages.map((msg, index) => {
            const prevMessage = messages[index - 1];

            const isNewDate = index === 0 || msg.date !== prevMessage?.date;
            const isSameSender = !isNewDate && prevMessage && prevMessage.isMine === msg.isMine;

            const dateClass = index === 0 ? 'mb-[2.5rem]' : 'my-[2.5rem] pt-[0.4rem] border-t border-grayscale-200';
            const marginClass = isNewDate
              ? ''
              : isSameSender
                ? 'mt-[1rem]'
                : 'mt-[2.5rem]';

            return (
              <div key={msg.id} className='flex flex-col w-full'>
                {isNewDate && (
                  <div className={`flex justify-center ${dateClass}`}>
                    <span className='caption-m-12 text-grayscale-500'>{msg.date}</span>
                  </div>
                )}
                <div className={marginClass}>
                  <ChatBubble
                    isReservation={msg.isReservation}
                    message={msg.message}
                    time={msg.time}
                    isMine={msg.isMine}
                    profileImage={msg.profileImage}
                    isRead={msg.isRead}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
