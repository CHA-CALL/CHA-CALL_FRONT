import { apiRequest } from '@api/apiRequest';
import type { GetChatRoomMetaDataData } from 'apis/data-contracts';

export const getChatRoomMetaData = async (
  chatRoomId: number,
  isOwner: boolean
) => {
  const response = await apiRequest<GetChatRoomMetaDataData>({
    endPoint: `/chat/rooms/${chatRoomId}`,
    method: 'GET',
    params: {
      isOwner,
    },
  });
  return response.data;
};
