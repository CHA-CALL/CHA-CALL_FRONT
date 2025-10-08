import { useInfiniteQuery } from '@tanstack/react-query';
import { OWNER_GET_RESERVATIONS } from '@shared/querykey/owner/owner-reservation';
import { USER_GET_RESERVATIONS } from '@shared/querykey/user/user-reservation';
import type { ReservationState } from '@pages/reservation-history/types/reservation';
import type { OwnerReservationHistoryResponse, MemberReservationHistoryResponse } from 'apis/data-contracts';
import {
  getOwnerReservations,
  getUserReservations
} from '@pages/reservation-history/api';

const PAGE_SIZE = 20;

export const useOwnerReservations = (viewType: ReservationState) => {
  const query = useInfiniteQuery({
    queryKey: [...OWNER_GET_RESERVATIONS.ALL, viewType],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getOwnerReservations({
        viewType,
        ...(pageParam !== undefined && { 'cursorPagingRequest.cursor': pageParam }),
        'cursorPagingRequest.size': PAGE_SIZE,
      });
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

  const reservations = query.data?.pages.reduce<OwnerReservationHistoryResponse[]>((acc, page) => {
    return acc.concat(page?.content || []);
  }, []) || [];

  return {
    reservations,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
  };
};

export const useUserReservations = (viewType: ReservationState) => {
  const query = useInfiniteQuery({
    queryKey: [...USER_GET_RESERVATIONS.ALL, viewType],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getUserReservations({
        viewType,
        ...(pageParam !== undefined && { 'cursorPagingRequest.cursor': pageParam }),
        'cursorPagingRequest.size': PAGE_SIZE,
      });
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

  const reservations = query.data?.pages.reduce<MemberReservationHistoryResponse[]>((acc, page) => {
    return acc.concat(page?.content || []);
  }, []) || [];

  return {
    reservations,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isLoading: query.isLoading,
  };
};
