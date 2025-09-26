import type { UpdateUserInfoRequest } from 'apis/data-contracts';
import React from 'react';

export interface SetUserInfoItemProps {
  userInfo: UpdateUserInfoRequest;
  setUserInfo: React.Dispatch<React.SetStateAction<UpdateUserInfoRequest>>;
}
