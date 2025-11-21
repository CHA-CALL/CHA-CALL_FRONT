import { useState, useEffect } from 'react';
import { Icon } from '@icon/Icon';

interface NewChatIndicatorProps {
  profileImage: string;
  name: string;
  message: string;
  container: HTMLDivElement;
}

export default function NewChatIndicator({
  profileImage,
  name,
  message,
  container,
}: NewChatIndicatorProps) {
  const TRUNCATE_LENGTH = 30;
  const displayedMessage =
    message.length > TRUNCATE_LENGTH ? `${message.slice(0, TRUNCATE_LENGTH)}...` : message;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScrollToBottom = () => {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const checkScrollPosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsVisible(!isAtBottom);
    };

    checkScrollPosition();

    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [container, message]);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type='button'
      className='fixed bottom-[6rem] left-1/2 -translate-x-1/2 flex items-center justify-between w-[calc(100%-4rem)] max-w-[55rem] py-[0.5rem] pl-[0.6rem] pr-[1rem] bg-white border-1 border-grayscale-100 rounded-[1.6rem] shadow-lg z-50'
      onClick={handleScrollToBottom}
    >
      <div className='flex items-center gap-[0.8rem]'>
        <img
          src={profileImage}
          alt='상대방 프로필 이미지'
          className='h-[2.6rem] w-[2.6rem] rounded-full object-cover'
        />
        <span className='caption-m-12 text-grayscale-900'>{name}</span>
        <span className='caption-m-12 text-grayscale-700 truncate max-w-[60%]'>{displayedMessage}</span>
      </div>
      <Icon
        name='ic_down'
        width={20}
        className='text-grayscale-700'
      />
    </button>
  );
}
