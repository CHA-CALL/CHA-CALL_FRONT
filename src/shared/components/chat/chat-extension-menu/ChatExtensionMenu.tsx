import { useState } from 'react';
import ExtensionMenuItem from '@components/chat/chat-extension-menu/components/ExtensionMenuItem';
import { Icon } from '@components/icon/Icon';
import ChatInputBar from '@components/chat/chat-extension-menu/components/ChatInputBar';
import { ALL_MENU_ITEMS } from '@components/chat/chat-extension-menu/constants/ChatMenuItems';
import { cn } from '@utils/cn';
// import { useRole } from '@hooks/use-role';

export default function ChatExtensionMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // const { role } = useRole();
  const role = 'provider';
  // const role = 'client';
  const accessibleMenuItems = ALL_MENU_ITEMS.filter(item => {
    if (item.requiredRole === 'all') return true;
    return item.requiredRole === role;
  });

  const menuClasses = role === 'provider' ? 'grid-cols-4' : 'grid-cols-3';

  return (
    <div>
      <ChatInputBar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      {isOpenMenu && (
        <div className='flex flex-col items-center gap-[1.6rem] px-[4rem] py-[2rem]'>
          <nav
            className={cn('grid gap-x-[2.4rem] gap-y-[1.6rem]', menuClasses)}
          >
            {accessibleMenuItems.map(item => (
              <ExtensionMenuItem
                key={item.id}
                title={item.title}
                icon={<Icon name={item.iconId} />}
                isDisabled={item.disabled}
                handleClick={item.handleClick}
              />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
