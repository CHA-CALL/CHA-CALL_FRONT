import type { UserResponse } from 'apis/data-contracts';
import React from 'react';

export interface SetUserInfoItemProps {
  userInfo: UserResponse;
  setUserInfo: React.Dispatch<React.SetStateAction<UserResponse>>;
}
