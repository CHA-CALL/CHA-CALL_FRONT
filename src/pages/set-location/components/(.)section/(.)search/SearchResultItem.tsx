import ButtonCheck from '@shared/components/button-check/ButtonCheck';
import { cn } from '@shared/utils/cn';
import { type RegionResponse } from '@../../apis/data-contracts';

interface SearchResultItemProps {
  location: RegionResponse;
  isChecked: boolean;
  handleSelectLocation: (_item: RegionResponse) => void;
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
        const isMatch = regex.test(part);
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
  location,
  isChecked,
  handleSelectLocation,
  searchText,
}: SearchResultItemProps) {
  const getSaveName = (name: string) => {
    const splitName = name.split(' ');
    if (splitName[splitName.length - 1] === '전체') {
      return splitName.slice(1).join(' ');
    } else {
      return splitName[splitName.length - 1];
    }
  };

  const saveName = getSaveName(location.name ?? '');

  return (
    <li className='border-b-1 border-grayscale-100 body-m-14 text-grayscale-900 mx-[0.5rem] flex items-center gap-[1.3rem] pb-[1.6rem]'>
      <ButtonCheck
        isChecked={isChecked}
        handleToggle={() =>
          handleSelectLocation({ name: saveName, code: location.code })
        }
      />
      <span>{highlightText(location.name ?? '', searchText)}</span>
    </li>
  );
}
