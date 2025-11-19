import { useRef, useEffect } from 'react';
import ChatBubble from '@components/chat/chat-bubble/ChatBubble';
import type { Message } from '@pages/chat-room/chat-input-area/hooks/use-send-message';

interface ChatMessageListProps {
  messages: Message[];
  date?: string;
}

export default function ChatMessageList({
  messages,
  date = '2025년 8월 30일'
}: ChatMessageListProps) {
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  // 메시지 추가 시 스크롤 하단으로 이동
  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex-1 overflow-y-auto bg-white px-[2rem] py-[1rem] pb-[10rem] scrollbar-hide'>
      {messages.length === 0 ? (
        <div className='flex justify-center items-center h-full'>
          <span className='px-[1.7rem] py-[0.4rem] bg-grayscale-100 rounded-[16px] body-m-14 text-grayscale-500'>대화를 시작해보세요!</span>
        </div>
      ) : (
        <>
          <div className='flex justify-center mb-[2.5rem]'>
            <span className='caption-m-12 text-grayscale-500'>{date}</span>
          </div>

          <div className='flex flex-col'>
            {messages.map((msg, index) => {
              const isFirst = index === 0;
              const prevMsg = messages[index - 1];
              const isSameSender = prevMsg && prevMsg.isMine === msg.isMine;

              const marginClass = isFirst
                ? ''
                : isSameSender
                  ? 'mt-[1rem]'
                  : 'mt-[2.5rem]';

              return (
                <div key={msg.id} className={marginClass}>
                  <ChatBubble
                    message={msg.message}
                    time={msg.time}
                    isMine={msg.isMine}
                    profileImage={msg.profileImage}
                    isRead={msg.isRead}
                  />
                </div>
              );
            })}
            <div ref={scrollBottomRef} />
          </div>
        </>
      )}
    </div>
  );
}