import { Icon } from '@shared/components/icon/Icon';

interface SelectChipProps {
  title: string;
  handleDeleteChip: () => void;
}

export default function SelectChip({
  title,
  handleDeleteChip,
}: SelectChipProps) {
  return (
    <button
      type='button'
      className='flex h-[3rem] items-center rounded-[0.8rem] bg-primary-25 py-[0.2rem] pl-[1.2rem] pr-[0.6rem] leading-[1.5rem]'
      onClick={handleDeleteChip}
    >
      <span className='text-primary-700 title-sb-12'>{title}</span>
      <Icon name='ic_close' color='#F83419' />
    </button>
  );
}
