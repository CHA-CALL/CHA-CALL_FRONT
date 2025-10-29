import { apiRequest } from '@api/apiRequest';
import type {
  DeleteBankAccountData,
  GetBankAccountData,
  RegisterBankAccountData,
  RegisterBankAccountRequest,
  UpdateBankAccountData,
  UpdateBankAccountRequest,
} from 'apis/data-contracts';

export const getBankAccountInfo = async () => {
  const response = await apiRequest<GetBankAccountData>({
    endPoint: '/owners/me/bank-accounts',
    method: 'GET',
  });
  return response;
};

export const postBankAccountInfo = async (
  newAccountData: RegisterBankAccountRequest
) => {
  const response = await apiRequest<RegisterBankAccountData>({
    endPoint: '/owners/me/bank-accounts',
    method: 'POST',
    data: newAccountData,
  });
  return response;
};

export const updateBankAccountInfo = async (
  bankAccountId: number,
  newAccountData: UpdateBankAccountRequest
) => {
  const response = await apiRequest<UpdateBankAccountData>({
    endPoint: `/owners/me/bank-accounts/${bankAccountId}`,
    method: 'PUT',
    data: newAccountData,
  });
  return response;
};

/** TODO : 현재 계좌를 삭제하는 UI 없음 */
export const deleteBankAccountInfo = async (bankAccountId: number) => {
  const response = await apiRequest<DeleteBankAccountData>({
    endPoint: `/owners/me/bank-accounts/${bankAccountId}`,
    method: 'DELETE',
  });
  return response;
};
