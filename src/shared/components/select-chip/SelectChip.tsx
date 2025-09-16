import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@utils/cn';

interface SelectChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  handleDeleteChip: () => void;
}

export default function SelectChip({
  title,
  handleDeleteChip,
  className,
  ...props
}: SelectChipProps) {
  return (
    <button
      type='button'
      className={cn(
        'flex h-[3rem] items-center rounded-[0.8rem] bg-primary-25 py-[0.2rem] pl-[1.2rem] pr-[0.6rem] leading-[1.5rem]',
        className
      )}
      onClick={handleDeleteChip}
      {...props}
   
    >
      <span className='text-primary-700 title-sb-12'>{title}</span>
      <Icon name='ic_close' color='#F83419' />
    </button>
  );
}
