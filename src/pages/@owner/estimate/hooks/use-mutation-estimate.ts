import { useMutation } from '@tanstack/react-query';
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

export const useMutationEstimate = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { mutate: createEstimate } = useMutation({
    mutationFn: (estimateData: CreateReservationRequest) =>
      createReservation(estimateData),
    onSuccess: () => {
      // TODO: 채팅방 메타데이터 조회 캐시 삭제.
      // 메타데이터를 다시 조회하기 때문에 response가 필요없음
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
