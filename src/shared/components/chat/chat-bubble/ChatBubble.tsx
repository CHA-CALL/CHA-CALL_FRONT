import { cn } from '@utils/cn';
import { Icon } from '@components/icon/Icon';

interface ChatBubbleProps {
  message: string;
  time: string;
  isMine?: boolean;
  isRead?: boolean;
  profileImage?: string;
}

export default function ChatBubble({
  message,
  time,
  isMine = true,
  isRead = true,
  profileImage,
}: ChatBubbleProps) {
  const TRUNCATE_LENGTH = 200;
  const displayedMessage = message.length > TRUNCATE_LENGTH ? `${message.slice(0, TRUNCATE_LENGTH)}...` : message;

  const handleShowFullMessage = () => {
    // TODO: 전체 메시지 보기
  }

  return (
    <>
      <div className={cn('flex gap-[0.8rem]', {
        'flex-row-reverse': isMine,
        'flex-row': !isMine,
      })}>
        {!isMine && profileImage && (
          <img
            src={profileImage}
            alt='상대방 프로필 이미지'
            className='mr-[0.1rem] h-[3rem] w-[3rem] rounded-full object-cover'
          />
        )}

        <div className={cn('body-m-13 break-words max-w-[70%] px-[1.6rem] py-[1rem] rounded-[1.6rem]',
            {
              'rounded-tr-[0rem] bg-primary-700 text-white': isMine,
              'rounded-tl-[0rem] bg-grayscale-100 text-gray-900': !isMine,
              'ml-[4rem]': !isMine && !profileImage,
            }
          )}
        >
          <div className='whitespace-pre-wrap break-words'>
            {displayedMessage}
          </div>

          {message.length > TRUNCATE_LENGTH && (
            <button
              type='button'
              className={cn('flex items-center justify-between w-full mt-[1rem] cursor-pointer', {
                'text-white': isMine,
                'text-grayscale-600': !isMine,
              })}
              onClick={handleShowFullMessage}
            >
              <span className='title-sb-12'>전체보기</span>
              <Icon name='ic_next' width={16} />
            </button>
          )}
        </div>

        <div className='flex flex-col items-end justify-end'>
          {isMine && !isRead &&
            <span className={'title-sb-12 text-grayscale-500'}>1</span>
          }
          <span className='caption_m_11 text-grayscale-300'>{time}</span>
        </div>
      </div>
    </>
  );
}
