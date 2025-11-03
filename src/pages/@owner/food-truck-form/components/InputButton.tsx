import { type MouseEvent } from 'react';
import { Icon, type IconId } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface InputButtonProps {
  id?: string;
  iconId: IconId;
  text: string;
  handleClick: () => void;
  className?: string;
  isRemovable?: boolean;
  handleRemove?: (_event: MouseEvent<SVGSVGElement>) => void;
}

export default function InputButton({
  id,
  iconId,
  text,
  className,
  handleClick,
  isRemovable,
  handleRemove,
}: InputButtonProps) {
  return (
    <div
      id={id}
      onClick={handleClick}
      className={cn(
        'border-grayscale-300 flex cursor-pointer items-center justify-between rounded-[1.6rem] border px-[2rem] py-[1.6rem]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center gap-[1.2rem]',
          isRemovable ? 'text-grayscale-700' : 'text-grayscale-300'
        )}
      >
        <Icon name={iconId} />
        <span className='body-m-14'>{text}</span>
      </div>
      {isRemovable && (
        <Icon
          name='ic_close'
          className='text-grayscale-500'
          onClick={event => handleRemove?.(event)}
        />
      )}
    </div>
  );
}
