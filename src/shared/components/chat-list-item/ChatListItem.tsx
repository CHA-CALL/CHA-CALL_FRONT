import Tag from '@shared/components/tag/Tag';
import ButtonCheck from '@shared/components/button-check/ButtonCheck';
import { cn } from '@shared/utils/cn';

interface ChatListItemProps {
  profileImage?: string;
  isEditing: boolean;
  clientName: string;
  tagTitle: string;
  lastChat: string;
  lastChatTime: string;
  unreadCount: number;
  isChecked: boolean;
  handleCheckChange: (_checked: boolean) => void;
}

export default function ChatListItem({
  profileImage,
  isEditing,
  clientName,
  tagTitle,
  lastChat,
  lastChatTime,
  unreadCount,
  isChecked,
  handleCheckChange,
}: ChatListItemProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-[1.8rem] px-[2rem] py-[1.4rem]',
        'transition-colors duration-200',
        {
          'bg-primary-25': isChecked && isEditing,
          'bg-white': !isChecked || !isEditing,
        }
      )}
    >
      {isEditing && (
        <ButtonCheck
          isChecked={isChecked}
          handleToggle={() => handleCheckChange(!isChecked)}
        />
      )}

      <div className='h-[5.2rem] w-[5.2rem] flex-shrink-0 overflow-hidden rounded-full border border-grayscale-200'>
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${clientName} profile`}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='h-full w-full bg-grayscale-200 bg-cover' />
        )}
      </div>

      <div className='flex flex-1 items-start justify-between gap-[1rem] overflow-hidden'>
        <div className='flex flex-1 flex-col gap-[0.4rem] overflow-hidden'>
          <div className='flex items-center gap-[0.6rem] overflow-hidden'>
            <span className='block truncate leading-[1.5rem] text-grayscale-900 title-sb-16'>
              {clientName}
            </span>
            <Tag title={tagTitle} />
          </div>
          <span
            className={`block truncate leading-[1.5rem] caption-m-12 ${unreadCount > 0 ? 'text-grayscale-900' : 'text-grayscale-500'}`}
          >
            {lastChat}
          </span>
        </div>

        <div className='flex w-[5rem] flex-shrink-0 flex-col items-end gap-[0.6rem] pt-[0.3rem]'>
          <span className='whitespace-nowrap text-grayscale-500 caption-m-11'>
            {lastChatTime}
          </span>
          {unreadCount > 0 && (
            <div className='flex h-[1.8rem] items-center justify-center whitespace-nowrap rounded-full bg-primary-500 px-[0.5rem] text-white caption-m-12'>
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
