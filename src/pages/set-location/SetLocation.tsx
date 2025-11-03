import { useNavigate } from 'react-router-dom';
import useLocation from '@pages/set-location/hooks/use-location';
import useRegionSearch from '@pages/set-location/hooks/use-region-search';
import { useDepths } from '@pages/set-location/hooks/use-depths';
import Button from '@components/button/Button';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Input from '@components/input/Input';
import SearchSection from '@pages/set-location/components/SearchSection';
import SelectedChipsSheet from '@pages/set-location/components/SelectedChipsSheet';
import DepthSection from '@pages/set-location/components/DepthSection';

export default function SetLocation() {
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

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
    handleConfirmLocation,
    handleResetLocations,
  } = useLocation();

  return (
    <>
      <Navigation
        text='위치설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
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
            handleClickButton={handleConfirmLocation}
          >
            확인
          </Button>
        </div>
      </div>
    </>
  );
}
