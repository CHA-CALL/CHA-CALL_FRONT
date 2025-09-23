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
      type='button'
      onClick={handleSelectDongEupMeon}
      className={cn(
        BaseClass,

        isSelected &&
          'title-sb-14 text-primary-700 relative flex items-center justify-center px-[1rem]'
      )}
    >
      {isSelected && (
        <Icon
          name={'ic_check'}
          className='text-primary-700 absolute left-[1rem]'
        />
      )}
      <p className='relative flex items-center justify-center'>{title}</p>
    </button>
  );
}
