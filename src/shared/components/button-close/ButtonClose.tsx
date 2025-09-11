import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn';

interface ButtonCloseProps {
  handleClick: () => void;
  className?: string;
}

export default function ButtonClose({
  handleClick,
  className,
}: ButtonCloseProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'bg-grayscale-900 flex rounded-full px-[0.64rem] py-[0.64rem]',
        className
      )}
    >
      <Icon name='ic_close_white' width={12} height={12} />
    </button>
  );
}
