import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import type { RegionResponse } from '@/../apis/data-contracts';

import {
  MAX_SELECTED,
  SELECT_ALL_ID_LENGTH,
} from '@pages/set-location/constant/set-location';
import { getRegionsData, searchRegionsData } from '@pages/set-location/api';
import { SET_LOCATIONS_KEYS } from '@shared/querykey/food-trucks/set-locations';
import { confirmedLocationsAtom } from '@shared/store/location-filter-store';
import { ROUTES } from '@router/constant/routes';
import useToast from '@shared/hooks/use-toast';

export const useLocationsFilter = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [selectedSiDoId, setSelectedSidoId] = useState<number>();
  const [selectedSiGunGuId, setSelectedSiGunGuId] = useState<number>();
  const [selectedLocations, setSelectedLocations] = useState<
    Map<number, RegionResponse>
  >(new Map());

  const [searchText, setSearchText] = useState('');

  const [confirmedLocations, setConfirmedLocations] = useAtom(
    confirmedLocationsAtom
  );

  useEffect(() => {
    if (confirmedLocations.size > 0) {
      setSelectedLocations(new Map(confirmedLocations));
    }
  }, [confirmedLocations]);

  const {
    data: siDoList = [],
    isLoading: isLoadingSiDo,
    isError: isErrorSiDo,
  } = useQuery({
    queryKey: SET_LOCATIONS_KEYS.DEPTH(1),
    queryFn: () => getRegionsData({ depth: 1 }),
  });

  const {
    data: siGunGuList = [],
    isLoading: isLoadingSiGunGu,
    isError: isErrorSiGunGu,
  } = useQuery({
    queryKey: SET_LOCATIONS_KEYS.DEPTH_ID(2, selectedSiDoId),
    queryFn: () => getRegionsData({ depth: 2, parentCode: selectedSiDoId }),
    enabled: !!selectedSiDoId,
  });

  const {
    data: locationList = [],
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
  } = useQuery({
    queryKey: SET_LOCATIONS_KEYS.DEPTH_ID(3, selectedSiGunGuId),
    queryFn: () => getRegionsData({ depth: 3, parentCode: selectedSiGunGuId }),
    enabled: !!selectedSiGunGuId,
  });

  const {
    data: searchRegionsList = [],
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useQuery({
    queryKey: SET_LOCATIONS_KEYS.SEARCH(searchText),
    queryFn: () => searchRegionsData({ keyword: searchText }),
    enabled: !!searchText,
  });

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
    const empty = new Map();
    setSelectedLocations(empty);
    setSelectedSidoId(undefined);
    setSelectedSiGunGuId(undefined);
    setConfirmedLocations(empty);
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
    setConfirmedLocations(new Map(selectedLocations));
    toast.success('위치 설정이 완료되었습니다!');
    navigate(ROUTES.RESERVATION);
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

    isErrorSiDo,
    isErrorSiGunGu,
    isErrorLocation,
    isErrorSearch,

    selectedSiDoId,
    selectedSiGunGuId,
    selectedLocations,
    confirmedLocations,

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
