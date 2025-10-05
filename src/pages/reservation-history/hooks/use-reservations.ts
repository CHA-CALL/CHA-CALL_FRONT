import { useInfiniteQuery } from '@tanstack/react-query';
import { getOwnerReservations } from '@pages/reservation-history/api';
import { OWNER_GET_RESERVATIONS } from '@shared/querykey/owner/reservation';
import type { ReservationState } from '@pages/reservation-history/types/reservation';

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
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!viewType,
  });
};
