import SetUserName from '@pages/set-user-info/components/SetUserName';
import SetUserEmail from '@pages/set-user-info/components/SetUserEmail';
import SetUserGender from '@pages/set-user-info/components/SetUserGender';
import type { UpdateUserInfoRequest } from 'apis/data-contracts';

export const INITIAL_USER_INFO: UpdateUserInfoRequest = {
  profileImageUrl: '',
  name: '',
  email: '',
  gender: '',
  termAgreed: false,
};

export const COMPONENT_MAP = {
  name: SetUserName,
  email: SetUserEmail,
  gender: SetUserGender,
} as const;

export type ValidField = keyof typeof COMPONENT_MAP;
export const VALID_FIELDS = Object.keys(COMPONENT_MAP) as ValidField[];

export const SET_USER_INFO_TITLES = {
  name: '이름 변경',
  email: '이메일 변경',
  gender: '성별 변경',
};

export const USER_NAME_MAX_LENGTH = 25;

export const SET_USER_NAME_TEXT = {
  title: '이름을 입력해주세요.',
  ownerText: '고객님에게 보여지는 이름입니다.',
  memberText: '사장님에게 보여지는 이름입니다.',
};

export const SET_USER_GENDER_TEXT = {
  title: '성별을 선택해주세요.',
  male: '남성',
  female: '여성',
};
