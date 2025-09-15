import { FILTERS } from '@pages/chat-list/constant/chat-list-constant';
import ButtonTrash from '@shared/components/button-trash/ButtonTrash';
import Button from '@shared/components/button/Button';
import { cn } from '@shared/utils/cn';

const baseFilterClasses = 'border-b-[0.2rem] pb-[1.2rem]';
const filterClasses = {
  selected: 'text-primary-700 border-primary-700',
  unselected: 'border-transparent',
};

interface ChatListManageBarProps {
  activeFilter: string;
  setActiveFilter: (_filter: string) => void;
  isEditing: boolean;
  handleToggleEdit: () => void;
  selectChatList: Set<number>;
  handleSelectOff: () => void;
  handleDeleteChat: () => void;
}

export default function ChatListManageBar({
  activeFilter,
  setActiveFilter,
  isEditing,
  handleToggleEdit,
  selectChatList,
  handleSelectOff,
  handleDeleteChat,
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
                baseFilterClasses,
                activeFilter === filter
                  ? filterClasses.selected
                  : filterClasses.unselected
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
              <Button
                style={{ paddingLeft: '0.75rem', paddingRight: '0.85rem' }}
                children={'선택해제'}
                variant={'default'}
                buttonStyle={'edit'}
                onClick={handleSelectOff}
              />
            ) : (
              <Button
                style={{ paddingLeft: '1.84rem', paddingRight: '1.84rem' }}
                children={'취소'}
                variant={'default'}
                buttonStyle={'edit'}
                onClick={handleToggleEdit}
              />
            )}
          </div>
        ) : (
          <Button
            style={{ paddingLeft: '1.84rem', paddingRight: '1.84rem' }}
            children={'편집'}
            variant={'default'}
            buttonStyle={'edit'}
            onClick={handleToggleEdit}
          />
        )}
      </div>
    </div>
  );
}
