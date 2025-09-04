import { Icon } from '@shared/components/icon/Icon';

export interface ChipData {
  title: string;
}

export interface SelectChipProps {
  totalCount: number;
  chips: ChipData[];
  // eslint-disable-next-line no-unused-vars
  handleDeleteChip: (title: string) => void;
}

export interface RemovableChipProps {
  title: string;
  handleClickChip: () => void;
}

const RemoveableChip = ({ title, handleClickChip }: RemovableChipProps) => {
  return (
    <button
      type='button'
      className='flex rounded-[0.8rem] bg-primary-25 pl-[1.2rem] pr-[0.6rem] py-auto'
      onClick={handleClickChip}
    >
      <div className='font-semibold text-xs text-primary-700'>{title}</div>
      <Icon name={'ic_close'} className='text-primary-700 stroke-primary-700' />
    </button>
  );
};

export const SelectChip = ({
  totalCount,
  chips,
  handleDeleteChip,
}: SelectChipProps) => {
  return (
    <>
      {chips.length > 0 && (
        <div className='flex flex-col gap-[1rem] rounded-t-[1rem] px-[2rem] py-[1.1rem] bg-white'>
          <span className='font-semibold text-xs leading-none'>
            <span className='text-primary-700'>{chips.length} </span>
            <span className='text-black'>/ {totalCount}</span>
          </span>
          <div className='flex flex-wrap gap-[0.8rem]'>
            {(chips ?? []).map(chip => (
              <RemoveableChip
                title={chip.title}
                handleClickChip={() => handleDeleteChip(chip.title)}
                key={chip.title}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
