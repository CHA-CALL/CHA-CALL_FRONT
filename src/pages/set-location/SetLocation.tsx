import DongEupMeonItem from '@pages/set-location/components/DongEupMeonItem';
import SearhResultItem from '@pages/set-location/components/SearhResultItem';
import SiDoItem from '@pages/set-location/components/SiDoItem';
import SiGunGuItem from '@pages/set-location/components/SiGunGuItem';
import {
  cityListMockup,
  MAX_SELECTED,
  neighborhoodListMockup,
  provinceListMockup,
  searchedListMockup,
} from '@pages/set-location/constant/set-loacation';
import Button from '@shared/components/button/Button';
import { Icon } from '@shared/components/icon/Icon';
import Navigation from '@shared/components/navigation/Navigation';
import SearchBar from '@shared/components/search-bar/SearchBar';
import SelectChip from '@shared/components/select-chip/SelectChip';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationCategoryLabels from './components/LocationCategoryLabels';

export default function SetLocation() {
  const navigate = useNavigate();
  const [selectedSiDo, setSelectedSido] = useState<string>();
  const [selectedSiGunGu, setSelectedSiGunGu] = useState<string>();
  /** 동,읍,면에 해당 */
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const handleClickBack = () => navigate(-1);
  const handleClearSearchBar = () => setSearchText('');

  const handleSelectSiDo = (sido: string) => {
    setSelectedSido(sido);
  };
  const handleSelectSiGunGu = (sigungu: string) => {
    setSelectedSiGunGu(sigungu);
  };

  const handleAddLocation = (locaitonName: string) => {
    setSelectedLocations(prev => {
      if (prev.includes(locaitonName))
        return prev.filter(chip => chip !== locaitonName);
      return [...prev, locaitonName];
    });
  };
  const handleClearLocations = () => {
    setSelectedLocations([]);
  };
  const handleDeleteLocation = (locaitonName: string) => {
    setSelectedLocations(prev => prev.filter(chip => chip !== locaitonName));
  };
  const handleConfirmLoatcion = () => {};
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
      <div className='flex flex-col flex-1 w-full overflow-y-scroll'>
        {searchText !== '' ? (
          <div className='flex flex-col gap-[1.6rem] p-[2rem]'>
            {(searchedListMockup ?? []).map(item => (
              <SearhResultItem
                locationName={item}
                isChecked={selectedLocations.includes(item)}
                handleToggle={() => handleAddLocation(item)}
                searchText={searchText}
              />
            ))}
          </div>
        ) : (
          <div>
            <div className='flex'>
              <div className='flex flex-col basis-0 grow-[106] min-w-0 '>
                {provinceListMockup.map(item => (
                  <SiDoItem
                    title={item}
                    isSelected={item === selectedSiDo}
                    handleSelectSiDo={() => handleSelectSiDo(item)}
                    key={item}
                  />
                ))}
              </div>
              <div className='flex flex-col basis-0 grow-[135] min-w-0'>
                {cityListMockup.map(item => (
                  <SiGunGuItem
                    title={item}
                    isSelected={item === selectedSiGunGu}
                    handleSelectSiGunGu={() => handleSelectSiGunGu(item)}
                    key={item}
                  />
                ))}
              </div>
              <div className='flex flex-col basis-0 grow-[134] min-w-0'>
                {neighborhoodListMockup.map(item => (
                  <DongEupMeonItem
                    title={item}
                    isSelected={selectedLocations.includes(item)}
                    handleSelectDongEupMeon={() => handleAddLocation(item)}
                    key={item}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedLocations.length > 0 && (
        <div className='flex flex-col gap-[1rem] rounded-t-[1rem] px-[2rem] py-[1.1rem] bg-white shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.04)]'>
          <span className='title-sb-12 leading-none'>
            <span className='text-primary-700'>
              {selectedLocations.length}{' '}
            </span>
            <span className='text-black'>/ {MAX_SELECTED}</span>
          </span>
          <div className='flex flex-wrap gap-[0.8rem]'>
            {[...selectedLocations].map(chip => (
              <SelectChip
                title={chip}
                handleDeleteChip={() => handleDeleteLocation(chip)}
              />
            ))}
          </div>
        </div>
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
          buttonStyle={selectedLocations.length > 0 ? 'active' : 'disabled'}
          handleClickButton={handleConfirmLoatcion}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
