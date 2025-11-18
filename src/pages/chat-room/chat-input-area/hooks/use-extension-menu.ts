import type { MenuKey } from '@pages/chat-room/chat-input-area/constants/extension-menu-info';

export const useExtensionMenu = () => {
  const disabledStates: Record<MenuKey, boolean> = {
    gallery: false,
    camera: false,
    view_paper: false,
    cancel: false,
    download_paper: false,
    ment: false,
    cash: false,
    write_paper: false,
    edit_paper: false,
  };

  const handlers: Record<MenuKey, () => void> = {
    gallery: () => console.log('앨범 열기'),
    camera: () => console.log('카메라 실행'),
    view_paper: () => console.log('견적서 보기'),
    cancel: () => console.log('예약 취소'),
    download_paper: () => console.log('견적서 다운로드'),
    ment: () => console.log('자주쓰는 문구'),
    cash: () => console.log('계좌번호'),
    write_paper: () => {
      console.log('견적서 작성');
    },
    edit_paper: () => {
      console.log('견적서 수정');
    },
  };

  return {
    disabledStates,
    handlers,
  };
};
