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
  const [selectedLocationIds, setSelectedLocationIds] = useState<Set<string>>(
    new Set()
  );
  const getSelectedLocations = () => {
    return locationList.filter(location =>
      selectedLocationIds.has(location.id)
    );
  };
  const [searchText, setSearchText] = useState('');
  const handleClearSearchBar = () => setSearchText('');

  const handleSelectSiDo = (sidoId: string) => {
    setSelectedSidoId(sidoId);
    setSiGunGuList(getRegionsDepth2_Parent11.regions);
  };
  const handleSelectSiGunGu = (sigunguId: string) => {
    setSelectedSiGunGuId(sigunguId);
    setLocationList(getRegionsDepth3_Parent11680.regions);
  };

  const handleToggleLocation = (locaiton: Region) => {
    // TODO: API 확정 시 '~전체' 장소의 경우 다른 장소는 선택 해제되도록 처리.
    setSelectedLocationIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(locaiton.id)) {
        newSet.delete(locaiton.id);
        return newSet;
      }
      // TODO: 추후 toast등으로 더 선택할 수 없음을 안내.
      if (newSet.size >= MAX_SELECTED) return newSet;
      newSet.add(locaiton.id);
      return newSet;
    });
  };

  const handleClearLocations = () => {
    setSelectedLocationIds(new Set());
  };

  const handleDeleteLocation = (locaiton: Region) => {
    setSelectedLocationIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(locaiton.id);
      return newSet;
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
    selectedLocationIds,
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
