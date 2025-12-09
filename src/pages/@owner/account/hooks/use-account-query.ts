import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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
import { USER_INFO } from '@shared/querykey/user-info';

interface UsePatchAccountDataOptions {
  onSuccess?: () => void;
  onError?: (_error: Error) => void;
}

export const accountQueries = {
  detail: () =>
    queryOptions<GetBankAccountData, Error, BankAccountResponse | null>({
      queryKey: USER_INFO.ACCOUNTS(),
      queryFn: () => getBankAccountInfo(),
      select: response => {
        if (!response.data) {
          return null;
        }
        return response.data;
      },
    }),
};

export const useFetchAccountData = () => {
  return useQuery(accountQueries.detail());
};

export const usePostNewAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: RegisterBankAccountRequest }) =>
      postBankAccountInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO.ACCOUNTS() });
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
      queryClient.invalidateQueries({ queryKey: USER_INFO.ACCOUNTS() });
      options?.onSuccess?.();
    },
    onError: error => {
      options?.onError?.(error);
    },
  });
};

export const useDeleteAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ accountId }: { accountId: number }) =>
      deleteBankAccountInfo(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO.ACCOUNTS() });
      options?.onSuccess?.();
    },
    onError: error => {
      console.error('계좌 정보 삭제 실패:', error.message);
      options?.onError?.(error);
    },
  });
};
