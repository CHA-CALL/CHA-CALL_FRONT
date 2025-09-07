import Tag from '@shared/components/tag/Tag';
import ButtonCheck from '../button-check/ButtonCheck';

interface ChatListItemProps {
  profileImage?: string;
  isEditing: boolean;
  clientName: string;
  tagTitle: string;
  lastChat: string;
  lastChatTime: string;
  unreadCount: number;
  isChecked: boolean; // 부모로부터 받을 체크 상태
  handleCheckChange: (_checked: boolean) => void; // 부모에게 상태 변경을 알릴 함수
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
    <div className='flex items-center gap-[1.8rem] px-[2rem] py-[1.4rem]'>
      {isEditing && (
        <ButtonCheck isChecked={isChecked} setIsChecked={handleCheckChange} />
      )}

      <div className='w-[5.2rem] h-[5.2rem] rounded-full overflow-hidden bg-black'>
        {profileImage}
      </div>

      <div className='flex-1 flex justify-between items-center'>
        <div className='flex flex-col gap-[0.2rem]'>
          <div className='flex items-center gap-[0.6rem]'>
            <span className='text-grayscale-900 title-sb-16 leading-[1.5rem]'>
              {clientName}
            </span>
            <Tag title={tagTitle} />
          </div>
          <span className='caption-m-12 leading-[1.5rem]'>{lastChat}</span>
        </div>

        <div className='flex flex-col items-end justify-center gap-[0.6rem] pt-[0.3rem]'>
          <span className='caption-m-11 text-grayscale-500 '>
            {lastChatTime}
          </span>
          {unreadCount > 0 && (
            <div
              className='h-[1.8rem] rounded-full bg-primary-500 flex justify-center items-center
            caption-m-12 text-white px-[0.5rem]'
            >
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
