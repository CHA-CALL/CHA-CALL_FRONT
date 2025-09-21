import type { UpdateUserInfoRequest } from 'apis/data-contracts';
import React from 'react';

export type Field = 'name' | 'gender' | 'email';

export interface SetUserInfoItemProps {
  newUserInfo: UpdateUserInfoRequest;
  setNewUserInfo: React.Dispatch<React.SetStateAction<UpdateUserInfoRequest>>;
}
