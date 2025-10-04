import { useNavigate } from 'react-router-dom';

import Button from '@components/button/Button';
import { Icon } from '@components/icon/Icon';
import Navigation from '@components/navigation/Navigation';
import Input from '@components/input/Input';

import LocationCategoryLabels from '@pages/set-location/components/LocationCategoryLabels';
import SearchResultItem from '@pages/set-location/components/SearchResultItem';
import SelectedChipsSheet from '@pages/set-location/components/SelectedChipsSheet';
import useRegions from '@pages/set-location/hooks/use-regions';
import Depth1Item from '@pages/set-location/components/Depth1Item';
import Depth2Item from '@pages/set-location/components/Depth2Item';
import Depth3Item from '@pages/set-location/components/Depth3Item';

export default function SetLocation() {
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

  const {
    depth1List,
    depth2List,
    locationList,
    searchRegionsList,

    selectedDepth1Code,
    selectedDepth2Code,
    selectedLocations,

    searchText,
    setSearchText,
    handleClearSearchBar,

    handleSelectDepth1,
    handleSelectDepth2,
    handleSelectLocations,
    handleClearLocations,
    handleDeleteLocation,
    handleConfirmLocation,
  } = useRegions();

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
            onChange={e => setSearchText(e.target.value)}
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
        {searchText === '' && <LocationCategoryLabels />}
        <div className='flex w-full flex-1 flex-col overflow-y-auto scrollbar-hide'>
          {searchText !== '' ? (
            <ul className='flex flex-col gap-[1.6rem] p-[2rem]'>
              {searchRegionsList.map(
                searchRegions =>
                  searchRegions.name && (
                    <SearchResultItem
                      key={searchRegions.code}
                      locationName={searchRegions.name}
                      isChecked={
                        searchRegions.code
                          ? selectedLocations.has(searchRegions.code)
                          : false
                      }
                      handleToggle={() => handleSelectLocations(searchRegions)}
                      searchText={searchText}
                    />
                  )
              )}
            </ul>
          ) : (
            <div className='grid flex-1 grid-cols-[106fr_135fr_134fr] grid-rows-[1fr] overflow-hidden'>
              <div className='overflow-auto scrollbar-hide'>
                {depth1List.map(depth1 => (
                  <Depth1Item
                    key={depth1.code}
                    title={depth1.name ?? ''}
                    isSelected={depth1.code === selectedDepth1Code}
                    handleSelectDepth1={() =>
                      depth1.code && handleSelectDepth1(depth1.code)
                    }
                  />
                ))}
              </div>
              <div className='overflow-auto outline-1 outline-grayscale-200 scrollbar-hide'>
                {depth2List.map(depth2 => (
                  <Depth2Item
                    key={depth2.code}
                    title={depth2.name ?? ''}
                    isSelected={depth2.code === selectedDepth2Code}
                    handleSelectDepth2={() =>
                      depth2.code && handleSelectDepth2(depth2.code)
                    }
                  />
                ))}
              </div>
              <div className='overflow-auto scrollbar-hide'>
                {locationList.map(depth3 => (
                  <Depth3Item
                    key={depth3.code}
                    title={depth3.name ?? ''}
                    isSelected={
                      depth3.code ? selectedLocations.has(depth3.code) : false
                    }
                    handleSelectDepth3={() => handleSelectLocations(depth3)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedLocations.size > 0 && (
          <SelectedChipsSheet
            selectedLocations={selectedLocations}
            handleDeleteLocation={handleDeleteLocation}
          />
        )}

        <div className='flex gap-[0.7rem] border-t-[0.1rem] border-grayscale-200 px-[2rem] py-[1.7rem]'>
          <Button
            variant='cta'
            buttonStyle='sub'
            handleClickButton={handleClearLocations}
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
