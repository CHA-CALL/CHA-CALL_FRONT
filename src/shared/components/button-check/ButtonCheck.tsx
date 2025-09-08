import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface ButtonCheckClickProps {
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
}: ButtonCheckClickProps) {
  return (
    <button
      type='button'
      className={cn(
        'w-[1.8rem] h-[1.8rem] rounded-[0.6rem] flex justify-center items-center ',
        isChecked ? ButtonCheckClasses.checked : ButtonCheckClasses.unchecked
      )}
      onClick={handleToggle}
    >
      {isChecked && <Icon name='ic_check' color='#fff'className='scale-125 -translate-y-[0.1rem]'/>}
    </button>
  );
}
