import { z } from 'zod';

export const chatTemplateSchema = z.object({
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(500, '500자 이내로 입력해주세요.'),
});

export type ChatTemplateFormType = z.infer<typeof chatTemplateSchema>;
