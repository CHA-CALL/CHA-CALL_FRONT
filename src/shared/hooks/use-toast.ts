import { useSetAtom } from 'jotai';
import { ToastAtom } from '@utils/toast';
import { TOAST_TYPE } from '@constant/toast';
import { useCallback, useMemo } from 'react';

const useToast = () => {
  const addToast = useSetAtom(ToastAtom);

  const success = useCallback(
    (message: string) => addToast({ type: TOAST_TYPE.SUCCESS, message }),
    [addToast]
  );

  const error = useCallback(
    (message: string) => addToast({ type: TOAST_TYPE.ERROR, message }),
    [addToast]
  );

  const warning = useCallback(
    (message: string) => addToast({ type: TOAST_TYPE.WARNING, message }),
    [addToast]
  );

  const info = useCallback(
    (message: string) => addToast({ type: TOAST_TYPE.INFO, message }),
    [addToast]
  );

  return useMemo(
    () => ({ success, error, warning, info }),
    [success, error, warning, info]
  );
};

export default useToast;
