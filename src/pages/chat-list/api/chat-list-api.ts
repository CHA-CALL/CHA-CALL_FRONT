import { apiRequest } from '@api/apiRequest';
import { useQuery } from '@tanstack/react-query';
import type { GetChatRoomsData } from 'apis/data-contracts';

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

export const useGetChatList = (isOwner: boolean) => {
  return useQuery({
    queryKey: ['chat-list', isOwner],
    queryFn: () => getChatList(isOwner),
  });
};
