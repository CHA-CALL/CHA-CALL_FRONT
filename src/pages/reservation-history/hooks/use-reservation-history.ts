import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import type {
  CursorPagingResponseOwnerReservationHistoryResponse,
  CursorPagingResponseMemberReservationHistoryResponse,
} from 'apis/data-contracts';
import type { ReservationState } from '@pages/reservation-history/types/reservation-history';
import { getReservationHistory } from '@pages/reservation-history/api';
import { USER_INFO } from '@shared/querykey/user-info';

const FALLBACK: CursorPagingResponseOwnerReservationHistoryResponse | CursorPagingResponseMemberReservationHistoryResponse = {
  content: [],
  lastCursor: undefined,
  hasNext: false,
};

const reservationsQuery = (
  isProvider: boolean,
  viewType: ReservationState
) => ({
  queryKey: [...USER_INFO.RESERVATIONS(), isProvider, viewType],
  queryFn: async ({
    pageParam,
  }: QueryFunctionContext<readonly unknown[], number | null>) => {
    const response = await getReservationHistory(isProvider, {
      viewType,
      'cursorPagingRequest.cursor': pageParam ?? undefined,
    });
    return response ?? FALLBACK;
  },
  initialPageParam: null as number | null,
  getNextPageParam: (
    lastPage: CursorPagingResponseOwnerReservationHistoryResponse | CursorPagingResponseMemberReservationHistoryResponse
  ) => {
    if (lastPage?.hasNext) {
      return lastPage.lastCursor;
    }
    return undefined;
  },
  enabled: !!viewType,
});

export const useReservations = (
  isProvider: boolean,
  viewType: ReservationState
) => {
  const query = useInfiniteQuery(reservationsQuery(isProvider, viewType));

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
