import { Icon } from '@components/icon/Icon';
import { cn } from '@utils/cn';

interface PageSwitchButtonProps {
  isSelected: boolean;
  text: string;
  handleClick: () => void;
}

export default function PageSwitchButton({
  isSelected,
  text,
  handleClick,
}: PageSwitchButtonProps) {
  return (
    <div
      onClick={handleClick}
      className={cn(
        'border-grayscale-300 flex cursor-pointer items-center justify-between gap-[1.2rem] rounded-[1.6rem] px-[1rem] py-[1.2rem]',
        isSelected
          ? 'bg-primary-25 text-primary-700'
          : 'bg-grayscale-50 text-grayscale-500'
      )}
    >
      <div className='flex items-center gap-[0.6rem]'>
        <Icon name='ic_error' />
        <span className='title-sb-12'>{text}</span>
      </div>
      <Icon name='ic_next' />
    </div>
  );
}
