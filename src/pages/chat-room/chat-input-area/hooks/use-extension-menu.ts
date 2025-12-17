import { useRef, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

import useToast from '@hooks/use-toast';
import { ROUTES } from '@router/constant/routes';
import { useFetchAccountData } from '@pages/@owner/account/hooks/use-account-query';
import type { MenuKey } from '@pages/chat-room/chat-input-area/constants/extension-menu-info';
import { useReservationStatus } from '@pages/chat-room/hooks';
import { RESERVATION_STATUS } from '@constant/reservation-status';

export const useExtensionMenu = (
  foodTruckId: number,
  chatRoomId: string,
  reservationId: number | null,
  reservationUserId: number,
  handleOpenMessageList: () => void,
  closeMenu: () => void
) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data: bankAccount, isFetching: isBankAccountFetching } =
    useFetchAccountData();
  const { reservationStatus, isReservationStatusFetching } =
    useReservationStatus(reservationId);
  const isConfirmed =
    reservationStatus?.reservationStatus === RESERVATION_STATUS.CONFIRMED;
  // TODO: reservationStatus 관련 타입 만들기

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
    cash: isBankAccountFetching ? true : !bankAccount,
    // 작성한 견적서가 있을 때 disabled
    write_paper:
      reservationId !== null || isReservationStatusFetching || isConfirmed,
    // 작성한 견적서가 없을 때 disabled
    edit_paper:
      reservationId === null || isReservationStatusFetching || isConfirmed,
    // 확정된 예약이 없을 때 disabled. 견적서 다운과 하나로 통합될 예정
    view_paper: isReservationStatusFetching ? true : !isConfirmed,
    // 확정된 예약이 없을 때 disabled
    download_paper: isReservationStatusFetching ? true : !isConfirmed,
    // 확정된 예약이 없을 때 disabled. 채팅방과 관련된 예약에 대한 예약상태조회 후 확정 상태가 아니라면 disabled
    cancel: isReservationStatusFetching ? true : !isConfirmed,
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
      navigate(ROUTES.OWNER_ESTIMATE(chatRoomId), {
        state: {
          foodTruckId,
          reservationId,
          reservationUserId,
        },
      });
    },
    edit_paper: () => {
      navigate(ROUTES.OWNER_ESTIMATE(chatRoomId), {
        state: {
          foodTruckId,
          reservationId,
          reservationUserId,
        },
      });
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
