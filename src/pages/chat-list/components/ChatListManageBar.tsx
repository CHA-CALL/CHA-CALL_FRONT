import ButtonTrash from '@shared/components/button-trash/ButtonTrash';
import { cn } from '@shared/utils/cn';

const FILTERS = ['전체보기', '안 읽음', '예약 확정'];
const BaseFilterClass = 'border-b-[0.2rem] pb-[1.2rem]';
const FilterClass = {
  selected: 'text-primary-700 border-primary-700',
  unselected: 'border-transparent',
};

const BaseEditButtonClass =
  'border-grayscale-200 border-[0.1rem] caption-m-12 py-[0.5rem] rounded-[0.4rem] text-grayscale-700';

interface ChatListManageBarProps {
  activeFilter: string;
  setActiveFilter: (_filter: string) => void;
  isEditing: boolean;
  handleToggleEdit: () => void;
  selectChatList: Set<number>;
  handleSelectOff: ()=>void;
  handleDeleteChat: ()=>void;
}

export default function ChatListManageBar({
  activeFilter,
  setActiveFilter,
  isEditing,
  handleToggleEdit,
  selectChatList,
  handleSelectOff,
  handleDeleteChat
}: ChatListManageBarProps) {
  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };
  return (
    <div className='flex justify-between px-[2rem] pt-[3.1rem] border-b-[0.1rem] border-grayscale-100'>
      <div className='w-full flex gap-[1rem] title-sb-14 text-graysclae-900 pt-[0.2rem]'>
        {FILTERS.map(filter => {
          return (
            <button
              onClick={() => handleFilter(filter)}
              className={cn(
                BaseFilterClass,
                activeFilter === filter
                  ? FilterClass.selected
                  : FilterClass.unselected
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <div>
        {isEditing ? (
          <div className='flex gap-[1rem]'>
            <ButtonTrash handleClick={handleDeleteChat} />
            {selectChatList.size !== 0 ? (
              <button
                className={cn(BaseEditButtonClass, 'pl-[0.75rem] pr-[0.85rem]')}
                onClick={handleSelectOff}
              >
                선택해제
              </button>
            ) : (
              <button
                className={cn(BaseEditButtonClass, 'px-[2rem]')}
                onClick={handleToggleEdit}
              >
                취소
              </button>
            )}
          </div>
        ) : (
          <button
            className={cn(BaseEditButtonClass, 'px-[1.85rem]')}
            onClick={handleToggleEdit}
          >
            편집
          </button>
        )}
      </div>
    </div>
  );
}
