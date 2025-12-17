import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { ReservationResponse } from 'apis/data-contracts';

import useToast from '@hooks/use-toast';
import { CHAT_QUERY_KEY } from '@shared/querykey/chat';
import { getReservation } from '@pages/@owner/estimate/api';

export const useQueryEstimate = (reservationId: number | null) => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    data: estimateData,
    isPending,
    isError,
    error,
  } = useQuery<ReservationResponse | undefined>({
    queryKey: CHAT_QUERY_KEY.ESTIMATE(reservationId),
    queryFn: () => getReservation(reservationId),
    enabled: reservationId !== null,
  });

  if (isError) {
    toast.error(error.message);
    navigate(-1);
  }

  return {
    estimateData,
    isPending,
  };
};
