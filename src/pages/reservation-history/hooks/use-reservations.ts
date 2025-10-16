import { useInfiniteQuery } from '@tanstack/react-query';
import type { ReservationState } from '@pages/reservation-history/types/reservation';
import { getReservationHistory } from '@pages/reservation-history/api';
import { PAGE_SIZE } from '@shared/constant/infinite-scroll';
import { RESERVATION_QUERY_KEY } from '@shared/querykey/reservations';

export const useReservations = (
  isProvider: boolean,
  viewType: ReservationState
) => {
  const query = useInfiniteQuery({
    queryKey: RESERVATION_QUERY_KEY.LIST(isProvider, viewType),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getReservationHistory(
        isProvider,
        {
          viewType,
          ...(pageParam !== undefined && { 'cursorPagingRequest.cursor': pageParam }),
          'cursorPagingRequest.size': PAGE_SIZE,
        }
      );
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!viewType,
  });

  const reservations = query.data?.pages.flatMap(page => page?.content || []) || [];

  return {
    reservations,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
