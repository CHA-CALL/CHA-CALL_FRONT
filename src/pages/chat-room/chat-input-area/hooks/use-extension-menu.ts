import type { MenuKey } from '@pages/chat-room/chat-input-area/constants/extension-menu-info';
import { useRef, type RefObject } from 'react';

export const useExtensionMenu = (handleOpenMessageList: () => void) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraRef = useRef<HTMLInputElement | null>(null);

  const handleGalleryRef = (ref: RefObject<HTMLInputElement | null>) => {
    fileInputRef.current = ref.current;
  };

  const handleCameraRef = (ref: RefObject<HTMLInputElement | null>) => {
    fileInputRef.current = ref.current;
  };

  const isMobile = () => {
    if (typeof navigator === 'undefined') return false;

    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  };

  const disabledStates: Record<MenuKey, boolean> = {
    gallery: false, // 항상 active
    camera: !isMobile(), // 웹 환경에서 disabled
    ment: false, // 항상 active
    cash: false, // 계좌 등록 안했을 시 disabled
    write_paper: false, // 작성한 견적서가 있을 때 disabled
    edit_paper: false, // 작성한 견적서가 없을 때 disabled
    view_paper: false, // 작성한 견적서가 없을 때 disabled
    download_paper: false, // 확정된 예약일 때만 disabled
    cancel: false, // 확정된 예약일 때만 disabled
  };

  const handlers: Record<MenuKey, () => void> = {
    gallery: () => fileInputRef.current?.click(),
    camera: () => cameraRef.current?.click(),
    ment: () => handleOpenMessageList(),
    cash: () => console.log('계좌번호'),
    write_paper: () => {
      console.log('견적서 작성');
    },
    edit_paper: () => {
      console.log('견적서 수정');
    },
    view_paper: () => console.log('견적서 보기'),
    download_paper: () => console.log('견적서 다운'),
    cancel: () => console.log('예약 취소'),
  };

  return {
    disabledStates,
    handlers,
    handleGalleryRef,
    handleCameraRef,
  };
};
