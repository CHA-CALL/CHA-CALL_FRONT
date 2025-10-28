import { z } from 'zod';
import { USER_NAME_MAX_LENGTH } from '@pages/set-user-info/constant/set-user-constant';

export const userSchema = z.object({
  profileImageUrl: z.string().url().optional(),
  name: z
    .string()
    .min(1, '이름은 필수입니다.')
    .max(
      USER_NAME_MAX_LENGTH,
      `이름은 최대 ${USER_NAME_MAX_LENGTH}자까지 가능합니다.`
    ),
  email: z
    .string()
    .min(1, '이메일은 필수입니다.')
    .email('이메일 형식이 올바르지 않습니다.'),
  gender: z.string().min(1, '성별은 필수입니다.'),
  termAgreed: z.boolean(),
});

export type UserFormData = z.infer<typeof userSchema>;
