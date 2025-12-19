import {
  CHAT_MIN_LENGTH,
  CHAT_MAX_LENGTH,
  ERROR_MESSAGE,
} from '@pages/@owner/message-list/constants.ts/message-list';
import { z } from 'zod';

export const chatTemplateSchema = z.object({
  content: z
    .string()
    .min(CHAT_MIN_LENGTH, ERROR_MESSAGE.CHAT_MIN_MESSAGE)
    .max(CHAT_MAX_LENGTH, ERROR_MESSAGE.CHAT_MAX_MESSAGE),
});

export type ChatTemplateFormType = z.infer<typeof chatTemplateSchema>;
