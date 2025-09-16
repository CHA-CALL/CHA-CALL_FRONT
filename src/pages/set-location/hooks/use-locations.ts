import {
  type Region,
  getRegionsDepth1,
  getRegionsDepth2_Parent11,
  getRegionsDepth3_Parent11680,
} from '@pages/set-location/constant/mocks';
import { MAX_SELECTED } from '@pages/set-location/constant/set-location';
import { useEffect, useState } from 'react';

export const useLocations = () => {
  const [siDoList, setSiDoList] = useState<Region[]>([]);
  const [siGunGuList, setSiGunGuList] = useState<Region[]>([]);
  const [locationList, setLocationList] = useState<Region[]>([]);

  const [selectedSiDoId, setSelectedSidoId] = useState<string>();
  const [selectedSiGunGuId, setSelectedSiGunGuId] = useState<string>();
  /** 동,읍,면에 해당 */
  const [selectedLocations, setSelectedLocations] = useState<
    Map<string, Region>
  >(new Map());
  const getSelectedLocations = () => {
    return locationList.filter(location => selectedLocations.has(location.id));
  };
  const [searchText, setSearchText] = useState('');
  const handleClearSearchBar = () => setSearchText('');

  const clearCategory = (depth: string) => {
    if (depth === 'depth1') {
      setSelectedSidoId(undefined);
      setSelectedSiGunGuId(undefined);
      setSiGunGuList([]);
      setLocationList([]);
    }
    if (depth === 'depth2') {
      setSelectedSiGunGuId(undefined);
      setLocationList([]);
    }
  };

  const handleSelectSiDo = (sidoId: string) => {
    if (selectedSiDoId === sidoId) {
      clearCategory('depth1');
      return;
    }
    setSelectedSidoId(sidoId);
    // TODO : 추후 depth2 지역 요청 API로 교체;
    setSiGunGuList(getRegionsDepth2_Parent11.regions);
  };
  const handleSelectSiGunGu = (sigunguId: string) => {
    if (selectedSiGunGuId === sigunguId) {
      clearCategory('depth2');
      return;
    }
    setSelectedSiGunGuId(sigunguId);
    // TODO : 추후 depth3 지역 요청 API로 교체;
    setLocationList(getRegionsDepth3_Parent11680.regions);
  };

  const handleToggleLocation = (locaiton: Region) => {
    // TODO: API 확정 시 '~전체' 장소의 경우 다른 장소는 선택 해제되도록 처리.
    setSelectedLocations(prev => {
      const newMap = new Map(prev);
      if (newMap.has(locaiton.id)) {
        newMap.delete(locaiton.id);
        return newMap;
      }
      // TODO: 추후 toast등으로 더 선택할 수 없음을 안내.
      if (newMap.size >= MAX_SELECTED) return newMap;
      newMap.set(locaiton.id, locaiton);
      return newMap;
    });
  };

  const handleClearLocations = () => {
    setSelectedLocations(new Map());
    setSelectedSidoId(undefined);
    setSelectedSiGunGuId(undefined);
    setSiGunGuList([]);
    setLocationList([]);
  };

  const handleDeleteLocation = (locaiton: Region) => {
    setSelectedLocations(prev => {
      const newMap = new Map(prev);
      newMap.delete(locaiton.id);
      return newMap;
    });
  };

  const handleConfirmLocation = () => {};

  useEffect(() => {
    setSiDoList(getRegionsDepth1.regions);
  }, []);

  return {
    siDoList,
    siGunGuList,
    locationList,
    selectedSiDoId,
    selectedSiGunGuId,
    selectedLocations,
    searchText,
    setSearchText,
    getSelectedLocations,
    handleClearSearchBar,
    handleSelectSiDo,
    handleSelectSiGunGu,
    handleToggleLocation,
    handleClearLocations,
    handleDeleteLocation,
    handleConfirmLocation,
  };
};
