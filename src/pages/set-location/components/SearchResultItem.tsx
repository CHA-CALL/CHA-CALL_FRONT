import ButtonCheck from '@shared/components/button-check/ButtonCheck';

interface SearchResultItemProps {
  locationName: string;
  isChecked: boolean;
  handleToggle: () => void;
  searchText: string;
}
export default function SearchResultItem({
  locationName,
  isChecked,
  handleToggle,
  searchText,
}: SearchResultItemProps) {
  const searchTextArray = Array.from(searchText);

  return (
    <li className='border-b-1 mx-[0.5rem] flex items-center gap-[1.3rem] border-grayscale-100 pb-[1.6rem] text-grayscale-900 body-m-14'>
      <ButtonCheck isChecked={isChecked} handleToggle={handleToggle} />
      <span>
        {[...locationName].map((char, index) =>
          searchTextArray.includes(char) ? (
            <span key={`${char}-${index}`} className='text-primary-700'>
              {char}
            </span>
          ) : (
            <span key={`${char}-${index}`}>{char}</span>
          )
        )}
      </span>
    </li>
  );
}
