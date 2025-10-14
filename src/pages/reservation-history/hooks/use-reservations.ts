import { useInfiniteQuery } from '@tanstack/react-query';
import { PAGE_SIZE } from '@shared/constant/infinite-scroll';
import type { ReservationState } from '@pages/reservation-history/types/reservation';
import { getReservationHistory } from '@pages/reservation-history/api';

export const useReservations = (
  isProvider: boolean,
  viewType: ReservationState
) => {
  const query = useInfiniteQuery({
    queryKey: ['reservations', isProvider, viewType],
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

  return {
    reservations: query.data?.pages,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
  };
};
