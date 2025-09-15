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
          'relative flex justify-center items-center px-[1rem] title-sb-14 text-primary-700'
      )}
    >
      {isSelected && (
        <Icon
          name={'ic_check'}
          color='primary-700'
          className='absolute left-[1rem]'
        />
      )}
      <p className='flex relative justify-center items-center'>{title}</p>
    </button>
  );
}
