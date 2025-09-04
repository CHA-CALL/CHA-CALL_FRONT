import React from 'react';
import { Icon } from '@shared/components/icon/Icon';

export interface BtnClickProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BtnCheck = ({ isChecked, setIsChecked }: BtnClickProps) => {
  const baseClasses =
    'w-[1.8rem] h-[1.8rem] rounded-[0.6rem] flex justify-center items-center';
  const checkedClasses = 'bg-primary-700';
  const uncheckedClasses = 'bg-white outline-[-1] outline-grayscale-200';
  return (
    <button
      type='button'
      className={`${baseClasses} ${isChecked ? checkedClasses : uncheckedClasses}`}
      onClick={() => setIsChecked(!isChecked)} // 핸들러 로직도 통합
    >
      {isChecked && <Icon name='ic_check_2' width={8} height={7} />}
    </button>
  );
};
