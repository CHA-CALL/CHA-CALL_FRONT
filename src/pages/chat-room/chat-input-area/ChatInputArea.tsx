import { Icon } from '@components/icon/Icon';
import { ROLE } from '@constant/role';
import ChatInputBar from '@pages/chat-room/chat-input-area/components/ChatInputBar';
import ExtensionMenuItem from '@pages/chat-room/chat-input-area/components/ExtensionMenuItem';
import { ALL_MENU_ITEMS } from '@pages/chat-room/chat-input-area/constants/extension-menu-info';
import { useOnClickOutside } from '@pages/chat-room/chat-input-area/hooks/use-click-outside';
import { useExtensionMenu } from '@pages/chat-room/chat-input-area/hooks/use-extension-menu';
import { cn } from '@utils/cn';
import { useCallback, useRef, useState } from 'react';

interface ChatInputAreaProps {
  handleSendMessage: (_message: string) => void;
}

export default function ChatInputArea({ handleSendMessage }: ChatInputAreaProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { disabledStates, handlers } = useExtensionMenu();

  const chatAreaRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => {
    if (isOpenMenu) {
      setIsOpenMenu(false);
    }
  }, [isOpenMenu, setIsOpenMenu]);
  useOnClickOutside(chatAreaRef, closeMenu);

  const role = 'provider';
  const menuLayout = role === ROLE.PROVIDER ? 'grid-cols-4' : 'grid-cols-3';

  const items = ALL_MENU_ITEMS.filter(item => item.roles.includes(role));

  return (
    <div className='w-full' ref={chatAreaRef}>
      <ChatInputBar
        isOpenMenu={isOpenMenu}
        setIsOpenMenu={setIsOpenMenu}
        handleSendMessage={handleSendMessage}
      />
      {isOpenMenu && (
        <div
          className={cn(
            'mx-auto grid justify-items-center',
            'gap-x-[2.4rem] gap-y-[1.6rem] px-[4rem] py-[2rem] bg-white',
            menuLayout
          )}
        >
          {items.map(item => (
            <ExtensionMenuItem
              key={item.key}
              title={item.title}
              icon={<Icon name={item.iconId} />}
              isDisabled={disabledStates[item.key]}
              handleClick={handlers[item.key]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
