import { apiRequest } from '@api/apiRequest';
import { USER_INFO } from '@shared/querykey/user-info';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  CreateChatRoomData,
  GetChatRoomsData,
  MarkMessagesAsReadData,
} from 'apis/data-contracts';

const getChatList = async (isOwner: boolean) => {
  const response = await apiRequest<GetChatRoomsData>({
    endPoint: '/chat/rooms',
    method: 'GET',
    params: {
      isOwner,
    },
  });
  return response.data;
};

const postChatRoom = async (foodTruckId: number) => {
  const response = await apiRequest<CreateChatRoomData>({
    endPoint: '/chat/rooms',
    method: 'POST',
    params: {
      foodTruckId,
    },
  });
  return response.data;
};

const patchChatRoom = async (chatRoomId: number) => {
  const response = await apiRequest<MarkMessagesAsReadData>({
    endPoint: `/chat/rooms/${chatRoomId}/read`,
    method: 'PATCH',
  });
  return response.data;
};

export const useGetChatList = (isOwner: boolean) => {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: USER_INFO.CHATS(),
    queryFn: () => getChatList(isOwner),
  });
};

export const usePostChatRoom = (foodTruckId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => postChatRoom(foodTruckId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO.CHATS() });
    },
  });
};

export const usePatchChatRoom = (chatRoomId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => patchChatRoom(chatRoomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO.CHATS() });
    },
  });
};
