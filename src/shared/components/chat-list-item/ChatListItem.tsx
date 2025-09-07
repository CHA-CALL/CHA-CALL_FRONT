import Tag from '@shared/components/tag/Tag';
import ButtonCheck from '@shared/components/button-check/ButtonCheck';

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
      className={`w-full flex items-center gap-[1.8rem] px-[2rem] py-[1.4rem] transition-colors duration-200 ${isChecked && isEditing ? 'bg-primary-25' : 'bg-white'}`}
    >
      {isEditing && (
        <ButtonCheck
          isChecked={isChecked}
          handleToggle={() => handleCheckChange(!isChecked)}
        />
      )}

      <div className='w-[5.2rem] h-[5.2rem] rounded-full overflow-hidden flex-shrink-0 border border-grayscale-200'>
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${clientName} profile`}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full bg-grayscale-200 bg-cover' />
        )}
      </div>

      <div className='flex-1 flex justify-between items-start gap-[1rem] overflow-hidden'>
        <div className='flex flex-col gap-[0.4rem] overflow-hidden flex-1'>
          <div className='flex items-center gap-[0.6rem] overflow-hidden'>
            <span className='text-grayscale-900 title-sb-16 leading-[1.5rem] truncate block'>
              {clientName}
            </span>
            <Tag title={tagTitle} />
          </div>
          <span
            className={`caption-m-12 leading-[1.5rem] truncate block ${unreadCount > 0 ? 'text-grayscale-900' : 'text-grayscale-500'}`}
          >
            {lastChat}
          </span>
        </div>

        <div className='flex flex-col items-end gap-[0.6rem] pt-[0.3rem] flex-shrink-0 w-[5rem]'>
          <span className='caption-m-11 text-grayscale-500 whitespace-nowrap'>
            {lastChatTime}
          </span>
          {unreadCount > 0 && (
            <div className='h-[1.8rem] rounded-full bg-primary-500 flex justify-center items-center caption-m-12 text-white px-[0.5rem] whitespace-nowrap'>
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
