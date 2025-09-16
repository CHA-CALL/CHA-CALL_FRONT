import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn';
interface ButtonTrashProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick: () => void;
}

export default function ButtonTrash({ handleClick, className, ...props }: ButtonTrashProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'flex rounded-[0.4rem] border-[0.1rem] border-grayscale-200 bg-white px-[0.2rem] py-[0.2rem]',
        className
      )}
      {...props}
    >
      <Icon name='ic_trash' width={22} height={22} color='#CCCED5' />
    </button>
  );
}
