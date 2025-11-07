import { useState } from 'react';
import ExtensionMenuItem from '@components/chat/chat-extension-menu/components/ExtensionMenuItem';
import { Icon } from '@components/icon/Icon';
import ChatInput from '@components/chat/chat-extension-menu/components/ChatInput';

export default function ChatExtensionMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div>
      <ChatInput setIsOpenMenu={setIsOpenMenu} />
      {isOpenMenu && (
        <div className='flex flex-col items-center gap-[1.6rem] px-[4rem] py-[2rem]'>
          <nav className='flex gap-[2.4rem]'>
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
          </nav>

          <nav className='flex gap-[2.4rem]'>
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
            <ExtensionMenuItem
              title={'카메라'}
              icon={<Icon name={'ic_camera'} />}
              isDisabled={active}
              handleClick={() => {
                setActive(prev => !prev);
              }}
            />
          </nav>
        </div>
      )}
    </div>
  );
}
