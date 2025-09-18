import { FILTERS } from '@pages/chat-list/constant/chat-list-constant';
import ButtonIcon from '@shared/components/button-icon/ButtonIcon';
import Button from '@shared/components/button/Button';
import { cn } from '@shared/utils/cn';

interface ChatListManageBarProps {
  activeFilter: string;
  setActiveFilter: (_filter: string) => void;
  isEditing: boolean;
  handleToggleEdit: () => void;
  selectChatList: Set<number>;
  handleSelectOff: () => void;
  handleDeleteChat: () => void;
}

const baseFilterClasses =
  'w-[5.4rem] border-b-[0.2rem] pb-[1.2rem] text-center';
const filterClasses = {
  selected: 'text-primary-700 border-primary-700',
  unselected: 'border-transparent',
};

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
  const handleClickTrash = () => {
    if (selectChatList.size !== 0) handleDeleteChat();
  };
  return (
    <div className='border-grayscale-100 flex justify-between border-b-[0.1rem] px-[2rem] pt-[3.1rem]'>
      <div className='title-sb-14 text-grayscale-900 flex w-full gap-[1rem] pt-[0.2rem]'>
        {FILTERS.map(filter => {
          return (
            <button
              type='button'
              onClick={() => handleFilter(filter)}
              className={cn(
                baseFilterClasses,
                activeFilter === filter
                  ? filterClasses.selected
                  : filterClasses.unselected
              )}
              key={filter}
            >
              {filter}
            </button>
          );
        })}
      </div>
      <div>
        {isEditing ? (
          <div className='flex gap-[1rem]'>
            <ButtonIcon handleClick={handleClickTrash} icon='ic_trash' />
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
