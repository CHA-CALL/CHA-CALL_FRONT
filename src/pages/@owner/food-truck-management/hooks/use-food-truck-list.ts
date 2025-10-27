import type {
  CursorPagingResponseMyFoodTruckResponse,
  DeleteFoodTruckData,
} from 'apis/data-contracts';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deleteOwnerFoodTrucks,
  getOwnerFoodTrucks,
} from '@pages/@owner/food-truck-management/api';
import { FOOD_TRUCKS_QUERY_KEY } from '@shared/querykey/food-trucks/food-trucks';
import useToast from '@shared/hooks/use-toast';
import { PAGE_SIZE } from '@shared/constant/page-size';

const FALLBACK: CursorPagingResponseMyFoodTruckResponse = {
  content: [],
  lastCursor: undefined,
  hasNext: false,
};

export const useGetOwnerFoodTrucks = () => {
  const query = useInfiniteQuery<CursorPagingResponseMyFoodTruckResponse>({
    queryKey: FOOD_TRUCKS_QUERY_KEY.ALL,
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam === null ? undefined : Number(pageParam);
      const response = await getOwnerFoodTrucks({
        cursor,
        size: PAGE_SIZE,
      });
      return response ?? FALLBACK;
    },
    initialPageParam: null,
    getNextPageParam: lastPage => {
      if (lastPage?.hasNext && lastPage.lastCursor !== undefined) {
        return lastPage.lastCursor;
      }
      return undefined;
    },
  });

  const foodTrucks =
    query.data?.pages.flatMap(page => page?.content || []) || [];

  return {
    ...query,
    foodTrucks,
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
