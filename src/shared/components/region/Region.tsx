import useRegionSearch from '@shared/components/region/hooks/use-region-search';
import { useDepths } from '@shared/components/region/hooks/use-depths';
import Button from '@ui/button/Button';
import { Icon } from '@icon/Icon';
import Input from '@ui/input/Input';
import SearchSection from '@shared/components/region/components/SearchSection';
import SelectedChipsSheet from '@shared/components/region/components/SelectedChipsSheet';
import DepthSection from '@shared/components/region/components/DepthSection';
import type { RegionResponse } from 'apis/data-contracts';
import useRegion from '@shared/components/region/hooks/use-region';

interface RegionProps {
  initialRegions?: RegionResponse[];
  handleConfirmRegion: (_regions: RegionResponse[]) => void;
}

export default function Region({
  initialRegions,
  handleConfirmRegion,
}: RegionProps) {
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
    selectedRegions,
    handleSelectRegion,
    handleDeleteRegion,
    handleResetRegions,
  } = useRegion({ initialRegions });

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
            selectedRegions={selectedRegions}
            handleSelectRegion={handleSelectRegion}
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
            handleToggleRegion={handleSelectRegion}
            selectedRegions={selectedRegions}
          />
        )}

        {selectedRegions.length > 0 && (
          <SelectedChipsSheet
            selectedRegions={selectedRegions}
            handleDeleteRegion={handleDeleteRegion}
          />
        )}

        <div className='border-grayscale-200 flex gap-[0.7rem] border-t-[0.1rem] px-[2rem] py-[1.7rem]'>
          <div className='border-grayscale-200 flex gap-[0.7rem] border-t-[0.1rem] px-[2rem] py-[1.7rem]'>
            <Button
              variant='cta'
              buttonStyle='sub'
              handleClickButton={handleResetRegions}
            >
              초기화
            </Button>
            <Button
              variant='cta'
              buttonStyle={selectedRegions.length > 0 ? 'active' : 'disabled'}
              handleClickButton={() => handleConfirmRegion(selectedRegions)}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
