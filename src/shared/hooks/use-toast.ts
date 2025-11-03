import { useSetAtom } from 'jotai';
import { ToastAtom } from '@utils/toast';
import { TOAST_TYPE } from '@constant/toast';

const useToast = () => {
  const addToast = useSetAtom(ToastAtom);

  return {
    success: (message: string) =>
      addToast({ type: TOAST_TYPE.SUCCESS, message }),
    error: (message: string) => addToast({ type: TOAST_TYPE.ERROR, message }),
    warning: (message: string) =>
      addToast({ type: TOAST_TYPE.WARNING, message }),
    info: (message: string) => addToast({ type: TOAST_TYPE.INFO, message }),
  };
};

export default useToast;
