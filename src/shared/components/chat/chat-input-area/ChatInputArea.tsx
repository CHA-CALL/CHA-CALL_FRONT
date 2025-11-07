import { useState } from 'react';
import ChatInputBar from '@components/chat/chat-input-area/components/ChatInputBar';
import ProviderExtensionMenu from '@components/chat/chat-input-area/components/ProviderExtensionMenu';
import ClientExtensionMenu from '@components/chat/chat-input-area/components/ClientExtensionMenu';
// import { useRole } from '@hooks/use-role';

export default function ChatExtensionMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // const { role } = useRole();
  const role = 'provider';
  // const role = 'client';

  return (
    <div>
      <ChatInputBar isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      {isOpenMenu && (
        <div className='flex flex-col items-center gap-[1.6rem] px-[4rem] py-[2rem]'>
          {role === 'provider' ? (
            <ProviderExtensionMenu />
          ) : (
            <ClientExtensionMenu />
          )}
        </div>
      )}
    </div>
  );
}
