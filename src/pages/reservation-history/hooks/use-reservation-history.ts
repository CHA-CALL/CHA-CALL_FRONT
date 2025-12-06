import { useInfiniteQuery } from '@tanstack/react-query';
import type { ReservationState } from '@pages/reservation-history/types/reservation-history';
import { getReservationHistory } from '@pages/reservation-history/api';
import { USER_INFO } from '@shared/querykey/user-info';

export const useReservations = (
  isProvider: boolean,
  viewType: ReservationState
) => {
  const query = useInfiniteQuery({
    queryKey: USER_INFO.RESERVATIONS(),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getReservationHistory(isProvider, {
        viewType,
        ...(pageParam !== undefined && {
          'cursorPagingRequest.cursor': pageParam,
        }),
      });
    },
    initialPageParam: undefined,
    getNextPageParam: lastPage => {
      if (lastPage?.hasNext) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
    enabled: !!viewType,
  });

  const reservations =
    query.data?.pages.flatMap(page => page?.content || []) || [];

  return {
    reservations,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
