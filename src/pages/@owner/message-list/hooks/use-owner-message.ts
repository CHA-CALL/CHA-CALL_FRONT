import type {
  GetChatTemplatesData,
  RegisterChatTemplateData,
  DeleteChatTemplateData,
} from '@/../apis/data-contracts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getOwnerChatTemplates,
  postOwnerChatTemplates,
  deleteOwnerChatTemplates,
} from '@pages/@owner/message-list/api';
import { OWNER_CHAT_TEMPLATES } from '@shared/querykey/owner/chat';

export const useOwnerChatTemplates = () => {
  return useQuery<GetChatTemplatesData>({
    queryKey: OWNER_CHAT_TEMPLATES.ALL,
    queryFn: () => getOwnerChatTemplates(),
  });
};

export const usePostOwnerChatTemplates = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterChatTemplateData, Error, string>({
    mutationFn: (content: string) => postOwnerChatTemplates(content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: OWNER_CHAT_TEMPLATES.ALL,
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
        queryKey: OWNER_CHAT_TEMPLATES.ALL,
      });
    },
    onError: error => {
      console.error('채팅 템플릿 삭제 실패:', error);
    },
  });
};
