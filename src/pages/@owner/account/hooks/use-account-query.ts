import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  postBankAccountInfo,
  deleteBankAccountInfo,
  getBankAccountInfo,
  updateBankAccountInfo,
} from '@pages/@owner/account/api';
import type {
  BankAccountResponse,
  GetBankAccountData,
  RegisterBankAccountRequest,
  UpdateBankAccountRequest,
} from 'apis/data-contracts';
import { ACCOUNT_INFO } from '@shared/querykey/owner/account';

interface UsePatchAccountDataOptions {
  onSuccess?: () => void;
  onError?: (_error: Error) => void;
}

export const useFetchAccountData = () => {
  return useQuery<GetBankAccountData, Error, BankAccountResponse | null>({
    queryKey: ACCOUNT_INFO.ALL,
    queryFn: () => getBankAccountInfo(),
    select: response => {
      if (!response.data) {
        return null;
      }
      return response.data;
    },
  });
};

export const usePostNewAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: RegisterBankAccountRequest }) =>
      postBankAccountInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNT_INFO.ALL });
      options?.onSuccess?.();
    },
    onError: error => {
      options?.onError?.(error);
    },
  });
};

export const useUpdateAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountId,
      data,
    }: {
      accountId: number;
      data: UpdateBankAccountRequest;
    }) => updateBankAccountInfo(accountId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNT_INFO.ALL });
      options?.onSuccess?.();
    },
    onError: error => {
      options?.onError?.(error);
    },
  });
};

/** 현재 삭제 버튼 없음. */
export const useDeleteAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ accountId }: { accountId: number }) =>
      deleteBankAccountInfo(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNT_INFO.ALL });
      options?.onSuccess?.();
    },
    onError: error => {
      console.error('계좌 정보 삭제 실패:', error.message);
      options?.onError?.(error);
    },
  });
};
