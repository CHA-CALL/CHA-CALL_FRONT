import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateReservationStatusRequest } from 'apis/data-contracts';

import useToast from '@hooks/use-toast';
import { updateReservationStatus } from '@pages/chat-room/api';
import { CHAT_QUERY_KEY } from '@shared/querykey/chat';

export default function useMutationReservationStatus(
  reservationId: number | null
) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: changeReservationStatus } = useMutation({
    mutationFn: (reservationStatus: UpdateReservationStatusRequest) =>
      updateReservationStatus(reservationId, reservationStatus),
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEY.RESERVATION_STATUS(reservationId),
      });
      toast.success(
        `예약 상태가 ${response?.reservationStatus}(으)로 변경되었습니다.`
      );
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    changeReservationStatus,
  };
}
