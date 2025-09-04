import React from 'react';
import { Icon } from '@shared/components/icon/Icon';

export interface BtnClickProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BtnCheck = ({ isChecked, setIsChecked }: BtnClickProps) => {
  return (
    <>
      {isChecked ? (
        <button
          type='button'
          className='w-[1.8rem] h-[1.8rem] flex justify-center items-center bg-primary-700 rounded-[0.6rem]'
          onClick={() => setIsChecked(false)}
        >
          <Icon name='ic_check_2' width={8} height={7}/>
        </button>
      ) : (
        <button
          type='button'
          className='w-[1.8rem] h-[1.8rem] bg-white outline-[-1] outline-grayscale-200 rounded-[0.6rem]'
          onClick={() => setIsChecked(true)}
        >
        </button>
      )}
    </>
  );
};
