import { Icon } from '@shared/components/icon/Icon';

interface ChipData {
  title: string;
}

interface SelectChipProps {
  chips: ChipData[];
  handleDeleteChip: (_title: string) => void;
}

function SelectChip({ chips, handleDeleteChip }: SelectChipProps){
  return (
    <>
      {chips.length > 0 && (
        <div className='flex flex-col gap-[1rem] rounded-t-[1rem] px-[2rem] py-[1.1rem] bg-white'>
          <span className='title-sb-12 leading-none'>
            <span className='text-primary-700'>{chips.length} </span>
            <span className='text-black'>/ 10</span>
          </span>
          <div className='flex flex-wrap gap-[0.8rem]'>
            {(chips ?? []).map(chip => (
              <button
                key={chip.title}
                type='button'
                className='h-[3rem] flex items-center rounded-[0.8rem] bg-primary-25 pl-[1.2rem] pr-[0.6rem] py-[0.2rem] leading-[1.5rem]'
                onClick={() => handleDeleteChip(chip.title)}
              >
                <span className='title-sb-12 text-primary-700'>
                  {chip.title}
                </span>
                <Icon name={'ic_close'} color='#F83419' />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export {type ChipData, SelectChip}