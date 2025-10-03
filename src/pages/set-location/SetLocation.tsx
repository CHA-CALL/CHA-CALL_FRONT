import { useNavigate } from 'react-router-dom';

import DongEupMeonItem from '@pages/set-location/components/DongEupMeonItem';
import LocationCategoryLabels from '@pages/set-location/components/LocationCategoryLabels';
import SearchResultItem from '@pages/set-location/components/SearchResultItem';
import SelectedChipsSheet from '@pages/set-location/components/SelectedChipsSheet';
import SiDoItem from '@pages/set-location/components/SiDoItem';
import SiGunGuItem from '@pages/set-location/components/SiGunGuItem';
import { useLocationsFilter } from '@pages/set-location/hooks/use-locations-filter';
import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import Input from '@shared/components/input/Input';

export default function SetLocation() {
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

  const {
    siDoList,
    siGunGuList,
    locationList,
    searchRegionsList,

    selectedSiDoId,
    selectedSiGunGuId,
    selectedLocations,

    searchText,
    setSearchText,
    handleClearSearchBar,

    handleSelectSiDo,
    handleSelectSiGunGu,
    handleToggleLocation,
    handleClearLocations,
    handleDeleteLocation,
    handleConfirmLocation,
  } = useLocationsFilter();

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
                      handleToggle={() => handleToggleLocation(searchRegions)}
                      searchText={searchText}
                    />
                  )
              )}
            </ul>
          ) : (
            <div className='grid flex-1 grid-cols-[106fr_135fr_134fr] grid-rows-[1fr] overflow-hidden'>
              <div className='overflow-auto scrollbar-hide'>
                {siDoList.map(
                  siDo =>
                    siDo.name && (
                      <SiDoItem
                        key={siDo.code}
                        title={siDo.name}
                        isSelected={siDo.code === selectedSiDoId}
                        handleSelectSiDo={() =>
                          siDo.code && handleSelectSiDo(siDo.code)
                        }
                      />
                    )
                )}
              </div>
              <div className='overflow-auto outline-1 outline-grayscale-200 scrollbar-hide'>
                {siGunGuList.map(
                  siGunGu =>
                    siGunGu.name && (
                      <SiGunGuItem
                        key={siGunGu.code}
                        title={siGunGu.name}
                        isSelected={siGunGu.code === selectedSiGunGuId}
                        handleSelectSiGunGu={() =>
                          siGunGu.code && handleSelectSiGunGu(siGunGu.code)
                        }
                      />
                    )
                )}
              </div>
              <div className='overflow-auto scrollbar-hide'>
                {locationList.map(
                  dongEupMeon =>
                    dongEupMeon.name && (
                      <DongEupMeonItem
                        key={dongEupMeon.code}
                        title={dongEupMeon.name}
                        isSelected={
                          dongEupMeon.code
                            ? selectedLocations.has(dongEupMeon.code)
                            : false
                        }
                        handleSelectDongEupMeon={() =>
                          handleToggleLocation(dongEupMeon)
                        }
                      />
                    )
                )}
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
