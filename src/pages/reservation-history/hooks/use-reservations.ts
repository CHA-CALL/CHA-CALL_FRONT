import { useInfiniteQuery } from '@tanstack/react-query';
import { OWNER_GET_RESERVATIONS } from '@shared/querykey/owner/owner-reservation';
import { USER_GET_RESERVATIONS } from '@shared/querykey/user/user-reservation';
import type { ReservationState } from '@pages/reservation-history/types/reservation';
import {
  getOwnerReservations,
  getUserReservations
} from '@pages/reservation-history/api';

export const useOwnerReservations = (viewType: ReservationState) => {
  return useInfiniteQuery({
    queryKey: [OWNER_GET_RESERVATIONS.ALL, viewType],
    queryFn: async ({ pageParam }) => {
      return getOwnerReservations({
        viewType,
        ...(pageParam !== undefined && { 'cursorPagingRequest.cursor': pageParam }),
        'cursorPagingRequest.size': 20,
      });
    },
    initialPageParam: undefined as 0 | number | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!viewType,
  });
};

export const useUserReservations = (viewType: ReservationState) => {
  return useInfiniteQuery({
    queryKey: [USER_GET_RESERVATIONS.ALL, viewType],
    queryFn: async ({ pageParam }) => {
      return getUserReservations({
        viewType,
        ...(pageParam !== undefined && { 'cursorPagingRequest.cursor': pageParam }),
        'cursorPagingRequest.size': 20,
      });
    },
    initialPageParam: undefined as 0 | number | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!viewType,
  });
};
