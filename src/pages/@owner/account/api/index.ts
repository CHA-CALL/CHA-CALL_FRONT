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
  if (!response.isSuccess) {
    throw new Error(
      response.message || '사장님의 계좌 정보를 가져오는데 실패했습니다.'
    );
  }
  return response;
};

export const createBankAccountInfo = async (
  newAccountData: RegisterBankAccountRequest
) => {
  const response = await apiRequest<RegisterBankAccountData>({
    endPoint: '/owners/me/bank-accounts',
    method: 'POST',
    data: newAccountData,
  });
  if (!response.isSuccess || !response.data) {
    throw new Error(
      response.message || '사장님의 계좌 정보를 등록하는데 실패했습니다.'
    );
  }
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

  if (!response.isSuccess) {
    throw new Error(
      response.message || '사장님의 계좌 정보를 수정하는 것에 실패했습니다.'
    );
  }
  return response;
};

export const deleteBankAccountInfo = async (bankAccountId: number) => {
  const response = await apiRequest<DeleteBankAccountData>({
    endPoint: `/owners/me/bank-accounts/${bankAccountId}`,
    method: 'DELETE',
  });

  if (!response.isSuccess) {
    throw new Error(
      response.message || '사장님의 계좌 정보를 삭제하는 것에 실패했습니다.'
    );
  }
  return response;
};
