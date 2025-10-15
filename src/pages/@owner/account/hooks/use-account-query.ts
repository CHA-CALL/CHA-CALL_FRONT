import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBankAccountInfo,
  deleteBankAccountInfo,
  getBankAccountInfo,
  updateBankAccountInfo,
} from '../api';
import type {
  BankAccountResponse,
  GetBankAccountData,
  UpdateBankAccountRequest,
} from 'apis/data-contracts';

interface UsePatchAccountDataOptions {
  onSuccess?: () => void;
  onError?: (_error: Error) => void;
}

export const useFetchAccountData = () => {
  return useQuery<GetBankAccountData, Error, BankAccountResponse | null>({
    queryKey: ['accountInfo'],
    queryFn: () => getBankAccountInfo(),
    select: response => {
      if (!response.data) {
        return null;
      }
      return response.data;
    },
  });
};

export const useCreateNewAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: UpdateBankAccountRequest }) =>
      createBankAccountInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountInfo'] });
      options?.onSuccess?.();
    },
    onError: error => {
      console.error('계좌 정보 추가 실패:', error.message);
      options?.onError?.(error);
    },
  });
};

// 완
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
      queryClient.invalidateQueries({ queryKey: ['accountInfo'] });
      options?.onSuccess?.();
    },
    onError: error => {
      console.error('계좌 정보 갱신 실패:', error.message);
      options?.onError?.(error);
    },
  });
};

export const useDeleteAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountId,
    }: {
      accountId: number;
      data: UpdateBankAccountRequest;
    }) => deleteBankAccountInfo(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountInfo'] });
      options?.onSuccess?.();
    },
    onError: error => {
      console.error('계좌 정보 삭제 실패:', error.message);
      options?.onError?.(error);
    },
  });
};
