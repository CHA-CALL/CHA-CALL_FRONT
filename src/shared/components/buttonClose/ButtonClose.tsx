import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn';

interface ButtonCloseProps {
  onClick: () => void;
  className?: string;
}

export default function ButtonClose({
  onClick,
  className
}: ButtonCloseProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex px-[0.64rem] py-[0.64rem] bg-grayscale-900 rounded-full',
        className
      )}
    >
      <Icon
        name='ic_close_white'
        width={12}
        height={12}
      />
    </button>
  )
}
