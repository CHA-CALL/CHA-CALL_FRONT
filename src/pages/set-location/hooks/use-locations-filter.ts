import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { RegionResponse } from '@/../apis/data-contracts';
import {
  MAX_SELECTED,
  SELECT_ALL_ID_LENGTH,
} from '@pages/set-location/constant/set-location';
import { getRegionsData, searchRegionsData } from '@pages/set-location/api';
import { SET_LOCATIONS_KEYS } from '@shared/querykey/food-trucks/set-locations';

export const useLocationsFilter = () => {
  const [selectedSiDoId, setSelectedSidoId] = useState<number>();
  const [selectedSiGunGuId, setSelectedSiGunGuId] = useState<number>();
  const [selectedLocations, setSelectedLocations] = useState<
    Map<number, RegionResponse>
  >(new Map());

  const [searchText, setSearchText] = useState('');

  const { data: siDoList = [], isLoading: isLoadingSiDo } = useQuery({
    queryKey: [SET_LOCATIONS_KEYS.DEPTH(1)],
    queryFn: () => getRegionsData({ depth: 1 }),
  });

  const { data: siGunGuList = [], isLoading: isLoadingSiGunGu } = useQuery({
    queryKey: [SET_LOCATIONS_KEYS.DEPTH_ID(2, selectedSiDoId)],
    queryFn: () =>
      selectedSiDoId
        ? getRegionsData({ depth: 2, parentCode: selectedSiDoId })
        : Promise.resolve([]),
    enabled: !!selectedSiDoId,
  });

  const { data: locationList = [], isLoading: isLoadingLocation } = useQuery({
    queryKey: [SET_LOCATIONS_KEYS.DEPTH_ID(3, selectedSiGunGuId)],
    queryFn: () =>
      selectedSiGunGuId
        ? getRegionsData({ depth: 3, parentCode: selectedSiGunGuId })
        : Promise.resolve([]),
    enabled: !!selectedSiGunGuId,
  });

  const { data: searchRegionsList = [], isLoading: isLoadingSearch } = useQuery(
    {
      queryKey: ['regions-search', searchText],
      queryFn: () => searchRegionsData({ keyword: searchText }),
      enabled: !!searchText,
    }
  );

  const handleClearSearchBar = () => setSearchText('');

  const handleSelectSiDo = (sidoId: number) => {
    if (selectedSiDoId === sidoId) {
      setSelectedSidoId(undefined);
      setSelectedSiGunGuId(undefined);
      return;
    }
    setSelectedSidoId(sidoId);
    setSelectedSiGunGuId(undefined);
  };

  const handleSelectSiGunGu = (sigunguId: number) => {
    if (selectedSiGunGuId === sigunguId) {
      setSelectedSiGunGuId(undefined);
      return;
    }
    setSelectedSiGunGuId(sigunguId);
  };

  const handleToggleLocation = (location: RegionResponse) => {
    if (!location.code) return;
    setSelectedLocations(prev => {
      const clickedCode = location.code!;
      const newMap = new Map(prev);

      if (newMap.has(clickedCode)) {
        newMap.delete(clickedCode);
        return newMap;
      }

      const isAllButton = String(clickedCode).length === SELECT_ALL_ID_LENGTH;
      if (isAllButton) {
        for (const key of newMap.keys()) {
          if (
            String(key).startsWith(String(clickedCode)) &&
            String(key).length > String(clickedCode).length
          ) {
            newMap.delete(key);
          }
        }
        newMap.set(clickedCode, location);
        return newMap;
      }

      const parentKey = [...newMap.keys()].find(
        key =>
          String(clickedCode).startsWith(String(key)) &&
          String(key).length === SELECT_ALL_ID_LENGTH
      );
      if (parentKey) {
        newMap.delete(parentKey);
      }

      if (newMap.size >= MAX_SELECTED) {
        // TODO: toast 처리
        return newMap;
      }

      newMap.set(clickedCode, location);
      return newMap;
    });
  };

  const handleClearLocations = () => {
    setSelectedLocations(new Map());
    setSelectedSidoId(undefined);
    setSelectedSiGunGuId(undefined);
  };

  const handleDeleteLocation = (location: RegionResponse) => {
    if (!location.code) return;
    setSelectedLocations(prev => {
      const newMap = new Map(prev);
      newMap.delete(location.code!);
      return newMap;
    });
  };

  const handleConfirmLocation = () => {
    // TODO: 서버에 선택 지역 전달 등
  };

  return {
    siDoList,
    siGunGuList,
    locationList,
    searchRegionsList,

    isLoadingSiDo,
    isLoadingSiGunGu,
    isLoadingLocation,
    isLoadingSearch,

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
  };
};
