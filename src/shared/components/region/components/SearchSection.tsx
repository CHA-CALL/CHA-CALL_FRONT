import { type RegionResponse } from 'apis/data-contracts';

import Loading from '@layout/loading/Loading';

import SearchResultItem from '@shared/components/region/components/(.)section/(.)search/SearchResultItem';

interface SearchSectionProps {
  searchText: string;
  searchRegions: RegionResponse[];
  selectedRegions: RegionResponse[];
  handleSelectRegion: (_item: RegionResponse) => void;
  isPending: boolean;
}

export default function SearchSection({
  searchText,
  searchRegions,
  selectedRegions,
  handleSelectRegion,
  isPending,
}: SearchSectionProps) {
  if (isPending) {
    return <Loading className='h-full w-full' />;
  }

  return (
    <>
      <div className='scrollbar-hide flex w-full flex-1 flex-col overflow-y-auto'>
      <div className='scrollbar-hide flex w-full flex-1 flex-col overflow-y-auto'>
        <ul className='flex flex-col gap-[1.6rem] p-[2rem]'>
          {searchRegions.length > 0 ? (
            searchRegions.map((item: RegionResponse) => (
              <SearchResultItem
                region={item}
                isChecked={selectedRegions.some(r => r.code === item.code)}
                handleSelectRegion={handleSelectRegion}
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
