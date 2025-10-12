import type { UseMutateFunction } from '@tanstack/react-query';
import type {
  BaseResponseVoid,
  UpdateUserInfoRequest,
  UserResponse,
} from 'apis/data-contracts';
import React from 'react';

export interface SetUserInfoItemProps {
  userInfo: UserResponse;
  setUserInfo: React.Dispatch<React.SetStateAction<UserResponse>>;
  // setUserInfo: UseMutateFunction<
  //   BaseResponseVoid,
  //   Error,
  //   UpdateUserInfoRequest,
  //   unknown
  // >;
  // userInfo: UpdateUserInfoRequest;
  // setUserInfo: React.Dispatch<React.SetStateAction<UpdateUserInfoRequest>>;
}
