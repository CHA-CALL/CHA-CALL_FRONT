import ButtonCheck from '@ui/button-check/ButtonCheck';
import { cn } from '@utils/cn';
import { type RegionResponse } from 'apis/data-contracts';

interface SearchResultItemProps {
  region: RegionResponse;
  isChecked: boolean;
  handleSelectRegion: (_item: RegionResponse) => void;
  searchText: string;
}

const highlightText = (text: string, searchText: string) => {
  if (!searchText.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${searchText})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === searchText.toLowerCase();
        return (
          <span
            key={index}
            className={cn(isMatch && 'text-primary-500 font-semibold')}
          >
            {part}
          </span>
        );
      })}
    </span>
  );
};

export default function SearchResultItem({
  region,
  isChecked,
  handleSelectRegion,
  searchText,
}: SearchResultItemProps) {
  return (
    <li className='border-b-1 border-grayscale-100 body-m-14 text-grayscale-900 mx-[0.5rem] flex items-center gap-[1.3rem] pb-[1.6rem]'>
      <ButtonCheck
        isChecked={isChecked}
        handleToggle={() => handleSelectRegion(region)}
      />
      <span>{highlightText(region.name ?? '', searchText)}</span>
    </li>
  );
}
