import type { UpdateUserInfoRequest } from 'apis/data-contracts';

export const initialUserInfo: UpdateUserInfoRequest = {
  profileImageUrl: '',
  name: '',
  email: '',
  gender: '',
  termAgreed: false,
};

export const title = {
  name: '이름 변경',
  email: '이메일 변경',
  gender: '성별 변경',
};

export const USER_NAME_MAX_LENGTH = 25;

export const setUserNameText = {
  title: '이름을 입력해주세요.',
  ownerText: '고객님에게 보여지는 이름입니다.',
  memberText: '사장님에게 보여지는 이름입니다.',
};

export const setUserGenderText = {
  title: '성별을 선택해주세요.',
  male: '남성',
  female: '여성',
};
