import type {
  GetChatTemplatesData,
  RegisterChatTemplateData,
} from '@/../apis/data-contracts';
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
