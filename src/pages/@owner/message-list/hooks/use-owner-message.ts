import type {
  GetChatTemplatesData,
  RegisterChatTemplateData,
  DeleteChatTemplateData,
} from 'apis/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getOwnerChatTemplates,
  postOwnerChatTemplates,
  deleteOwnerChatTemplates,
} from '@pages/@owner/message-list/api';
import { USER_INFO } from '@shared/querykey/user-info';

export const useOwnerChatTemplates = () => {
  return useQuery<GetChatTemplatesData>({
    queryKey: USER_INFO.CHATS(),
    queryFn: () => getOwnerChatTemplates(),
  });
};

export const usePostOwnerChatTemplates = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterChatTemplateData, Error, string>({
    mutationFn: (content: string) => postOwnerChatTemplates(content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_INFO.CHATS(),
      });
    },
  });
};

export const useDeleteOwnerChatTemplates = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteChatTemplateData, Error, string>({
    mutationFn: (chatTemplateId: string) =>
      deleteOwnerChatTemplates(chatTemplateId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_INFO.CHATS(),
      });
    },
    onError: error => {
      console.error('채팅 템플릿 삭제 실패:', error);
    },
  });
};
