import { useQuery } from '@tanstack/react-query';
import {
  MEMBER_RESERVATION_DETAIL_KEY,
  OWNER_RESERVATION_DETAIL_KEY,
} from '@shared/querykey/reservation-detail';
import { getMemberReservationDetail, getOwnerReservationDetail } from '../api';
import type {
  GetMemberReservationDetailData,
  GetReservationDetailData,
} from 'apis/data-contracts';

export const useGetMemberReservationDetail = (reservationId: number) => {
  return useQuery<GetMemberReservationDetailData>({
    queryKey: MEMBER_RESERVATION_DETAIL_KEY.DETAIL(reservationId),
    queryFn: () => getMemberReservationDetail(reservationId),
  });
};

export const useGetOwnerReservationDetail = (reservationId: number) => {
  return useQuery<GetReservationDetailData>({
    queryKey: OWNER_RESERVATION_DETAIL_KEY.DETAIL(reservationId),
    queryFn: () => getOwnerReservationDetail(reservationId),
  });
};
