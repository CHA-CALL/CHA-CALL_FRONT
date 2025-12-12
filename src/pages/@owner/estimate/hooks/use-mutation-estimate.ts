import { useMutation } from '@tanstack/react-query';
import {
  createReservation,
  type ReservationEstimateData,
} from '@pages/@owner/estimate/api';
import useToast from '@hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useMutationEstimate = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { mutate: createEstimate } = useMutation({
    mutationFn: (estimateData: ReservationEstimateData) =>
      createReservation(estimateData),
    onSuccess: () => {
      // TODO: 채팅방 메시지 내역 조회 캐시 삭제
      navigate(-1);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {
    createEstimate,
  };
};
