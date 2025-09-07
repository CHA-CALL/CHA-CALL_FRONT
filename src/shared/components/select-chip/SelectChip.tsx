import { Icon } from '@shared/components/icon/Icon';

interface SelectChipProps {
  title: string;
  handleDeleteChip: () => void;
}

export default function SelectChip({ title, handleDeleteChip }: SelectChipProps) {
  return (
    <button
      type='button'
      className='h-[3rem] flex items-center rounded-[0.8rem] bg-primary-25 pl-[1.2rem] pr-[0.6rem] py-[0.2rem] leading-[1.5rem]'
      onClick={handleDeleteChip}
    >
      <span className='title-sb-12 text-primary-700'>{title}</span>
      <Icon name={'ic_close'} color='#F83419' />
    </button>
  );
}