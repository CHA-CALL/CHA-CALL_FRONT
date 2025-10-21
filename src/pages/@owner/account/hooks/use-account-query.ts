import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBankAccountInfo,
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
import useToast from '@shared/hooks/use-toast';

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

export const useCreateNewAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ data }: { data: RegisterBankAccountRequest }) =>
      createBankAccountInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACCOUNT_INFO.ALL });
      toast.success('저장이 완료되었습니다.');
      options?.onSuccess?.();
    },
    onError: error => {
      console.error('계좌 정보 추가 실패:', error.message);
      toast.error('저장에 실패했습니다.');
      options?.onError?.(error);
    },
  });
};

export const useUpdateAccount = (options?: UsePatchAccountDataOptions) => {
  const queryClient = useQueryClient();
  const toast = useToast();

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
      toast.success('저장이 완료되었습니다.');
      options?.onSuccess?.();
    },
    onError: error => {
      console.error('계좌 정보 갱신 실패:', error.message);
      toast.error('저장에 실패했습니다.');
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
