import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { ReservationStatusResponse } from 'apis/data-contracts';

import useToast from '@hooks/use-toast';
import { ROUTES } from '@router/constant/routes';
import { CHAT_QUERY_KEY } from '@shared/querykey/chat';
import { getReservationStatus } from '@pages/chat-room/api';

export default function useReservationStatus(reservationId: number | null) {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    data: reservationStatus,
    isPending: isReservationStatusPending,
    isError,
  } = useQuery<ReservationStatusResponse | undefined>({
    queryKey: CHAT_QUERY_KEY.RESERVATION_STATUS(reservationId),
    queryFn: () => getReservationStatus(reservationId),
    enabled: reservationId !== null,
  });

  if (isError) {
    toast.error('예약 상태를 불러오는데 실패했습니다.');
    navigate(ROUTES.CHAT_LIST);
  }

  return {
    reservationStatus,
    isReservationStatusPending,
  };
}
