import { cn } from '@utils/cn';
import { Icon } from '@icon/Icon';
import Button from '@ui/button/Button';

interface ChatBubbleProps {
  isReservation?: boolean;
  message?: string;
  time: string;
  isMine?: boolean;
  isRead?: boolean;
  profileImage?: string;
  handleReservationClick?: () => void;
}

export default function ChatBubble({
  isReservation = false,
  message,
  time,
  isMine = true,
  isRead = false,
  profileImage,
  handleReservationClick,
}: ChatBubbleProps) {
  const TRUNCATE_LENGTH = 200;
  const displayedMessage =
    message && message.length > TRUNCATE_LENGTH ? `${message.slice(0, TRUNCATE_LENGTH)}...` : message;

  const handleShowFullMessage = () => {
    // TODO: 전체 메시지 보기
  }

  // 말풍선 방향 스타일
  const bubbleClass = cn('flex gap-[0.8rem]', {
    'flex-row-reverse': isMine,
    'flex-row': !isMine,
  })

  // 프로필 이미지가 없는 상대방 말풍선 스타일
  const indentClass = !isMine && !profileImage ? 'ml-[4rem]' : '';

  // 예약 확정 말풍선 스타일
  const reservationBubbleClass = cn(
    'flex flex-col gap-[0.8rem] w-[20rem] p-[1.6rem] bg-white border-1 border-grayscale-200 rounded-[2rem]',
    isMine ? 'rounded-tr-[0rem]' : 'rounded-tl-[0rem]',
    indentClass
  )

  // 일반 텍스트 말풍선 스타일
  const messageBubbleClass = cn(
    'body-m-13 break-words max-w-[70%] px-[1.6rem] py-[1rem] rounded-[2rem]',
    isMine
      ? 'rounded-tr-[0rem] bg-primary-700 text-white'
      : 'rounded-tl-[0rem] bg-grayscale-100 text-gray-900',
    indentClass
  )

  // 더보기 버튼 텍스트 색상 스타일
  const moreButtonClass = cn(
    'flex items-center justify-between w-full mt-[1rem] cursor-pointer',
    isMine ? 'text-white' : 'text-grayscale-600'
  )

  return (
    <div className={bubbleClass}>
      {/* 상대방 프로필 이미지 */}
      {!isMine && profileImage && (
        <img
          src={profileImage}
          alt='상대방 프로필 이미지'
          className='mr-[0.1rem] h-[3rem] w-[3rem] rounded-full object-cover'
        />
      )}

      {/* 예약 확정 말풍선 */}
      {isReservation && (
        <div className={reservationBubbleClass}>
          <span className='body-m-13 text-grayscale-900 px-[0.5rem]'>
            {isMine ? '예약 확정서를 보냈어요!' : '예약 확정을 요청했어요!'}
          </span>
          <Button
            variant='default'
            buttonStyle='medium'
            className='bg-grayscale-700 text-white py-[0.9rem] rounded-[1.2rem]'
            handleClickButton={handleReservationClick}
          >
            {isMine ? '확인하기' : '수락하기'}
          </Button>
        </div>
      )}

      {/* 채팅 말풍선 */}
      {message &&
        <div className={messageBubbleClass}>
          <div className='whitespace-pre-wrap break-words'>
            {displayedMessage}
          </div>

          {message.length > TRUNCATE_LENGTH && (
            <button
              type='button'
              className={moreButtonClass}
              onClick={handleShowFullMessage}
            >
              <span className='title-sb-12'>전체보기</span>
              <Icon name='ic_next' width={16} />
            </button>
          )}
        </div>
      }

      {/* 시간 및 읽음 상태 */}
      <div className='flex flex-col items-end justify-end'>
        {isMine && !isRead &&
          <span className={'title-sb-12 text-grayscale-500'}>1</span>
        }
        <span className='caption-m-11 text-grayscale-300'>{time}</span>
      </div>
    </div>
  );
}
