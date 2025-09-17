import React from 'react';
import { Icon, type IconId } from '@components/icon/Icon';
import { cn } from '@utils/cn';

interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: () => void;
  icon: IconId;
  iconColor?: string;
  iconSize?: number;
  className?: string;
}

export default function ButtonIcon({
  handleClick,
  className,
  icon,
  iconColor,
  iconSize = 22,
  ...props
}: ButtonIconProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'border-grayscale-200 flex rounded-[0.4rem] border-[0.1rem] bg-white px-[0.2rem] py-[0.2rem]',
        className
      )}
      {...props}
    >
      <Icon name={icon} width={iconSize} height={iconSize} color={iconColor} />
    </button>
  );
}
