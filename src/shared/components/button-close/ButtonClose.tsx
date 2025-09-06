import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn';

interface ButtonCloseProps {
  handleClick: () => void;
  className?: string;
}

export default function ButtonClose({
  handleClick,
  className
}: ButtonCloseProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
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
