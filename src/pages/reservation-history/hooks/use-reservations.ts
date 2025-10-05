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
      const response = await getOwnerReservations({
        viewType,
        cursor: pageParam,
        size: 20,
      });
      return response;
    },
    initialPageParam: 0,
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
      const response = await getUserReservations({
        viewType,
        cursor: pageParam,
        size: 20,
      });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!viewType,
  });
};
