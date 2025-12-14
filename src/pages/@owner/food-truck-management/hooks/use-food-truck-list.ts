import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type {
  CursorPagingResponseMyFoodTruckResponse,
  DeleteFoodTruckData,
} from 'apis/data-contracts';
import useToast from '@hooks/use-toast';

import {
  updateFoodTruckStatus,
  deleteOwnerFoodTrucks,
  getOwnerFoodTrucks,
} from '@pages/@owner/food-truck-management/api';
import type { ViewedStatus } from '@pages/@owner/food-truck-management/constants/viewed-status';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks';

const FALLBACK: CursorPagingResponseMyFoodTruckResponse = {
  content: [],
  lastCursor: undefined,
  hasNext: false,
};

export const ownerFoodTruckQueries = {
  list: () => ({
    queryKey: FOOD_TRUCKS_QUERY_KEY.ALL,
    queryFn: async ({ pageParam }: { pageParam: unknown }) => {
      const cursor = pageParam === null ? undefined : Number(pageParam);
      const response = await getOwnerFoodTrucks({
        cursor,
      });
      return response ?? FALLBACK;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: CursorPagingResponseMyFoodTruckResponse) => {
      if (lastPage?.hasNext && lastPage.lastCursor !== undefined) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
  }),
};

export const useGetOwnerFoodTrucks = () => {
  const {
    data,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
  } = useInfiniteQuery({
    ...ownerFoodTruckQueries.list(),
  });

  const foodTrucks = data?.pages.flatMap(page => page?.content || []) || [];

  return {
    foodTrucks,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
  };
};

export const useDeleteOwnerFoodTrucks = () => {
  const queryClient = useQueryClient();

  const toast = useToast();

  return useMutation<DeleteFoodTruckData, Error, number>({
    mutationFn: (foodTruckId: number) => deleteOwnerFoodTrucks({ foodTruckId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.ALL,
      });
      toast.success('푸드트럭이 성공적으로 삭제되었습니다.');
    },
    onError: () => {
      toast.error('푸드트럭 삭제에 실패했습니다.');
    },
  });
};

export const useChangeFoodTrucksViewedStatus = () => {
  const queryClient = useQueryClient();

  const toast = useToast();

  const { mutate: changeStatus } = useMutation({
    mutationFn: ({
      foodTruckId,
      status,
    }: {
      foodTruckId: number;
      status: ViewedStatus;
    }) => updateFoodTruckStatus({ foodTruckId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FOOD_TRUCKS_QUERY_KEY.ALL,
      });
      toast.success('푸드트럭 표시상태가 변경되었습니다.');
    },
    onError: () => {
      toast.error('표시 상태 변경에 실패했습니다.');
    },
  });

  return {
    changeStatus,
  };
};
