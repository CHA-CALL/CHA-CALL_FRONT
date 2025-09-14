import ButtonCheck from '@shared/components/button-check/ButtonCheck';

interface SearchResultItemProps {
  locationName: string;
  isChecked: boolean;
  handleToggle: () => void;
  searchText: string;
}
export default function SearhResultItem({
  locationName,
  isChecked,
  handleToggle,
  searchText,
}: SearchResultItemProps) {
  const searchTextArray = Array.from(searchText);

  return (
    <div
      className='flex items-center gap-[1.3rem] mx-[0.5rem] pb-[1.6rem] border-b-1 border-grayscale-100
    body-m-14 text-grayscale-900'
    >
      <ButtonCheck isChecked={isChecked} handleToggle={handleToggle} />
      <span>
        {[...locationName].map(char => (
          <>
            {searchTextArray.includes(char) ? (
              <span className='text-primary-700'>{char}</span>
            ) : (
              <span>{char}</span>
            )}
          </>
        ))}
      </span>
    </div>
  );
}
