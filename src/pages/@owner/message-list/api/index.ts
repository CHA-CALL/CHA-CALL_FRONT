import type {
  GetChatTemplatesData,
  DeleteChatTemplateData,
  RegisterChatTemplateData,
} from 'apis/data-contracts';
import { apiRequest } from '@api/apiRequest';

export const getOwnerChatTemplates = async () => {
  const response = await apiRequest<GetChatTemplatesData>({
    endPoint: `/owners/me/chat-templates`,
    method: 'GET',
  });
  return response;
};

export const postOwnerChatTemplates = async (content: string) => {
  const response = await apiRequest<RegisterChatTemplateData>({
    endPoint: `/owners/me/chat-templates`,
    method: 'POST',
    data: { content },
  });
  return response;
};

export const deleteOwnerChatTemplates = async (chatTemplateId: string) => {
  const response = await apiRequest<DeleteChatTemplateData>({
    endPoint: `/owners/me/chat-templates/${chatTemplateId}`,
    method: 'DELETE',
  });
  return response;
};
