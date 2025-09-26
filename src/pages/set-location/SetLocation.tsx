import DongEupMeonItem from '@pages/set-location/components/DongEupMeonItem';
import LocationCategoryLabels from '@pages/set-location/components/LocationCategoryLabels';
import SearchResultItem from '@pages/set-location/components/SearchResultItem';
import SelectedChipsSheet from '@pages/set-location/components/SelectedChipsSheet';
import SiDoItem from '@pages/set-location/components/SiDoItem';
import SiGunGuItem from '@pages/set-location/components/SiGunGuItem';
import { getSearchedRegionsResponse } from '@pages/set-location/constant/mocks';
import { useLocations } from '@pages/set-location/hooks/use-locations';
import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import Input from '@shared/components/input/Input';
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
  } = useLocations();

  return (
    <>
      <Navigation
        text='위치설정'
        leftIcon={<Icon name='ic_back' />}
        handleLeftClick={handleClickBack}
      />
      <div className='flex h-screen flex-col'>
        <div className='px-[2rem] pb-[0.8rem] pt-[6.4rem]'>
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
              {/* TODO: 장소 검색 API 확정되면 개선 */}
              {(getSearchedRegionsResponse.results ?? []).map(item => (
                <SearchResultItem
                  locationName={item.name}
                  isChecked={selectedLocations.has(item.id)}
                  handleToggle={() => handleToggleLocation(item)}
                  searchText={searchText}
                />
              ))}
            </ul>
          ) : (
            <div className='grid flex-1 grid-cols-[106fr_135fr_134fr] grid-rows-[1fr] overflow-hidden'>
              <div className='overflow-auto scrollbar-hide'>
                {siDoList.map(item => (
                  <SiDoItem
                    title={item.name}
                    isSelected={item.id === selectedSiDoId}
                    handleSelectSiDo={() => handleSelectSiDo(item.id)}
                    key={item.name}
                  />
                ))}
              </div>
              <div className='overflow-auto outline-1 outline-grayscale-200 scrollbar-hide'>
                {siGunGuList.map(item => (
                  <SiGunGuItem
                    title={item.name}
                    isSelected={item.id === selectedSiGunGuId}
                    handleSelectSiGunGu={() => handleSelectSiGunGu(item.id)}
                    key={item.name}
                  />
                ))}
              </div>
              <div className='overflow-auto scrollbar-hide'>
                {locationList.map(item => (
                  <DongEupMeonItem
                    title={item.name}
                    isSelected={selectedLocations.has(item.id)}
                    handleSelectDongEupMeon={() => handleToggleLocation(item)}
                    key={item.name}
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

        <div className='border-t-1 flex gap-[0.7rem] border-grayscale-200 px-[2rem] py-[1.7rem]'>
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
