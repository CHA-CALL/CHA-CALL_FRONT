import type { UpdateUserInfoRequest } from 'apis/data-contracts';

export const INITIAL_USER_INFO: UpdateUserInfoRequest = {
  profileImageUrl: '',
  name: '',
  email: '',
  gender: '',
  termAgreed: false,
};

export const USER_NAME_MAX_LENGTH = 25;

export const SET_USER_GENDER_TEXT = {
  male: '남성',
  female: '여성',
};
