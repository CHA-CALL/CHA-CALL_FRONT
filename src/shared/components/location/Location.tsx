import useLocation from '@components/location/hooks/use-location';

import useRegionSearch from '@components/location/hooks/use-region-search';
import { useDepths } from '@components/location/hooks/use-depths';
import Button from '@ui/button/Button';
import { Icon } from '@icon/Icon';
import Input from '@ui/input/Input';

import SearchSection from '@components/location/components/SearchSection';
import SelectedChipsSheet from '@components/location/components/SelectedChipsSheet';
import DepthSection from '@components/location/components/DepthSection';
import type { RegionResponse } from 'apis/data-contracts';

interface LocationProps {
  initialLocations?: Map<number, RegionResponse>;
  handleConfirmLocation: (locations: Map<number, RegionResponse>) => void;
}

export default function Location({
  initialLocations,
  handleConfirmLocation,
}: LocationProps) {
  const {
    searchText,
    handleSetSearchText,
    handleClearSearchBar,
    searchRegions,
    isPending,
  } = useRegionSearch();

  const {
    depth1,
    depth2,
    handleSelectDepth1,
    handleSelectDepth2,
    depth1List,
    depth2List,
    depth3List,
  } = useDepths();

  const {
    selectedLocations,
    handleSelectLocation,
    handleDeleteLocation,
    handleResetLocations,
  } = useLocation({ initialLocations });

  return (
    <>
      <div className='flex h-[calc(100vh-4.8rem)] flex-col'>
        <div className='px-[2rem] pb-[0.8rem] pt-[1.6rem]'>
          <Input
            placeholder='검색어를 입력해주세요.'
            value={searchText}
            onChange={e => handleSetSearchText(e.target.value)}
            rightComponent={
              searchText === '' ? (
                <Icon name='ic_search' />
              ) : (
                <button onClick={handleClearSearchBar}>
                  <Icon name='ic_close' />
                </button>
              )
            }
          />
        </div>
        {searchText && (
          <SearchSection
            searchText={searchText}
            searchRegions={searchRegions?.data ?? []}
            selectedLocations={selectedLocations}
            handleSelectLocation={handleSelectLocation}
            isPending={isPending}
          />
        )}
        {!searchText && (
          <DepthSection
            depth1={depth1}
            depth2={depth2}
            handleSelectDepth1={handleSelectDepth1}
            handleSelectDepth2={handleSelectDepth2}
            depth1List={depth1List}
            depth2List={depth2List}
            depth3List={depth3List}
            handleToggleLocation={handleSelectLocation}
            selectedLocations={selectedLocations}
          />
        )}

        {selectedLocations.size > 0 && (
          <SelectedChipsSheet
            selectedLocations={selectedLocations}
            handleDeleteLocation={handleDeleteLocation}
          />
        )}

        <div className='border-grayscale-200 flex gap-[0.7rem] border-t-[0.1rem] px-[2rem] py-[1.7rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleResetLocations}
          >
            초기화
          </Button>
          <Button
            variant='cta'
            buttonStyle={selectedLocations.size > 0 ? 'active' : 'disabled'}
            handleClickButton={() => handleConfirmLocation(selectedLocations)}
          >
            확인
          </Button>
        </div>
      </div>
    </>
  );
}
