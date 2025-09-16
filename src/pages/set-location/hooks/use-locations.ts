import {
  type Region,
  getRegionsDepth1,
  getRegionsDepth2_Parent11,
  getRegionsDepth3_Parent11680,
} from '@pages/set-location/constant/mocks';
import {
  MAX_SELECTED,
  SELECT_ALL_ID_LENGTH,
} from '@pages/set-location/constant/set-location';
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

  const handleToggleLocation = (location: Region) => {
    setSelectedLocations(prev => {
      const newMap = new Map(prev);
      const allMap = [...prev].filter(
        ([key]) => key.length === SELECT_ALL_ID_LENGTH
      );
      if (newMap.has(location.id)) {
        newMap.delete(location.id);
        return newMap;
      }
      /** 전체 지역 버튼을 누른 경우 */
      if (location.id.length === SELECT_ALL_ID_LENGTH) {
        const filteredMap = new Map(
          [...prev].filter(([key]) => !key.startsWith(location.id))
        );
        filteredMap.set(location.id, location);
        return filteredMap;
      }
      /** 이미 5개 길이의 id를 갖고 있을 때, 일반 지역이 선택된 경우.
      일반 지역의 앞 5개 길이와 비교하여 일치하는 id를 제거.*/
      if (allMap.length > 0) {
        const filteredMap = new Map(
          [...allMap].filter(([key]) => !location.id.startsWith(key))
        );
        filteredMap.set(location.id, location);
        return filteredMap;
      }
      if (newMap.size >= MAX_SELECTED)
        // TODO: 추후 toast등으로 더 선택할 수 없음을 안내.
        return newMap;
      newMap.set(location.id, location);
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

  const handleDeleteLocation = (location: Region) => {
    setSelectedLocations(prev => {
      const newMap = new Map(prev);
      newMap.delete(location.id);
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
