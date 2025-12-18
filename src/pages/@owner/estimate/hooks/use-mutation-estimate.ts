import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type {
  CreateReservationRequest,
  UpdateReservationRequest,
} from 'apis/data-contracts';

import useToast from '@hooks/use-toast';
import {
  createReservation,
  updateReservation,
} from '@pages/@owner/estimate/api';
import { CHAT_QUERY_KEY } from '@shared/querykey/chat';

export const useMutationEstimate = (
  chatRoomId: number,
  reservationId: number | null
) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createEstimate } = useMutation({
    mutationFn: (estimateData: CreateReservationRequest) =>
      createReservation(estimateData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEY.META_DATA(chatRoomId, true),
      });
      navigate(-1);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const { mutate: updateEstimate } = useMutation({
    mutationFn: ({
      reservationId,
      data,
    }: {
      reservationId: number | null;
      data: UpdateReservationRequest;
    }) => updateReservation(reservationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHAT_QUERY_KEY.ESTIMATE(reservationId),
      });
      navigate(-1);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    createEstimate,
    updateEstimate,
  };
};
