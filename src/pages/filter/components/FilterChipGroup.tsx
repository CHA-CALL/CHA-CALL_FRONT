import Button from "@shared/components/button/Button";

interface FilterChipGroupProps {
  filterTitle: string;
  selectedOption: string | string[];
  options: string[];
  handleSelectFilter: (_filter: string) => void;
  multiSelectable?: boolean;
}

export default function FilterChipGroup({
  filterTitle,
  selectedOption,
  options,
  handleSelectFilter,
  multiSelectable = false,
}: FilterChipGroupProps) {
  return (
    <div className="mb-[2rem] flex flex-col gap-[1.6rem]">
      {multiSelectable ? (
        <div className="flex flex-row items-center justify-between">
          <h2 className="title-b-14 px-[0.5rem]">{filterTitle}</h2>
          <span className="text-grayscale-500 caption-m-12 px-[0.5rem]">
            * 중복 선택 가능
          </span>
        </div>
      ) : (
        <h2 className="title-b-14 px-[0.5rem]">{filterTitle}</h2>
      )}
      <div className="flex flex-row flex-wrap gap-x-[0.8rem] gap-y-[1rem]">
        {options.map((item) => {
          const isSelected = Array.isArray(selectedOption)
            ? selectedOption.includes(item)
            : selectedOption === item;

          return (
            <Button
              key={item}
              variant="chip"
              buttonStyle={isSelected ? "selected2" : "default"}
              handleClickButton={() => handleSelectFilter(item)}
            >
              {item}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
