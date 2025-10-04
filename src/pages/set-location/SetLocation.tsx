import Depth1Item from '@pages/set-location/components/Depth1Item';
import Depth2Item from '@pages/set-location/components/Depth2Item';
import Depth3Item from '@pages/set-location/components/Depth3Item';
import LocationCategoryLabels from '@pages/set-location/components/LocationCategoryLabels';
import SearchResultItem from '@pages/set-location/components/SearchResultItem';
import SelectedChipsSheet from '@pages/set-location/components/SelectedChipsSheet';

import { useLocations } from '@pages/set-location/hooks/use-locations';
import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import Input from '@shared/components/input/Input';
import { useNavigate } from 'react-router-dom';
import { type RegionResponse } from '@../../apis/data-contracts';

export default function SetLocation() {
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);

  const {
    depth1List,
    depth2List,
    depth3List,
    selectedDepth1Id,
    selectedDepth2Id,
    selectedLocations,
    searchText,
    setSearchText,
    handleClearSearchBar,
    handleSelectDepth1,
    handleSelectDepth2,
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
        <div className='scrollbar-hide flex w-full flex-1 flex-col overflow-y-auto'>
          {searchText !== '' ? (
            <ul className='flex flex-col gap-[1.6rem] p-[2rem]'>
              {/* TODO: 장소 검색 API 확정되면 개선 */}
              {(depth3List?.data ?? []).map((item: RegionResponse) => (
                <SearchResultItem
                  locationName={item.name ?? ''}
                  isChecked={selectedLocations.has(item.code ?? 0)}
                  handleToggle={() => handleToggleLocation(item)}
                  searchText={searchText}
                  key={item.code}
                />
              ))}
            </ul>
          ) : (
            <div className='grid flex-1 grid-cols-[106fr_135fr_134fr] grid-rows-[1fr] overflow-hidden'>
              <div className='scrollbar-hide overflow-auto'>
                {depth1List?.data?.map((item: RegionResponse) => (
                  <Depth1Item
                    title={item.name ?? ''}
                    isSelected={item.code === Number(selectedDepth1Id)}
                    handleSelectDepth1={() =>
                      handleSelectDepth1(item.code ?? 0)
                    }
                    key={item.code}
                  />
                )) || <div>데이터를 불러오는 중...</div>}
              </div>
              <div className='outline-grayscale-200 scrollbar-hide overflow-auto outline-1'>
                {depth2List?.data?.map((item: RegionResponse) => (
                  <Depth2Item
                    title={item.name ?? ''}
                    isSelected={item.code === Number(selectedDepth2Id)}
                    handleSelectDepth2={() =>
                      handleSelectDepth2(item.code ?? 0)
                    }
                    key={item.code}
                  />
                ))}
              </div>
              <div className='scrollbar-hide overflow-auto'>
                {depth3List?.data?.map((item: RegionResponse) => (
                  <Depth3Item
                    title={item.name ?? ''}
                    isSelected={selectedLocations.has(item.code ?? 0)}
                    handleSelectDepth3={() => handleToggleLocation(item)}
                    key={item.code}
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

        <div className='border-grayscale-200 flex gap-[0.7rem] border-t-[0.1rem] px-[2rem] py-[1.7rem]'>
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
