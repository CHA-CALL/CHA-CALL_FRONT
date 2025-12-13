import ButtonCheck from '@ui/button-check/ButtonCheck';
import Tag from '@ui/tag/Tag';
import { cn } from '@utils/cn';

interface ChatListItemProps {
  profileImageUrl?: string;
  isEditing: boolean;
  name: string;
  foodTruckName: string;
  lastMessage: string;
  lastMessageSendTime: string;
  unreadCount: number;
  isChecked: boolean;
  handleCheckChange: (_checked: boolean) => void;
}

export default function ChatListItem({
  profileImageUrl,
  isEditing,
  name,
  foodTruckName,
  lastMessage,
  lastMessageSendTime,
  unreadCount,
  isChecked,
  handleCheckChange,
}: ChatListItemProps) {
  const handleClickItem = () => {
    if (isEditing) {
      handleCheckChange(!isChecked);
      return;
    }
    // TODO : 대화창 페이지, API 추가 시 연결 예정.
    alert('대화창으로 이동');
  };

  return (
    <button
      className={cn(
        'flex w-full items-center gap-[1.8rem] px-[2rem] py-[1.4rem]',
        'transition-colors duration-200',
        isChecked && isEditing ? 'bg-primary-25' : 'bg-white'
      )}
      onClick={handleClickItem}
    >
      {isEditing && (
        <ButtonCheck
          isChecked={isChecked}
          handleToggle={() => handleCheckChange(!isChecked)}
        />
      )}

      <div className='border-grayscale-200 h-[5.2rem] w-[5.2rem] flex-shrink-0 overflow-hidden rounded-full border'>
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={`${name} profile`}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='bg-grayscale-200 h-full w-full bg-cover' />
        )}
      </div>

      <div className='flex flex-1 items-start justify-between gap-[1rem] overflow-hidden'>
        <div className='flex flex-1 flex-col gap-[0.2rem] overflow-hidden'>
          <div className='flex items-center gap-[0.6rem] overflow-hidden'>
            <span className='text-grayscale-900 title-sb-16 block truncate'>
              {name}
            </span>
            <Tag title={foodTruckName} />
          </div>
          <span
            className={`caption-m-12 block truncate text-start ${unreadCount > 0 ? 'text-grayscale-900' : 'text-grayscale-500'}`}
          >
            {lastMessage}
          </span>
        </div>

        <div className='flex w-[5rem] flex-shrink-0 flex-col items-end gap-[0.6rem] pt-[0.3rem]'>
          <span className='text-grayscale-500 caption-m-11 whitespace-nowrap'>
            {lastMessageSendTime}
          </span>
          {unreadCount > 0 && (
            <div className='bg-primary-500 caption-m-12 flex h-[1.8rem] items-center justify-center whitespace-nowrap rounded-full px-[0.5rem] text-white'>
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
