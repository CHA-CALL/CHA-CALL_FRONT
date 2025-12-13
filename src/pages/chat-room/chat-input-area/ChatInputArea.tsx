import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from '@components/icon/Icon';
import { ROLE } from '@constant/role';
import ChatInputBar from '@pages/chat-room/chat-input-area/components/ChatInputBar';
import ExtensionMenuItem from '@pages/chat-room/chat-input-area/components/ExtensionMenuItem';
import { ALL_MENU_ITEMS } from '@pages/chat-room/chat-input-area/constants/extension-menu-info';
import { useOnClickOutside } from '@pages/chat-room/chat-input-area/hooks/use-click-outside';
import { useExtensionMenu } from '@pages/chat-room/chat-input-area/hooks/use-extension-menu';
import { cn } from '@utils/cn';

interface ChatInputAreaProps {
  foodTruckId: number;
  chatRoomId: string;
  memberId: number;
  selectedQuickMessage?: string;
  handleSendMessage: (_message: string) => void;
  handleOpenMessageList: () => void;
  onMenuToggle?: (_isOpen: boolean) => void;
}

export default function ChatInputArea({
  foodTruckId,
  chatRoomId,
  memberId,
  handleSendMessage,
  selectedQuickMessage,
  handleOpenMessageList,
  onMenuToggle,
}: ChatInputAreaProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    if (isOpenMenu) {
      setIsOpenMenu(false);
    }
  }, [isOpenMenu, setIsOpenMenu]);

  const { disabledStates, handlers, handleGalleryRef, handleCameraRef } =
    useExtensionMenu(
      foodTruckId,
      chatRoomId,
      memberId,
      handleOpenMessageList,
      closeMenu
    );

  useOnClickOutside(chatAreaRef, closeMenu);

  const role = ROLE.PROVIDER;
  const menuLayout = role === ROLE.PROVIDER ? 'grid-cols-4' : 'grid-cols-3';

  const items = ALL_MENU_ITEMS.filter(item => item.roles.includes(role));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.info('선택된 파일:', file);

    // TODO: 파일 업로드 로직, 미리보기, 서버 전송 등
  };

  useEffect(() => {
    handleGalleryRef(fileInputRef);
    handleCameraRef(cameraInputRef);
  }, [handleGalleryRef, handleCameraRef]);

  useEffect(() => {
    onMenuToggle?.(isOpenMenu);
  }, [isOpenMenu, onMenuToggle]);

  return (
    <div className='w-full' ref={chatAreaRef}>
      <ChatInputBar
        selectedQuickMessage={selectedQuickMessage}
        isOpenMenu={isOpenMenu}
        setIsOpenMenu={setIsOpenMenu}
        handleSendMessage={handleSendMessage}
      />
      {/* 파일 ref */}
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleFileSelect}
        className='hidden'
      />
      {/* 카메라 ref */}
      <input
        type='file'
        accept='image/*'
        capture='environment'
        ref={cameraInputRef}
        onChange={handleFileSelect}
        className='hidden'
      />
      {isOpenMenu && (
        <div
          className={cn(
            'mx-auto grid justify-items-center',
            'gap-x-[2.4rem] gap-y-[1.6rem] bg-white px-[4rem] py-[2rem]',
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
