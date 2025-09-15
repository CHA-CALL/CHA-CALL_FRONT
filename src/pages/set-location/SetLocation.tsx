import DongEupMeonItem from '@pages/set-location/components/DongEupMeonItem';
import LocationCategoryLabels from '@pages/set-location/components/LocationCategoryLabels';
import SearhResultItem from '@pages/set-location/components/SearhResultItem';
import SelectedChipsSheet from '@pages/set-location/components/SelectedChipsSheet';
import SiDoItem from '@pages/set-location/components/SiDoItem';
import SiGunGuItem from '@pages/set-location/components/SiGunGuItem';
import { getSearchedRegionsResponse } from '@pages/set-location/constant/mocks';
import { useLocations } from '@pages/set-location/hooks/use-locations';
import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import SearchBar from '@shared/components/search-bar/SearchBar';
import { useNavigate } from 'react-router-dom';

export default function SetLocation() {
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

  const {
    siDoList,
    siGunGuList,
    locationList,
    selectedSiDoId,
    selectedSiGunGuId,
    selectedLocationsId,
    searchText,
    setSearchText,
    handleClearSearchBar,
    handleSelectSiDo,
    handleSelectSiGunGu,
    handleToogleLocation,
    handleClearLocations,
    handleDeleteLocation,
    handleConfirmLoatcion,
  } = useLocations();

  return (
    <div className='flex flex-col h-screen'>
      <Navigation
        text='위치설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='px-[2rem] pt-[1.6rem] pb-[0.8rem]'>
        <SearchBar
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
      <div className='flex flex-col flex-1 w-full overflow-y-scroll scrollbar-hide'>
        {searchText !== '' ? (
          <div className='flex flex-col gap-[1.6rem] p-[2rem]'>
            {(getSearchedRegionsResponse.results ?? []).map(item => (
              <SearhResultItem
                locationName={item.name}
                isChecked={selectedLocationsId.has(item)}
                handleToggle={() => handleToogleLocation(item)}
                searchText={searchText}
              />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-[106fr_135fr_134fr]'>
            <div className='flex flex-col'>
              {siDoList.map(item => (
                <SiDoItem
                  title={item.name}
                  isSelected={item.id === selectedSiDoId}
                  handleSelectSiDo={() => handleSelectSiDo(item.id)}
                  key={item.name}
                />
              ))}
            </div>
            <div className='flex flex-col'>
              {siGunGuList.map(item => (
                <SiGunGuItem
                  title={item.name}
                  isSelected={item.id === selectedSiGunGuId}
                  handleSelectSiGunGu={() => handleSelectSiGunGu(item.id)}
                  key={item.name}
                />
              ))}
            </div>
            <div className='flex flex-col'>
              {locationList.map(item => (
                <DongEupMeonItem
                  title={item.name}
                  isSelected={selectedLocationsId.has(item)}
                  handleSelectDongEupMeon={() => handleToogleLocation(item)}
                  key={item.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedLocationsId.size > 0 && (
        <SelectedChipsSheet
          selectedLocationsId={selectedLocationsId}
          handleDeleteLocation={handleDeleteLocation}
        />
      )}

      <div className='flex gap-[0.7rem] py-[1.7rem] px-[2rem] border-t-1 border-grayscale-200'>
        <Button
          variant='cta'
          buttonStyle='sub'
          handleClickButton={handleClearLocations}
        >
          초기화
        </Button>
        <Button
          variant='cta'
          buttonStyle={selectedLocationsId.size > 0 ? 'active' : 'disabled'}
          handleClickButton={handleConfirmLoatcion}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
