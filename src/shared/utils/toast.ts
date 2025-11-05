import { atom } from 'jotai';
import { type ToastType } from '@constant/toast';

export interface ToastProps {
  type: ToastType;
  message: string;
}

export const ToastDataAtom = atom<ToastProps | null>(null);

export const ToastAtom = atom(null, (_, set, { type, message }: ToastProps) => {
  const newToast = {
    type,
    message,
  };
  set(ToastDataAtom, newToast);
});

export const RemoveToastAtom = atom(null, (_, set) => {
  set(ToastDataAtom, null);
});
