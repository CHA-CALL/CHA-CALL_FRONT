import { useQuery } from '@tanstack/react-query';
import type { ReservationStatusResponse } from 'apis/data-contracts';

import { getReservationStatus } from '@pages/chat-room/api';
import { CHAT_QUERY_KEY } from '@shared/querykey/chat';

// TODO: #209 머지 이후 useChatRoomQuery로 통합하기
export default function useReservationStatus(reservationId: number | null) {
  const { data: reservationStatus, isFetching: isReservationStatusFetching } =
    useQuery<ReservationStatusResponse | undefined>({
      queryKey: CHAT_QUERY_KEY.RESERVATION_STATUS(reservationId),
      queryFn: () => getReservationStatus(reservationId),
      enabled: reservationId !== null,
    });

  return {
    reservationStatus,
    isReservationStatusFetching,
  };
}
