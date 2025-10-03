import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { Icon } from '@shared/components/icon/Icon';
import { type ToastProps, RemoveToastAtom } from '@shared/utils/toast';
import { TOAST_DURATION, TOAST_TYPE } from '@shared/constant/toast';

export function CustomToast({ type, message }: ToastProps) {
  const removeToast = useSetAtom(RemoveToastAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast();
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [removeToast]);

  const handleClick = () => {
    removeToast();
  };

  const getIcon = () => {
    switch (type) {
      case TOAST_TYPE.SUCCESS:
        return <Icon name='ic_check' className='text-primary-700' />;
      case TOAST_TYPE.ERROR:
        return <Icon name='ic_close' className='text-primary-700' />;
      case TOAST_TYPE.WARNING:
        return <Icon name='ic_close' className='text-primary-700' />;
      case TOAST_TYPE.INFO:
        return <Icon name='ic_check' className='text-primary-700' />;
    }
  };

  return (
    <div
      className='fixed-center bottom-[8rem] z-[99] bg-white px-[2rem]'
      onClick={handleClick}
    >
      <div className='bg-grayscale-900 inline-flex w-full items-center gap-[0.4rem] rounded-[1.6rem] px-[1.6rem] py-[0.9rem]'>
        {getIcon()}
        <span className='caption-m-12 text-white'>{message}</span>
      </div>
    </div>
  );
}
