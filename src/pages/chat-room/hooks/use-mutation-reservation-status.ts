import { useMutation } from '@tanstack/react-query';
import type { UpdateReservationStatusRequest } from 'apis/data-contracts';

import useToast from '@hooks/use-toast';
import { updateReservationStatus } from '@pages/chat-room/api';

export default function useMutationReservationStatus() {
  const toast = useToast();

  const { mutate: changeReservationStatus } = useMutation({
    mutationFn: ({
      reservationId,
      reservationStatus,
    }: {
      reservationId: number | null;
      reservationStatus: UpdateReservationStatusRequest;
    }) => updateReservationStatus(reservationId, reservationStatus),
    onSuccess: response => {
      toast.success(
        `예약 상태가 ${response?.reservationStatus}로 변경되었습니다.`
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
