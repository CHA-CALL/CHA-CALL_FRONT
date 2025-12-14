import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import useToast from '@hooks/use-toast';
import { ROUTES } from '@router/constant/routes';
import { getChatRoomMetaData } from '@pages/chat-room/api';
import { CHAT_QUERY_KEY } from '@shared/querykey/chat';
import type { ChatRoomMetaDataResponse } from 'apis/data-contracts';

export default function useChatRoomQuery(
  isOwner: boolean,
  chatRoomId?: string
) {
  const chatRoomIdNumber = Number(chatRoomId);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    data: metaData,
    isPending: isMetaDataPending,
    isError: isMetaDataError,
    error: metaDataError,
  } = useQuery<ChatRoomMetaDataResponse | undefined>({
    queryKey: CHAT_QUERY_KEY.META_DATA(chatRoomIdNumber, isOwner),
    queryFn: () => getChatRoomMetaData(chatRoomIdNumber, isOwner),
    enabled: !!chatRoomId,
  });

  if (isMetaDataError) {
    toast.error(metaDataError.message);
    navigate(ROUTES.CHAT_LIST);
  }

  return {
    metaData,
    isMetaDataPending,
  };
}
