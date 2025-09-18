import React from 'react';
import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface ButtonCheckClickProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
  handleToggle: () => void;
}

const ButtonCheckClasses = {
  checked: 'bg-primary-700',
  unchecked: 'bg-white ring-1 ring-inset ring-grayscale-200',
};

export default function ButtonCheck({
  isChecked,
  handleToggle,
  className,
  ...props
}: ButtonCheckClickProps) {
  const isInteractive = !!handleToggle;

  return (
    <button
      type={isInteractive ? 'button' : undefined}
      className={cn(
        'flex h-[1.8rem] w-[1.8rem] items-center justify-center rounded-[0.6rem]',
        isChecked ? ButtonCheckClasses.checked : ButtonCheckClasses.unchecked,
        className
      )}
      onClick={handleToggle}
      {...props}
    >
      {isChecked && (
        <Icon
          name='ic_check'
          color='#fff'
          className='-translate-y-[0.1rem] scale-125'
        />
      )}
    </button>
  );
}
