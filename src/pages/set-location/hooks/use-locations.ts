import {
  type Region,
  getRegionsDepth1,
  getRegionsDepth2_Parent11,
  getRegionsDepth3_Parent11680,
} from '@pages/set-location/constant/mocks';
import { useEffect, useState } from 'react';

export const useLocations = () => {
  const [siDoList, setSiDoList] = useState<Region[]>([]);
  const [siGunGuList, setSiGunGuList] = useState<Region[]>([]);
  const [locationList, setLocationList] = useState<Region[]>([]);

  const [selectedSiDoId, setSelectedSidoId] = useState<string>();
  const [selectedSiGunGuId, setSelectedSiGunGuId] = useState<string>();
  /** 동,읍,면에 해당 */
  const [selectedLocationsId, setSelectedLocationsId] = useState<Set<Region>>(
    new Set()
  );
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

  const handleToogleLocation = (locaiton: Region) => {
    setSelectedLocationsId(prev => {
      const newSet = new Set(prev);
      if (newSet.has(locaiton)) {
        newSet.delete(locaiton);
        return newSet;
      }
      newSet.add(locaiton);
      return newSet;
    });
  };

  const handleClearLocations = () => {
    setSelectedLocationsId(new Set());
  };

  const handleDeleteLocation = (locaiton: Region) => {
    setSelectedLocationsId(prev => {
      const newSet = new Set(prev);
      newSet.delete(locaiton);
      return newSet;
    });
  };
  const handleConfirmLoatcion = () => {};

  useEffect(() => {
    setSiDoList(getRegionsDepth1.regions);
  }, []);

  return {
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
  };
};
