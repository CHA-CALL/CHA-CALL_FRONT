import { type RegionResponse } from 'apis/data-contracts';

import Loading from '@layout/loading/Loading';

import SearchResultItem from '@components/location/components/(.)section/(.)search/SearchResultItem';

interface SearchSectionProps {
  searchText: string;
  searchRegions: RegionResponse[];
  selectedLocations: Map<number, RegionResponse>;
  handleSelectLocation: (_item: RegionResponse) => void;
  isPending: boolean;
}

export default function SearchSection({
  searchText,
  searchRegions,
  selectedLocations,
  handleSelectLocation,
  isPending,
}: SearchSectionProps) {
  if (isPending) {
    return <Loading className='h-full w-full' />;
  }

  return (
    <>
      <div className='scrollbar-hide flex w-full flex-1 flex-col overflow-y-auto'>
        <ul className='flex flex-col gap-[1.6rem] p-[2rem]'>
          {searchRegions.length > 0 ? (
            searchRegions.map((item: RegionResponse) => (
              <SearchResultItem
                location={item}
                isChecked={selectedLocations.has(item.code ?? 0)}
                handleSelectLocation={handleSelectLocation}
                searchText={searchText}
                key={item.code}
              />
            ))
          ) : (
            <div className='flex items-center justify-center'>
              <p className='text-grayscale-900 caption-m-12'>
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
