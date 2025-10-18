import Button from '@shared/components/button/Button';

interface FilterChipGroupProps<T extends string> {
  filterTitle: string;
  selectedOption: T | T[];
  options: Record<string, T>;
  handleSelectFilter: (_filter: T) => void;
  multiSelectable?: boolean;
}
export default function FilterChipGroup<T extends string>({
  filterTitle,
  selectedOption,
  options,
  handleSelectFilter,
  multiSelectable = false,
}: FilterChipGroupProps<T>) {
  return (
    <div className='mb-[2rem] flex flex-col gap-[1.6rem]'>
      {multiSelectable ? (
        <div className='flex flex-row items-center justify-between'>
          <h2 className='px-[0.5rem] title-b-14'>{filterTitle}</h2>
          <span className='px-[0.5rem] text-grayscale-500 caption-m-12'>
            * 중복 선택 가능
          </span>
        </div>
      ) : (
        <h2 className='px-[0.5rem] title-b-14'>{filterTitle}</h2>
      )}
      <div className='flex flex-row flex-wrap gap-x-[0.8rem] gap-y-[1rem]'>
        {Object.entries(options).map(([key, label]) => {
          const isSelected = Array.isArray(selectedOption)
            ? selectedOption.includes(key as T)
            : selectedOption === key;

          return (
            <Button
              key={key}
              variant='chip'
              buttonStyle={isSelected ? 'selected2' : 'default'}
              handleClickButton={() => handleSelectFilter(key as T)}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
