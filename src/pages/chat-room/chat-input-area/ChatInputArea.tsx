import { Icon } from '@components/icon/Icon';
// import { ROLE } from '@constant/role';
import ChatInputBar from '@pages/chat-room/chat-input-area/components/ChatInputBar';
import ExtensionMenuItem from '@pages/chat-room/chat-input-area/components/ExtensionMenuItem';
import { ALL_MENU_ITEMS } from '@pages/chat-room/chat-input-area/constants/extension-menu-info';
import { useExtensionMenu } from '@pages/chat-room/chat-input-area/hooks/use-extension-menu';
import { cn } from '@utils/cn';
import { useState } from 'react';

export default function ChatInputArea() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { disabledStates, handlers } = useExtensionMenu();

  const role = 'provider';
  // TODO : 디자이너와 상의 - 메뉴 레이아웃과 크기
  // const menuLayout = role === ROLE.PROVIDER ? 'grid-cols-4' : 'grid-cols-3';

  const items = ALL_MENU_ITEMS.filter(item => item.roles.includes(role));

  return (
    <div className='w-full'>
      <ChatInputBar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      {isOpenMenu && (
        <div
          className={cn(
            'mx-auto grid justify-items-center',
            'gap-x-[2.4rem] gap-y-[1.6rem] px-[4rem] py-[2rem]',
            // menuLayout
            'grid-cols-[repeat(auto-fit,minmax(8rem,1fr))]'
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
