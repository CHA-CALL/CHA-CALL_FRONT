import { useRef, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

import useToast from '@hooks/use-toast';
import { ROUTES } from '@router/constant/routes';
import { useFetchAccountData } from '@pages/@owner/account/hooks/use-account-query';
import type { MenuKey } from '@pages/chat-room/chat-input-area/constants/extension-menu-info';

export const useExtensionMenu = (
  foodTruckId: number,
  chatRoomId: string,
  reservationUserId: number,
  handleOpenMessageList: () => void,
  closeMenu: () => void
) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data: bankAccount } = useFetchAccountData();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraRef = useRef<HTMLInputElement | null>(null);

  const handleGalleryRef = (ref: RefObject<HTMLInputElement | null>) => {
    fileInputRef.current = ref.current;
  };

  const handleCameraRef = (ref: RefObject<HTMLInputElement | null>) => {
    cameraRef.current = ref.current;
  };

  const isMobile = () => {
    if (typeof navigator === 'undefined') return false;
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  };

  const disabledStates: Record<MenuKey, boolean> = {
    gallery: false,
    // 웹 환경에서 disabled
    camera: !isMobile(),
    ment: false,
    // 계좌 등록 안했을 시 disabled
    cash: !bankAccount,
    // 작성한 견적서가 있을 때 disabled
    write_paper: false,
    // 작성한 견적서가 없을 때 disabled
    edit_paper: false,
    // 작성한 견적서가 없을 때 disabled
    view_paper: false,
    // 작성한 견적서가 없을 때 disabled
    download_paper: false,
    // 확정된 예약이 없을 때 disabled. 채팅방과 관련된 예약에 대한 예약상태조회 후 확정 상태가 아니라면 disabled
    cancel: false,
  };

  const handlers: Record<MenuKey, () => void> = {
    gallery: () => fileInputRef.current?.click(),
    camera: () => cameraRef.current?.click(),
    ment: () => handleOpenMessageList(),
    cash: () =>
      navigator.clipboard
        .writeText(`${bankAccount?.bankName}  ${bankAccount?.accountNumber}`)
        .then(() => toast.success('클립보드에 복사되었습니다.'))
        .catch(() => toast.error('클립보드 복사에 실패했습니다.'))
        .finally(closeMenu),
    write_paper: () => {
      // TODO: 견적서 작성 페이지로
      if (!chatRoomId) {
        toast.error('잘못된 접근입니다.');
        return;
      }
      // TODO: foodTruckId, reservationUserId 받은거 넘겨줘야함
      navigate(ROUTES.OWNER_ESTIMATE(chatRoomId), {
        state: {
          foodTruckId,
          reservationUserId,
        },
      });
    },
    edit_paper: () => {
      // TODO: 견적서 수정 페이지로
      navigate(ROUTES.MESSAGE_LIST);
    },
    // TODO : 견적서 pdf 띄우도록
    view_paper: () => alert('견적서 보기'),
    // TODO : 견적서 pdf 다운로드 되도록
    download_paper: () => alert('견적서 다운'),
    // TODO : 예약 취소 신청 로직
    cancel: () => alert('예약 취소'),
  };

  return {
    disabledStates,
    handlers,
    handleGalleryRef,
    handleCameraRef,
  };
};
