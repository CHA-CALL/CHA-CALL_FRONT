import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface DongEupMeonItemProps {
  title: string;
  isSelected: boolean;
  handleSelectDongEupMeon: () => void;
}
const BaseClass =
  'w-full h-[4.2rem] px-[1rem] py-[0.7rem] bg-white body-m-14 text-grayscale-700';

export default function DongEupMeonItem({
  title,
  isSelected,
  handleSelectDongEupMeon,
}: DongEupMeonItemProps) {
  return (
    <button
      onClick={handleSelectDongEupMeon}
      className={cn(
        BaseClass,

        isSelected &&
          'flex items-center justify-center px-[1rem] title-sb-14 text-primary-700'
      )}
    >
      <p className='flex relative justify-center items-center'>
        {isSelected && (
          <Icon
            name={'ic_check'}
            color='primary-700'
            viewBox='0 0 22 22'
            className='absolute left-[-3.7rem]'
          />
        )}

        {title}
      </p>
    </button>
  );
}
